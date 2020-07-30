import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { HowToContext } from '../contexts/HowToContext';

const User = () => {
    const { howTos } = useContext(HowToContext);
    const [searchQuery, setSearchQuery] = useState('');

    const onSearchQueryChange = e => {
        const { value } = e.target;
        setSearchQuery(value);
    }

    return (
        <div id='userBody'>
        <div id='dashheader'>
            <h1 id='dashh1'>Dashboard</h1>
            <input 
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={onSearchQueryChange}
                id='searchbar'
            />
            </div>
            <div id='howTosList'>
               {howTos.length > 0 && howTos.map(howTo => {
                   const searchInput = `${howTo.name} ${howTo.description} ${howTo.category}`;
                   if (searchInput.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '') {
                   return <Link id ='linksDash' key={howTo.id} to={`/howtos/${howTo.id}`}>     
                            <div className="how-to-card" >
                                <h2>{howTo.name}</h2>
                                <h3>{howTo.description}</h3>
                                <p>Category: {howTo.category}</p>
                                <p>Time To Complete: {howTo.complexity}</p>
                            </div>
                        </Link>                        
                   } else {
                       return ''
                   }
               })} 
            </div>
        </div>
        
    )
};

export default User;