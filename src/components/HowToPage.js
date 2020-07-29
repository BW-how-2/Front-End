import React, { useContext, useState, useEffect } from 'react'
import { HowToContext } from '../contexts/HowToContext'
import { UserContext } from '../contexts/UserContext'
import { useParams, useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import styled from 'styled-components'

const initialFormValues = {
    name: '',
    description: '',
    steps: '',
    category: '',
    complexity: ''
}

const StyledPage = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 3%;
    box-shadow: 2px 2px 10px lightgrey;
    margin: 5% 15%;
    padding: 1% 5%;
    background:#EDF4F5;

    h2 {
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 2.5em;
        text-decoration: underline;
    }

    h3{
        font-style:italic;
        letter-spacing: 1px;
    }

    #howToinfo{
        display:flex;
        flex-direction: row;
        justify-content: space-evenly
    }
`
export default function Item() {
    const { howtoID } = useParams()
    const { user } = useContext(UserContext)
    const { howTos, setHowTos } = useContext(HowToContext)
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formOpen, setFormOpen] = useState(false)
    const [howTo, setHowTo] = useState(null)

    useEffect(() => {
        axiosWithAuth().get(`/api/auth/howto/${howtoID}`)
        .then((res) => {
            console.log(res) 
            setHowTo(res.data)
        })
    },[howtoID])

    const { push } = useHistory()

    const onInputChange = e => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const openEditForm = () => {
        setFormOpen(true)
        setFormValues(howTo)
    }

    const closeEditForm = () => {
        setFormOpen(false)
        setFormValues(initialFormValues)
    }

    const putHowTo = e => {
        e.preventDefault()
        axiosWithAuth()
            .put(`/api/auth/howto/creator/${howTo.id}`, formValues)
            .then(res => {
                setHowTo(formValues)
                setHowTos(howTos.map(itm => {
                    if (itm.id === parseInt(howtoID)){
                        return formValues
                    }else {
                        return itm
                    }
                }))
                closeEditForm()
            })
            .catch(err => {
                console.log(err);
            })
    }

    const deleteHowTo = () => {
        axiosWithAuth()
            .delete(`/api/auth/howto/creator/${howtoID}`)
            .then(res => {
                console.log(res);
                setHowTos(howTos.filter(itm => {
                    if (itm.id === parseInt(howtoID)){
                        return false
                    }else {
                        return true
                    }
                }))
                push('/dashboard')
            })
            .catch(err => {
                console.log(err.response)
            })
    }

return (
    <StyledPage className='howto-wrapper'>
        {howTo && <div className='howto-header'>
            <h2>HOW TO {howTo.name}</h2>
            <h3>{howTo.description}</h3>
            <div id='howToinfo'>
            <h4>Category: {howTo.category}</h4>
            <h4>Time To Complete: {howTo.complexity}</h4>
            </div>
            <p>{howTo.steps}</p>
        </div>}
        {user.role === 2 && <div className='edit-delete-buttons'>
            {!formOpen && <button onClick={openEditForm}>Edit</button>}&nbsp;
            {!formOpen && <button onClick={deleteHowTo}>Delete</button>}<br/><br/>
        </div>}
        {formOpen && <form onSubmit={putHowTo}>
            <label htmlFor='username'>Title:&nbsp;</label>
            <input 
                type='text'
                id='name'
                name='name'
                value={formValues.name}
                onChange={onInputChange}
            /><br/><br/>
            <label htmlFor='description'>Description:&nbsp;</label>
            <input 
                type='text'
                id='description'
                name='description'
                value={formValues.description}
                onChange={onInputChange}
            /><br/><br/>
            <label htmlFor='steps'>Steps:&nbsp;</label>
            <textarea 
                id='steps'
                name='steps'
                value={formValues.steps}
                onChange={onInputChange}
            /><br/><br/>
            <label htmlFor='category'>Category:&nbsp;</label>
            <input 
                type='text'
                id='category'
                name='category'
                value={formValues.category}
                onChange={onInputChange}
            /><br/><br/>
            <label htmlFor='complexity'>Time to complete:&nbsp;</label>
            <input 
                type='text'
                id='complexity'
                name='complexity'
                value={formValues.complexity}
                onChange={onInputChange}
            /><br/><br/>
            <button>Save Changes</button>&nbsp;
            <button onClick={closeEditForm}>Cancel</button>
        </form>}
    </StyledPage>
)
}
