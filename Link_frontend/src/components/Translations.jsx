import { useState, useEffect } from 'react'
import translations from '../usun.json';
import React from 'react'
import { Translation } from './Translation.jsx'

export function Translations({ currentWord = 'yellow' }) {
    const [translationObject, setTranslationObject] = useState(translations);
    const toTranslate = currentWord;

    useEffect(() => {
        fetch(`http://127.0.0.1:3001/translation/${toTranslate}`, { credentials: 'include' })
            .then((response) => response.json())
            .then(string => {
                if (typeof string === 'string') {
                    return JSON.parse(string)
                } return string
            })
            .then(data => {
                if (!data.error) setTranslationObject(data)
            })
    }, [toTranslate])


    return (
        <section className='translations'>
            {translationObject.array.map(({ translation, examples }, index) => {

                return (
                    <Translation key={index} translation={translation} examples={examples} />
                )
            })}
        </section>
    )
}