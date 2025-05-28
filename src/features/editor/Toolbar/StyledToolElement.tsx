import styles from './toobar.module.css'
import { darkTheme } from "../../../constants/theme";

export function StyledToolElement({children, hide = false, highlight = false, ...props}){
  const style = {
    'display': hide ? "none" : "flex",
    'background': highlight ? "linear-gradient(rgba(0, 0, 0, 0.1) 0%)" : "none",
    'color': darkTheme.INTERACTIVE_NORMAL,
  }
  
  return (
    <button style={{color: darkTheme.INTERACTIVE_NORMAL}} className={styles['styled-toolbar-button']}>
      {children}
    </button>
    
  ); 
}
