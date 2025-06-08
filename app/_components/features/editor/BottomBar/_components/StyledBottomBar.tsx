import styles from './styledbar.module.css'

export default function StyledBottomBar({children}) {
    return(
        <div className={styles['bottom-bar-wrapper']}
            style={{
                borderTop: `1px solid var(--background-modifier-accent)`,
                background: 'var(--toolbar-bg)'
            }}>
            {children}
        </div>
    )
}