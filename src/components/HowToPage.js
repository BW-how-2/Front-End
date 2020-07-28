import React, { useContext, useState } from 'react'
import { HowToContext } from '../contexts/HowToContext'
import { UserContext } from '../contexts/UserContext'
import { useParams, useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const initialFormValues = {
    name: '',
    description: '',
    steps: '',
    category: '',
    complexity: ''
}

export default function Item() {
    const { howtoID } = useParams()
    const { user } = useContext(UserContext)
    const { howTos, setHowTos } = useContext(HowToContext)
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formOpen, setFormOpen] = useState(false)
    const [howTo, setHowTo] = useState(howTos.find(id => {
        return id.id === parseInt(howtoID)
    }))
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
    <div className='howto-wrapper'>
        <div className='howto-header'>
            <h2>{howTo.name}</h2>
            <h3>{howTo.description}</h3>
            <h3>{howTo.category}</h3>
            <h3>{howTo.complexity}</h3>
            <p>{howTo.steps}</p>
        </div>
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
    </div>
)

}
