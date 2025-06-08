'use client'
import React from "react";
import type { KeyPath } from "react-json-tree";
import styles from './treeview.module.css';

interface LabelProps {
  keyPath: KeyPath;
  nodeType: string;
}

function getLabelColor({ $type }: { $type?: string }) {
  if ($type === "Object") return 'var(--node-object-parent-color)';
  if ($type === "Array") return 'var(--node-array-parent-color)'; 
  return 'var(--node-object-parent-color)';
}

const StyledLabel = ({children, $nodeType}) => {
  return <span className={styles['tree-label']} style={{
    color: getLabelColor({ $type: $nodeType }),
  }}>{children}</span>
}

export const Label = ({ keyPath, nodeType }: LabelProps) => {
  return <StyledLabel $nodeType={nodeType}>{keyPath[0]}:</StyledLabel>;
};
