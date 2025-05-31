
const innerWrapper = {
    display: 'grid',
    height: 'calc(100vh - 67px)',
    gridTemplateColumns : '100%',
    gridTemplateRows: 'minmax(0, 1fr)'
}
export default function TextEditorWrapper({children}) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            userSelect: 'none'
        }}>
            <div style={innerWrapper}>
                {children}
            </div>
        </div>
    )
}