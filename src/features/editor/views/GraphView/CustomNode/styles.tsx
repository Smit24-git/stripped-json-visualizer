import styled from "styled-components";
import { LinkItUrl } from "react-linkify-it";
import { NODE_DIMENSIONS } from "../../../../../constants/graph";
import { darkTheme } from "../../../../../constants/theme";

type TextColorFn = {
  $type?: string;
  $value?: string;
  $parent?: boolean;
};

function getTextColor({ $value, $type, $parent }: TextColorFn) {
  // per type
  if ($parent && $type === "array") return darkTheme.NODE_COLORS.PARENT_ARR;
  if ($parent && $type === "object") return darkTheme.NODE_COLORS.PARENT_OBJ;
  if ($type === "object") return darkTheme.NODE_COLORS.NODE_KEY;
  if ($type === "array") return darkTheme.NODE_COLORS.NODE_VALUE;

  // per value
  if ($value && !Number.isNaN(+$value)) return darkTheme.NODE_COLORS.INTEGER;
  if ($value === "true") return darkTheme.NODE_COLORS.BOOL.TRUE;
  if ($value === "false") return darkTheme.NODE_COLORS.BOOL.FALSE;
  if ($value === "null") return darkTheme.NODE_COLORS.NULL;

  // default
  return darkTheme.NODE_COLORS.NODE_VALUE;
}

export const StyledLinkItUrl = styled(LinkItUrl)`
  text-decoration: underline;
  pointer-events: all;
`;

export const StyledForeignObject = styled.foreignObject<{ $isObject?: boolean }>`
  text-align: ${({ $isObject }) => !$isObject && "center"};
  color: ${darkTheme.NODE_COLORS.TEXT};
  font-family: monospace;
  font-size: 12px;
  font-weight: 500;
  overflow: hidden;
  pointer-events: none;

  &.searched {
    background: rgba(27, 255, 0, 0.1);
    border: 2px solid ${darkTheme.TEXT_POSITIVE};
    border-radius: 2px;
    box-sizing: border-box;
  }

  .highlight {
    background: rgba(255, 214, 0, 0.15);
  }

  .renderVisible {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
  }
`;

export const StyledKey = styled.span<{ $parent?: boolean; $type: string; $value?: string }>`
  display: ${({ $parent }) => ($parent ? "flex" : "inline")};
  align-items: center;
  justify-content: center; // Always center for parent nodes
  flex: 1;
  min-width: 0;
  height: ${({ $parent }) => ($parent ? `${NODE_DIMENSIONS.PARENT_HEIGHT}px` : "auto")};
  line-height: ${({ $parent }) => ($parent ? `${NODE_DIMENSIONS.PARENT_HEIGHT}px` : "inherit")};
  padding: 0; // Remove padding
  color: ${({ $type, $parent = false, $value = "" }) =>
    getTextColor({ $parent, $type, $value })};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledRow = styled.span<{ $value: string }>`
  padding: 3px 10px;
  height: ${NODE_DIMENSIONS.ROW_HEIGHT}px;
  line-height: 18px;
  color: ${({ $value }) => getTextColor({ $value })};
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-bottom: 1px solid ${darkTheme.NODE_COLORS.DIVIDER};
  box-sizing: border-box;

  &:last-of-type {
    border-bottom: none;
  }

  .searched & {
    border-bottom: 1px solid ${darkTheme.TEXT_POSITIVE};
  }
`;

export const StyledChildrenCount = styled.span`
  color: ${darkTheme.NODE_COLORS.CHILD_COUNT};
  padding: 10px;
  margin-left: -15px;
`;
