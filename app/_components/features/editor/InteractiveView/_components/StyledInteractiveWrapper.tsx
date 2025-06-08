import styles from './StyledIntractiveWrapper.module.css'


export default function StyledInteractiveWrapper({children, onContextMenuCapture}) {
    return (
        <div className={styles.wrapper} onContextMenuCapture={onContextMenuCapture}
            style={{background: `var(--bg-grid-color)`}}>
            {children}
        </div>
    )
}

