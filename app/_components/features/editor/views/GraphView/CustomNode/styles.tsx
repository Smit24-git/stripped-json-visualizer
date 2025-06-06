import { NODE_DIMENSIONS } from "../../../../../../_constants/graph";
import styles from './customnode.module.css'

type TextColorFn = {
  $type?: string;
  $value?: string;
  $parent?: boolean;
};

function getTextColor({ $value, $type, $parent }: TextColorFn): string {
  // per type
  if ($parent && $type === "array") return 'var(--node-array-parent-color)';
  if ($parent && $type === "object") return 'var(--node-object-parent-color)';
  if ($type === "object") return 'var(--node-key-color)';
  if ($type === "array") return 'var(--node-value-color)';

  // per value
  if ($value && !Number.isNaN(+$value)) return 'var(--node-integer-color)';
  if ($value === "true") return 'var(--node-true-color)';
  if ($value === "false") return 'var(--node-false-color)';
  if ($value === "null") return 'var(--node-null-color)';

  // default
  return 'var(--node-value-color)';
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
        color: 'var(--node-text-color)',
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
      borderBottom: `1px solid var(--node-divider-color)`,
    }} {...props}>{children}</span>
  )
}

export const StyledChildrenCount = ({children}) => {
  return <span style={{
    color: 'var(--node-child-count-color)',
    padding: '10px',
    marginLeft: '-15px',
  }}> {children} </span>
}