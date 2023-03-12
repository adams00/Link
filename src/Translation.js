import { useState, useEffect } from 'react'
import translations from './usun.json';
import React from 'react'

export function Translations() {
    const [translationObject, setTranslationObject] = useState(translations);
    const toTranslate = 'yellow'
    useEffect(() => {
        fetch(`http://127.0.0.1:3001/translation/${toTranslate}`)
            .then((response) => response.json())
            .then(string => {
                if (typeof string === 'string') {
                    return JSON.parse(string)
                } return string
            })
            .then(data => setTranslationObject(data))
            .catch(error => { console.log(error) })
    }, [])
    return (
        <section>
            <p>{translationObject.word}</p>
            {translationObject.translations.map(translationObject => {
                const { word, translation, examples } = translationObject;

                return (
                    <React.Fragment key={Math.random()}>
                        {/* <p>Słowo: {word}</p> */}
                        <p>Tłumaczenie: {translation}</p>
                        <div>
                            <p>Przykłady:</p>
                            {examples.map(({ eng, pl }) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <p>Angielski: {eng}</p>
                                        <p>Polski: {pl}</p>
                                    </React.Fragment>
                                )
                            })

                            }
                        </div>
                        <br></br>
                    </React.Fragment>

                )
            })}
        </section>
    )
}