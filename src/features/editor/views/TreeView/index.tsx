import React from "react";
import { JSONTree } from "react-json-tree";
import useJson from "../../../../store/useJson";
import { Label } from "./Label";
import { Value } from "./Value";
import { darkTheme } from "../../../../constants/theme";

export const TreeView = () => {
  const json = useJson(state => state.json);

  return (
    json && <JSONTree
      hideRoot
      data={JSON.parse(json)}
      valueRenderer={(valueAsString, value) => <Value {...{ valueAsString, value }} />}
      labelRenderer={(keyPath, nodeType) => <Label {...{ keyPath, nodeType }} />}
      theme={{
        extend: {
          overflow: "scroll",
          height: "100%",
          scheme: "monokai",
          author: "wimer hazenberg (http://www.monokai.nl)",
          base00: darkTheme.GRID_BG_COLOR,
        },
      }}
    />
  );
};
