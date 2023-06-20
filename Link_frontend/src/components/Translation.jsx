import React, { useState } from "react";
import "bulma"
import { MdExpandMore, MdOutlineExpandLess } from "react-icons/md"

export function Translation({ translation, examples, isExample }) {
    const [hidden, setHidden] = useState(true);
    function toggleHidden() {
        if (hidden) {
            setHidden(false)
        } else {
            setHidden(true)
        }
    }

    const hasExample = examples.length > 0;

    const style = {
        marginRight: '10px'
    }
    return (
        <article className="message is-info" style={style}>
            {/* <div className="message-header">
                <p className="icon-text">
                    {
                        hasExample && <span className="icon"><MdExpandMore className="icon" onClick={toggleHidden}></MdExpandMore></span>
                    }
                </p>
            </div> */}
            <div className="message-header">
                <div className="is-flex is-justify-content-space-between is-flex-direction-row">
                    <div className="is-flex  is-flex-direction-column is-justify-content-center">
                        <p className="">{translation}</p>
                    </div>
                    <div>
                        {
                            hasExample && (
                                hidden ?
                                    <span><MdExpandMore className="icon is-large" onClick={toggleHidden}></MdExpandMore></span>
                                    :
                                    <span><MdOutlineExpandLess className="icon is-large" onClick={toggleHidden}></MdOutlineExpandLess></span>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={`message-body ${hidden ? 'is-hidden' : ''}`}>
                {examples.map(({ eng, pl }, index) => {
                    return (
                        <div key={index}>
                            <p>{eng}</p>
                            <p>{pl}</p>
                            <br></br>
                        </div>
                    )
                })
                }
            </div>
        </article >
    )
}