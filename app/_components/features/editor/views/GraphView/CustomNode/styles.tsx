import { LinkItUrl } from "react-linkify-it";
import { NODE_DIMENSIONS } from "../../../../../../_constants/graph";
import { darkTheme } from "../../../../../../_constants/theme";
import styles from './customnode.module.css'
import { PropsWithChildren } from "react";

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

export const StyledLinkItUrl = ({children, ...props}) => {
  return (
    <LinkItUrl {...props} className={styles['link-it-url']}>{children}</LinkItUrl>
  )
}

export type ForeighObjectType = {
  children:React.ReactNode,
  $isObject?:any,
  width: any,
  height: any,
  x: any,
  y:any,
}  

export const StyledForeignObject = ({children, $isObject, ...props}: ForeighObjectType) => {
  return (
    <foreignObject 
      className={styles['foreign-object']} 
      style={{
        textAlign: !$isObject ? "center" : undefined,
        color: darkTheme.NODE_COLORS.TEXT,
      }}
      {...props}>
        {children}
    </foreignObject>
  )
}

export const StyledKey = ({children, $parent, $type, $value, ...props}: {children: React.ReactNode, $parent?: any, $type?: any, $value?: any}) => {
  return (
    <span className={styles['styled-key']} style={{
      display: $parent ? "flex" : "inline",
      height: $parent ? `${NODE_DIMENSIONS.PARENT_HEIGHT}px` : "auto",
      lineHeight: $parent ? `${NODE_DIMENSIONS.PARENT_HEIGHT}px` : "inherit",
      color: getTextColor({ $parent, $type, $value }),
    }} {...props}>{children}</span>
  )
}

export const StyledRow = ({children, $value, ...props}) => {
  return (
    <span className={styles['styled-row']} style={{
      height: NODE_DIMENSIONS.ROW_HEIGHT + `px`,
      color: getTextColor({ $value }),
      borderBottom: `1px solid ${darkTheme.NODE_COLORS.DIVIDER}`,
    }} {...props}>{children}</span>
  )
}

export const StyledChildrenCount = ({children}) => {
  return <span style={{
    color: darkTheme.NODE_COLORS.CHILD_COUNT,
    padding: '10px',
    marginLeft: '-15px',
  }}> {children} </span>
}