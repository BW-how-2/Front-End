import React, {useContext, useState} from 'react'
import { HowToContext } from '../contexts/HowToContext'
import { useParams } from 'react-router-dom'

export default function Item() {
    const { howTos } = useContext(HowToContext)
    const { howtoID } = useParams() 
    const howTo = howTos.find(id => {
        debugger
        return id.id === howtoID
    })

return (
    <div className='howto-wrapper'>
        {howTo && <div className='howto-header'>
            <h2>{howTo.name}</h2>
            <h3>{howTo.description}</h3>
                <h3>{howTo.category}</h3>
                <h3>{howTo.complexity}</h3>
                <p>{howTo.steps}</p>
        </div> }
    </div>
)

}
