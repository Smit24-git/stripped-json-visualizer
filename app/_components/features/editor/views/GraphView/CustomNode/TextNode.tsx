'use client'
import React, { useMemo } from "react";
import { MdLink, MdLinkOff } from "react-icons/md";
import type { CustomNodeProps } from ".";
import useToggleHide from "../../../../../../_hooks/useToggleHide";
import useConfig from "../../../../../../_store/useConfig";
import { isContentImage } from "../lib/utils/calculateNodeSize";
import useGraph from "../stores/useGraph";
import { TextRenderer } from "./TextRenderer";
import * as Styled from "./styles";
import styles from './customnode.module.css';

const StyledExpand = ({children, ...props}) => {
  return <button {...props} className={styles['styled-expand-wrapper']} style={{
    color: 'var(--normal-text-color)',
    borderLeft: `1px solid var(--background-modifier-accent)`,
  }}>{children}</button>
};

const StyledTextNodeWrapper = ({children, $hasCollapse, $isParent, ...props}) => {
  return <span style={{
      display: 'flex',
      justifyContent:  $hasCollapse ? "space-between" : $isParent ? "center" : "flex-start",
      alignItems: 'center',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      padding: $hasCollapse ? "0" : "0 10px",
    }} {...props}>{children}</span>
}

const StyledImageWrapper = ({children}) => {
  return (
    <div style={{padding: '5px'}}>
      {children}
    </div>
  )
}


const StyledImage = ({...props}) => {
  return  <img {...props} style={{
    borderRadius: '2px',
    objectFit: 'contain',
    background: 'var(--background-modifier-accent)' 
  }} />
}

const Node = ({ node, x, y, hasCollapse = false }: CustomNodeProps) => {
  const {
    id,
    text,
    width,
    height,
    data: { isParent, childrenCount, type },
  } = node;
  const { validateHiddenNodes } = useToggleHide();
  const collapseButtonVisible = useConfig(state => state.collapseButtonVisible);
  const childrenCountVisible = useConfig(state => state.childrenCountVisible);
  const imagePreviewEnabled = useConfig(state => state.imagePreviewEnabled);
  const expandNodes = useGraph(state => state.expandNodes);
  const collapseNodes = useGraph(state => state.collapseNodes);
  const isExpanded = useGraph(state => state.collapsedParents.includes(id));
  const isImage = imagePreviewEnabled && isContentImage(text as string);
  const value = JSON.stringify(text).replaceAll('"', "");

  const handleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!isExpanded) collapseNodes(id);
    else expandNodes(id);
    validateHiddenNodes();
  };

  const childrenCountText = useMemo(() => {
    if (type === "object") return `{${childrenCount}}`;
    if (type === "array") return `[${childrenCount}]`;
    return "";
  }, [childrenCount, type]);

  return (
    <Styled.StyledForeignObject
      data-id={`node-${node.id}`}
      width={width}
      height={height}
      x={0}
      y={0}
    >
      {isImage ? (
        <StyledImageWrapper>
          <StyledImage src={text as string} width="70" height="70" loading="lazy" />
        </StyledImageWrapper>
      ) : (
        <StyledTextNodeWrapper
          data-x={x}
          data-y={y}
          data-key={JSON.stringify(text)}
          $hasCollapse={isParent && collapseButtonVisible}
          $isParent={isParent}
        >
          <Styled.StyledKey $value={value} $parent={isParent} $type={type}>
            <TextRenderer>{value}</TextRenderer>
          </Styled.StyledKey>
          {isParent && childrenCount > 0 && childrenCountVisible && (
            <Styled.StyledChildrenCount>{childrenCountText}</Styled.StyledChildrenCount>
          )}
          {isParent && hasCollapse && collapseButtonVisible && (
            <StyledExpand aria-label="Expand" onClick={handleExpand}>
              {isExpanded ? <MdLinkOff size={18} /> : <MdLink size={18} />}
            </StyledExpand>
          )}
        </StyledTextNodeWrapper>
      )}
    </Styled.StyledForeignObject>
  );
};

function propsAreEqual(prev: CustomNodeProps, next: CustomNodeProps) {
  return (
    prev.node.text === next.node.text &&
    prev.node.width === next.node.width &&
    prev.node.data.childrenCount === next.node.data.childrenCount
  );
}

export const TextNode = React.memo(Node, propsAreEqual);
