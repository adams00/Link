export function Word({ learned = false,
    word,
    onChangeCurrentWord,
    active = false,
    wordIndex,
    setActiveWordIndex }
) {

    function getproperClass(learned, active) {
        const lightness = learned ? 'is-light' : 'is-link'
        const activeness = active ? 'has-background-success' : '';
        return `tag is-link is-medium px-1 mx-0 ${lightness} ${activeness}`
    }
    function toggleActive() {
        setActiveWordIndex(wordIndex)
    }

    const style = {
        borderRadius: '0px'
    }
    return (
        <span className={getproperClass(learned, active)}
            style={style}
            onClick={() => {
                toggleActive();
                onChangeCurrentWord(word)
            }}>
            {word}
        </span >
    )
}