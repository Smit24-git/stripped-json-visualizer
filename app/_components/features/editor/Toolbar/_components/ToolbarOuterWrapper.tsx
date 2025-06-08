import styles from './toolbar-components.module.css'


export default function ToolbarOuterWrapper({children}) {
    return (
        <div className={styles['toolbar-outer-wrapper']}
            style={{
                borderBottom: `1px solid var(--silver-dark)`,
                color: 'var(--silver)',
                zIndex: 36,
                background: 'var(--toolbar-bg)'
            }}>
            {children}
        </div>
    )
}