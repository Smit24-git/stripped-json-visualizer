import styles from './view-components.module.css' 

export default function StyledEditorWrapper({children,$widget, $showRulers, onContextMenu, onClick, ...props}: {children:React.ReactNode, $widget?:any, $showRulers?:any, onContextMenu:any, onClick:any}) {
    const style = {
        backgroundImage: `linear-gradient(var(--primary-grid-color) 1.5px, transparent 1.5px),
            linear-gradient(90deg, var(--primary-grid-color) 1.5px, transparent 1.5px),
            linear-gradient(var(--grid-color-secondary) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color-secondary) 1px, transparent 1px)`,
        backgroundPosition: `-1.5px -1.5px, -1.5px -1.5px, -1px -1px, -1px -1px`,
        backgroundSize: `100px 100px, 100px 100px, 20px 20px, 20px 20px`,
        height: $widget ? '100vh' : 'calc(100vh - 67px)',
        backgroundColor: 'var(--bg-grid-color)',
    } 
    return (
        <div {...props} onContextMenu={onContextMenu} onClick={onClick} className={styles['wrapper']} style={$showRulers && style}>
            {children}
        </div>
    );
}