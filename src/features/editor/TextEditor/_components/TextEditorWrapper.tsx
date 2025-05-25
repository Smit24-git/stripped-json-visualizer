

const outerWrapper = {
    'display': 'flex',
    'flex-direction': 'column',
    'height': '100%',
    'user select': 'none'
}
const innerWrapper = {
    'display': 'grid',
    'height': 'calc(100vh - 67px)',
    'grid-template-columns': '100%',
    'grid-template-rows': 'minmax(0, 1fr)'
}
export default function TextEditorWrapper({children}) {
    return (
        <div style={outerWrapper}>
            <div style={innerWrapper}>
                {children}
            </div>
        </div>
    )
}