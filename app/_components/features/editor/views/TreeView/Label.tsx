'use client'
import React from "react";
import type { KeyPath } from "react-json-tree";
import { darkTheme } from "../../../../../_constants/theme";
import styles from './treeview.module.css';

interface LabelProps {
  keyPath: KeyPath;
  nodeType: string;
}

function getLabelColor({ $type }: { $type?: string }) {
  if ($type === "Object") return darkTheme.NODE_COLORS.PARENT_OBJ;
  if ($type === "Array") return darkTheme.NODE_COLORS.PARENT_ARR;
  return darkTheme.NODE_COLORS.PARENT_OBJ;
}

const StyledLabel = ({children, $nodeType}) => {
  return <span className={styles['tree-label']} style={{
    color: getLabelColor({ $type: $nodeType }),
  }}>{children}</span>
}

export const Label = ({ keyPath, nodeType }: LabelProps) => {
  return <StyledLabel $nodeType={nodeType}>{keyPath[0]}:</StyledLabel>;
};
