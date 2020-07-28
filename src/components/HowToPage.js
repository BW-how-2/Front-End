import React from 'react'

import { useParams } from 'react-router-dom'

export default function Item(props) {
    const { howTos } = props

    const { howtoID } = useParams() 

    const howTo = howTos.find(id => {
        return id.id === howtoID
    })

return (
    <div className='howto-wrapper'>
        <div className='howto-header'>
            <h2>{howTo.name}</h2>
            <h3>{howTo.description}</h3>
                <p>{howTo.category}</p>
                <p>{howTo.complexity}</p>
        </div>
    </div>
)

}
