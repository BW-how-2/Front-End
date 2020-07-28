import React, { useState, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { HowToContext } from '../contexts/HowToContext';

const initialFormValues = {
    name: 'Start a new life',
    description: 'Easiest way to begin your life anew',
    steps: 'Step 1: Burn your passport. Step 2: Steal someone elses passport and paste your own photo on top of theirs. Step 3: Fly to Argentina and begin your new life as a wheat farmer.',
    category: 'Travel',
    complexity: '2 Days'
}

const Creator = () => {
    const { howTos, setHowTos } = useContext(HowToContext);
    const [error, setError] = useState('');
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formOpen, setFormOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const onInputChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
        setDisabled(checkForRequiredFields());
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

            <div className='how-to-list'>
                {howTos.length > 0 && howTos.map(howTo => {
                    return <div key={howTo.id} className='how-to'>
                        <h3>{howTo.name}</h3>
                    </div>
                })}
            </div>
        </section>
    )
}

export default Creator;