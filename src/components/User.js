import React, { useContext } from 'react';
import axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Switch, Link } from 'react-router-dom';
import { HowToContext } from '../contexts/HowToContext';
import {HowToPage} from '../components/HowToPage'

const User = () => {
    const { howTos } = useContext(HowToContext);
 
    return (
        <div>
            <h2>Dashboard</h2>
            <div>
               {howTos.map(howTo => {
                   return (
                   <Link key={howTo.id} to={`/howtos/${howTo.id}`}>     
                        <div className="how-to-card" >
                            <h2>{howTo.name}</h2>
                            <h3>{howTo.description}</h3>
                            <p>{howTo.category}</p>
                            <p>{howTo.complexity}</p>
                       </div>
                    </Link> 
                   )
               })} 
            </div>
        

            <div>
                <h4>Already have an account?</h4>
                <Link to="/login">
                    <button>Login</button>
                </Link>

            </div>
        </div>
        
    )
};

export default User;