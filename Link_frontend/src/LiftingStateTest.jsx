import React, { useState } from "react"

export function Wrapper() {
    const [selectedWord, setSelectedWord] = useState('one')
    return (
        <React.Fragment>
            <Words onChangeSelectedWord={setSelectedWord} />
            <Selected word={selectedWord} />
        </React.Fragment>
    )
}
function Words({ onChangeSelectedWord }) {
    const words = ['one', 'two', 'three', 'four']
    return (
        words.map(word => <Word key={Math.random()} word={word} onChangeSelectedWord={onChangeSelectedWord}></Word>)
    )
}

function Word({ word, onChangeSelectedWord }) {
    return (
        <p onClick={() => {
            onChangeSelectedWord(word)
        }}>{word}</p>
    )
}

function Selected({ word = 'pink' }) {
    return (
        <p>You selected: {word}</p>
    )
}
