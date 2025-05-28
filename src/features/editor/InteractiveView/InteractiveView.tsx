import React from "react";
import { useSessionStorage } from "@mantine/hooks";
import { ViewMode } from "../../../enums/viewMode.enum";
import { GraphView } from "../views/GraphView";
import { TreeView } from "../views/TreeView";
import StyledInteractiveWrapper from "./_components/StyledInteractiveWrapper";


const View = () => {
  const [viewMode] = useSessionStorage({
    key: "viewMode",
    defaultValue: ViewMode.Graph,
  });

  if (viewMode === ViewMode.Graph) return <GraphView />;
  if (viewMode === ViewMode.Tree) return <TreeView />;
  return null;
};

const InteractiveView = () => {
  return (
    <StyledInteractiveWrapper onContextMenuCapture={e => e.preventDefault()}>
      <View />
    </StyledInteractiveWrapper>
  );
};

export default InteractiveView;
