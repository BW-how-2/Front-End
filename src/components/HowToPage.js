import React, {useContext} from 'react'
import { HowToContext } from '../contexts/HowToContext'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const StyledPage = styled.div`
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

    .howto-Wrapper {
        margin: 5% 25%;
    }
    h2 {
        text-align: center;
    }
`
export default function Item() {
    const { howTos } = useContext(HowToContext)
    const { howtoID } = useParams() 
    const howTo = howTos.find(id => {
        debugger
        return id.id === parseInt(howtoID)
    })

return (
    <StyledPage className='howto-wrapper'>
        <div className='howto-header'>
            <h2>{howTo.name}</h2>
            <h3>{howTo.description}</h3>
                <h3>{howTo.category}</h3>
                <h3>{howTo.complexity}</h3>
                <p>{howTo.steps}</p>
        </div>
    </StyledPage>
)

}
