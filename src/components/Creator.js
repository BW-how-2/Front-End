import React, { useState, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { HowToContext } from '../contexts/HowToContext';
import { Link } from 'react-router-dom';

const initialFormValues = {
    name: '',
    description: '',
    steps: '',
    category: '',
    complexity: ''
}

const Creator = () => {
    const { howTos, setHowTos } = useContext(HowToContext);
    const [error, setError] = useState('');
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formOpen, setFormOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const onInputChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
        setDisabled(checkForRequiredFields());
    }

    const onSearchQueryChange = e => {
        const { value } = e.target;
        setSearchQuery(value);
    }

    const checkForRequiredFields = () => {
        const { name, description, steps, category } = formValues;
        if (name !== '' && description !== '' && steps !== '' && category !== '') {
            setError('');
            return false;
        }else {
            setError('Please fill out all required fields');
            return true;
        }
    }

    const openForm = () => {
        setFormOpen(true);
    }

    const closeForm = () => {
        setFormOpen(false);
        setFormValues(initialFormValues);
    }

    const addHowTo = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('/api/auth/howto/creator', formValues)
            .then(res => {
                console.log(res);
                setHowTos([...howTos, res.data]);
            })
            .catch(err => {
                console.log(err.response);
            })
        closeForm();
    }
    
    return (
        <section id='creator-dashboard'>
            <div className='form-container'>
                {!formOpen && <button onClick={openForm}>Add New How-To</button>}
                {formOpen && <form onSubmit={addHowTo}>
                    <label htmlFor='name'>Title*:&nbsp;</label>
                    <input 
                        type='text'
                        id='name'
                        name='name'
                        value={formValues.name}
                        onChange={onInputChange}
                    /><br/><br/>
                    <label htmlFor='description'>Description*:&nbsp;</label>
                    <input 
                        type='text'
                        id='description'
                        name='description'
                        value={formValues.description}
                        onChange={onInputChange}
                    /><br/><br/>
                    <label htmlFor='steps'>Steps*:&nbsp;</label>
                    <textarea 
                        id='steps'
                        name='steps'
                        value={formValues.steps}
                        onChange={onInputChange}
                    /><br/><br/>
                    <label htmlFor='category'>Category*:&nbsp;</label>
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
                    <button disabled={disabled}>Create How-To</button>&nbsp;
                    <button onClick={closeForm}>Cancel</button>
                    {error && <p className='error'>{error}</p>}
                </form>}
            </div>

            <h1 id='dashh1'>Creator Dashboard</h1>
            <input 
                type='text'
                value={searchQuery}
                onChange={onSearchQueryChange}
                placeholder='Search...'
            />
            <div id='howTosList'>
                {howTos.length > 0 && howTos.map(howTo => {
                    const searchString = `${howTo.name} ${howTo.description} ${howTo.category}`;
                    if (searchString.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '') {
                        return <Link id='linksDash' to={`/how-tos/${howTo.id}`} key={howTo.id}>
                                    <div className='how-to-card'>
                                        <h2>{howTo.name}</h2>
                                        <h3>{howTo.description}</h3>
                                        <p>Category: {howTo.category}</p>
                                        <p>Time to complete: {howTo.complexity}</p>
                                    </div>
                                </Link> 
                    } else {
                        return ''
                    }
                })}
            </div>
        </section>
    )
}

export default Creator;