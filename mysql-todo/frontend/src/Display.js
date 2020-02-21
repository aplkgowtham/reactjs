
import React from 'react'

const Display = (props) => {
    const data = props.data

    return (
        <div>
            {!data ? 'NO DB ENTRIES YET'
                : data.map((elements) => (
                    <ul key={elements.user_id}>
                        {elements.message} <br />
                    </ul>
                ))
            }

        </div>
    )
}

export default Display
