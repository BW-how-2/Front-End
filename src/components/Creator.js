import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialFormValues = {
    name: '',
    description: '',
    steps: '',
    category: '',
    complexity: ''
}

const Creator = () => {
    const [howTos, setHowTos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formOpen, setFormOpen] = useState(false);

    const onInputChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const openForm = () => {
        setFormOpen(true);
    }

    const closeForm = () => {
        setFormOpen(false);
        setFormValues(initialFormValues);
    }

    useEffect(() => {
        
    }, []);
    
    return (
        <section id='creator-dashboard'>
            <div className='form-container'>
                {!formOpen && <button onClick={openForm}>Add New How-To</button>}
                {formOpen && <form>
                    <label htmlFor='name'>Title:&nbsp;</label>
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
                    <button>Create How-To</button>&nbsp;
                    <button onClick={closeForm}>Cancel</button>
                </form>}


            </div>
        </section>
    )
}

export default Creator;