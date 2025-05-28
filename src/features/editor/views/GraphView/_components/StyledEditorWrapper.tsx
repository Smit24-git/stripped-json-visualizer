import { darkTheme } from '../../../../../constants/theme';
import styles from './view-components.module.css' 

export default function StyledEditorWrapper({children,$widget, $showRulers, ...props}) {
    const style = {
        backgroundImage: `linear-gradient(${darkTheme.GRID_COLOR_PRIMARY} 1.5px, transparent 1.5px),
            linear-gradient(90deg, ${darkTheme.GRID_COLOR_PRIMARY} 1.5px, transparent 1.5px),
            linear-gradient(${darkTheme.GRID_COLOR_SECONDARY} 1px, transparent 1px),
            linear-gradient(90deg, ${darkTheme.GRID_COLOR_SECONDARY} 1px, transparent 1px)`,
        backgroundPosition: `-1.5px -1.5px, -1.5px -1.5px, -1px -1px, -1px -1px`,
        backgroundSize: `100px 100px, 100px 100px, 20px 20px, 20px 20px`,
        height: $widget ? '100vh' : 'calc(100vh - 67px)',
        backgroundColor: darkTheme.GRID_BG_COLOR,
    } 
    return (
        <div {...props} className={styles['wrapper']} style={$showRulers && style}>
            {children}
        </div>
    );
}