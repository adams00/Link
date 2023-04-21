import { Word } from "./Word"
import { useState } from "react"
import { textArray } from '../initial_text';

export function Text({ onChangeCurrentWord }) {
    const [activeWordIndex, setActiveWordIndex] = useState(0)

    const testArrayOfWords = textArray;

    return (
        <div>
            {testArrayOfWords.map((word, index) => {
                return <Word
                    word={word}
                    key={index}
                    wordIndex={index}
                    active={index === activeWordIndex}
                    setActiveWordIndex={setActiveWordIndex}
                    onChangeCurrentWord={onChangeCurrentWord}
                    learned={
                        // Math.random() < 0.5
                        false
                    }
                />
            })}
        </div>
    )
}