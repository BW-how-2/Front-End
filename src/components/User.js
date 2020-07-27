import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Link } from 'react-router-dom';
import { HowToContext } from '../contexts/HowToContext';


const User = () => {
    const { howTos } = useContext(HowToContext);
 
    return (
        <div>
            <h2>Dashboard</h2>
            <div>
               {howTos.map(howTo => {
                   return (
                       <div key={howTo.id}>
                            <h2>{howTo.name}</h2>
                            <h3>{howTo.description}</h3>
                            <p>{howTo.steps}</p>
                            <p>{howTo.category}</p>
                            <p>{howTo.complexity}</p>
                       </div>
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