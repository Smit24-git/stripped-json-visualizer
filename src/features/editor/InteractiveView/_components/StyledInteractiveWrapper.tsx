//   background: ${darkTheme.GRID_BG_COLOR};
import { darkTheme } from '../../../../constants/theme'
import styles from './StyledIntractiveWrapper.module.css'


export default function StyledInteractiveWrapper({children, onContextMenuCapture}) {
    return (
        <div className={styles.wrapper} onContextMenuCapture={onContextMenuCapture}
            style={{background: darkTheme.GRID_BG_COLOR}}>
            {children}
        </div>
    )
}

