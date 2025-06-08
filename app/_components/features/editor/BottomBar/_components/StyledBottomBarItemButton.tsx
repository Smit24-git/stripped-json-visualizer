import { ReactNode } from 'react'
import styles from './styledbar.module.css'


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
                color: '--var(--interactive-normal-color)',
            }} >
            {children}
        </button>
    )
}