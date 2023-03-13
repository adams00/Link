import React, { useState } from "react";
import "bulma"

export function Translation({ translation, examples }) {
    console.log(translation + " " + examples)
    const [hidden, setHidden] = useState(true);

    function toggleHidden() {
        if (hidden) {
            setHidden(false)
        } else {
            setHidden(true)
        }
    }

    return (
        <article className="message is-info">
            <div className="message-header">
                <p>{translation}</p>
                <button className="delete" aria-label="delete" onClick={toggleHidden}></button>
            </div>
            <div className={`message-body ${hidden ? 'is-hidden' : ''}`}>
                {examples.map(({ eng, pl }, index) => {
                    return (
                        <p key={index}>
                            <p>{eng}</p>
                            <p>{pl}</p>
                            <br></br>
                        </p>
                    )
                })
                }
            </div>
        </article >
    )
}

// {/* <article className="message is-info">
// <div className="message-header">
//     <p>{translation}</p>
//     <button className="delete" aria-label="delete"></button>
// </div>
// <div className={`message`}>
//     {examples.map(({ eng, pl }, index) => {
//         return (
//             <React.Fragment key={index}>
//                 siema
//                 {/* <p>Angielski: {eng}</p>
//                 <p>Polski: {pl}</p> */}
//             </React.Fragment >
//         )
//     })
//     }
// </div >
// </article > * /}
