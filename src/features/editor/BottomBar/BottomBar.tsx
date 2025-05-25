import React from "react";
import { Flex, Popover, Text } from "@mantine/core";
import { event as gaEvent } from "nextjs-google-analytics";
import { BiSolidDockLeft } from "react-icons/bi";
import {
  VscCheck,
  VscError,
  VscRunAll,
  VscSync,
  VscSyncIgnored,
} from "react-icons/vsc";
import useConfig from "../../../store/useConfig";
import useFile from "../../../store/useFile";
import useGraph from "../views/GraphView/stores/useGraph";
import StyledBottomBar from "./_components/StyledBottomBar";
import styles from './bottombar.module.css';
import StyledBottomBarItemButton from "./_components/StyledBottomBarItemButton";

export const BottomBar = () => {
  const data = useFile(state => state.fileData);
  const toggleLiveTransform = useConfig(state => state.toggleLiveTransform);
  const liveTransformEnabled = useConfig(state => state.liveTransformEnabled);
  const error = useFile(state => state.error);
  const setContents = useFile(state => state.setContents);
  const nodeCount = useGraph(state => state.nodes.length);
  const toggleFullscreen = useGraph(state => state.toggleFullscreen);
  const fullscreen = useGraph(state => state.fullscreen);

  const toggleEditor = () => {
    toggleFullscreen(!fullscreen);
    gaEvent("toggle_fullscreen");
  };

  React.useEffect(() => {
    if (data?.name) window.document.title = `${data.name} | JSON Visualizer`;
  }, [data]);

  return (
    <StyledBottomBar>
      <div className={styles['left-bar-wrapper']}>
        <StyledBottomBarItemButton onClick={toggleEditor}>
          <BiSolidDockLeft />
        </StyledBottomBarItemButton>
        <StyledBottomBarItemButton>
          {error ? (
            <Popover width="auto" shadow="md" position="top" withArrow>
              <Popover.Target>
                <Flex align="center" gap={2}>
                  <VscError color="red" />
                  <Text c="red" fw={500} fz="xs">
                    Invalid
                  </Text>
                </Flex>
              </Popover.Target>
              <Popover.Dropdown style={{ pointerEvents: "none" }}>
                <Text size="xs">{error}</Text>
              </Popover.Dropdown>
            </Popover>
          ) : (
            <Flex align="center" gap={2}>
              <VscCheck />
              <Text size="xs">Valid</Text>
            </Flex>
          )}
        </StyledBottomBarItemButton>
        <StyledBottomBarItemButton
          onClick={() => {
            toggleLiveTransform(!liveTransformEnabled);
            gaEvent("toggle_live_transform");
          }}
        >
          {liveTransformEnabled ? <VscSync /> : <VscSyncIgnored />}
          <Text fz="xs">Live Transform</Text>
        </StyledBottomBarItemButton>
        {!liveTransformEnabled && (
          <StyledBottomBarItemButton onClick={() => setContents({})} disabled={!!error}>
            <VscRunAll />
            Click to Transform
          </StyledBottomBarItemButton>
        )}
      </div>

      <div className={styles['justify-right']}>
        <StyledBottomBarItemButton>Nodes: {nodeCount}</StyledBottomBarItemButton>
      </div>
    </StyledBottomBar>
  );
};
