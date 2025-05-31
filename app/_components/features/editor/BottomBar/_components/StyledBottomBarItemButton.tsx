import { ReactNode } from 'react'
import styles from './styledbar.module.css'
import { darkTheme } from '../../../../../_constants/theme'


export default function StyledBottomBarItemButton(
    { 
        onClick, 
        disabled = false, 
        children
    }: {
        onClick?: ()=>void,
        disabled?: boolean 
        children:ReactNode
    }) {

    return (
        <button disabled={disabled} className={styles['bottom-bar-item-wrapper']} onClick={onClick}
            style={{
                color: darkTheme.INTERACTIVE_NORMAL,
                // background: ${({ $bg }) => $bg}
            }} >
            {children}
        </button>
    )
}