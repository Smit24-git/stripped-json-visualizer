import { darkTheme } from '../../../../../_constants/theme'
import styles from './styledbar.module.css'

export default function StyledBottomBar({children}) {
    return(
        <div className={styles['bottom-bar-wrapper']}
            style={{
                borderTop: `1px solid ${darkTheme.BACKGROUND_MODIFIER_ACCENT}`,
                background: darkTheme.TOOLBAR_BG
            }}>
            {children}
        </div>
    )
}