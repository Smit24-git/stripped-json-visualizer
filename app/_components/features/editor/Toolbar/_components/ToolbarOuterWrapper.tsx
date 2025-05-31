import { darkTheme } from '../../../../../_constants/theme'
import styles from './toolbar-components.module.css'
//   background: ${darkTheme.TOOLBAR_BG};
//   color: ${darkTheme.SILVER};
//   z-index: 36;
//   border-bottom: 1px solid ${darkTheme.SILVER_DARK};


export default function ToolbarOuterWrapper({children}) {
    return (
        <div className={styles['toolbar-outer-wrapper']}
            style={{
                borderBottom: `1px solid ${darkTheme.SILVER_DARK}`,
                color: darkTheme.SILVER,
                zIndex: 36,
                background: darkTheme.TOOLBAR_BG
            }}>
            {children}
        </div>
    )
}