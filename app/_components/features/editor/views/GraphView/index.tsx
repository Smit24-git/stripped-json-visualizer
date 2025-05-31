'use client'
import React, { useCallback } from "react";
import { Box, LoadingOverlay, useComputedColorScheme } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import debounce from "lodash.debounce";
import { Space } from "react-zoomable-ui";
import { Canvas } from "reaflow";
import type { ElkRoot } from "reaflow";
import { useLongPress } from "use-long-press";
import useToggleHide from "../../../../../_hooks/useToggleHide";
import useConfig from "../../../../../_store/useConfig";
import { CustomEdge } from "./CustomEdge";
import { CustomNode } from "./CustomNode";
import { NotSupported } from "./NotSupported";
import { OptionsMenu } from "./OptionsMenu";
import { SecureInfo } from "./SecureInfo";
import { ZoomControl } from "./ZoomControl";
import useGraph from "./stores/useGraph";
import StyledEditorWrapper from "./_components/StyledEditorWrapper";
import styles from './_components/view-components.module.css'
import s from './graph.module.css'
const layoutOptions = {
  "elk.layered.compaction.postCompaction.strategy": "EDGE_LENGTH",
  "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
};

interface GraphProps {
  isWidget?: boolean;
}

const GraphCanvas = ({ isWidget }: GraphProps) => {
  const { validateHiddenNodes } = useToggleHide();
  const setLoading = useGraph(state => state.setLoading);
  const centerView = useGraph(state => state.centerView);
  const direction = useGraph(state => state.direction);
  const nodes = useGraph(state => state.nodes);
  const colorScheme = useComputedColorScheme();
  const edges = useGraph(state => state.edges);
  const [paneWidth, setPaneWidth] = React.useState(2000);
  const [paneHeight, setPaneHeight] = React.useState(2000);

  const onLayoutChange = React.useCallback(
    (layout: ElkRoot) => {
      if (layout.width && layout.height) {
        const areaSize = layout.width * layout.height;
        const changeRatio = Math.abs((areaSize * 100) / (paneWidth * paneHeight) - 100);

        setPaneWidth(layout.width + 50);
        setPaneHeight((layout.height as number) + 50);

        setTimeout(() => {
          validateHiddenNodes();
          window.requestAnimationFrame(() => {
            if (changeRatio > 70 || isWidget) centerView();
            setLoading(false);
          });
        });
      }
    },
    [isWidget, paneHeight, paneWidth, centerView, setLoading, validateHiddenNodes]
  );

  return (
    <Canvas
      className="jsoncrack-canvas"
      onLayoutChange={onLayoutChange}
      node={p => <CustomNode {...p} />}
      edge={p => <CustomEdge {...p} />}
      nodes={nodes}
      edges={edges}
      arrow={null}
      maxHeight={paneHeight}
      maxWidth={paneWidth}
      height={paneHeight}
      width={paneWidth}
      direction={direction}
      layoutOptions={layoutOptions}
      key={[direction, colorScheme].join("-")}
      pannable={false}
      zoomable={false}
      animated={false}
      readonly={true}
      dragEdge={null}
      dragNode={null}
      fit={true}
    />
  );
};

export const GraphView = ({ isWidget = false }: GraphProps) => {
  const setViewPort = useGraph(state => state.setViewPort);
  const viewPort = useGraph(state => state.viewPort);
  const aboveSupportedLimit = useGraph(state => state.aboveSupportedLimit);
  const loading = useGraph(state => state.loading);
  const gesturesEnabled = useConfig(state => state.gesturesEnabled);
  const rulersEnabled = useConfig(state => state.rulersEnabled);
  const [debouncedLoading] = useDebouncedValue(loading, 300);
  const callback = useCallback(() => {
    const canvas = document.querySelector(".jsoncrack-canvas") as HTMLDivElement | null;
    canvas?.classList.add("dragging");
  }, []);

  const bindLongPress = useLongPress(callback, {
    threshold: 150,
    onFinish: () => {
      const canvas = document.querySelector(".jsoncrack-canvas") as HTMLDivElement | null;
      canvas?.classList.remove("dragging");
    },
  });

  const blurOnClick = useCallback(() => {
    if ("activeElement" in document) (document.activeElement as HTMLElement)?.blur();
  }, []);

  const debouncedOnZoomChangeHandler = debounce(() => {
    setViewPort(viewPort!);
  }, 300);

  return (
    <Box pos="relative" h="100%" w="100%">
      {aboveSupportedLimit && <NotSupported />}
      <LoadingOverlay visible={debouncedLoading} />
      {!isWidget && <OptionsMenu />}
      {!isWidget && <SecureInfo />}
      <ZoomControl />
      <StyledEditorWrapper
        $widget={isWidget}
        onContextMenu={e => e.preventDefault()}
        onClick={blurOnClick}
        key={String(gesturesEnabled)}
        $showRulers={rulersEnabled}
        {...bindLongPress()}
      >
        <Space
          onUpdated={() => debouncedOnZoomChangeHandler()}
          onCreate={setViewPort}
          onContextMenu={e => e.preventDefault()}
          treatTwoFingerTrackPadGesturesLikeTouch={gesturesEnabled}
          pollForElementResizing
          className={styles["jsoncrack-space"]}>
          <GraphCanvas isWidget={isWidget} />
        </Space>
      </StyledEditorWrapper>
    </Box>
  );
};
