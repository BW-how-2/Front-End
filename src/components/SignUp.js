import React, { useState } from 'react'

const initialForm={
    username: '',
    password: '',
    roll: ''
}

export default function SignUp(){

    const [form, setForm] = useState(initialForm)


    return(
        <form>
            <h1>Please Register</h1>
                <p> Please type a username:</p>
                <input id='username' name='username'></input> 

                <p>Please type a password:</p>
                <input id='password' name='password'></input>

                <p>Please select a roll:</p>
                <select name='roll'>
                    <option disabled value=''>Select Roll</option>
                    <option value='user'>User</option>
                    <option value='creator'>Creator</option>
                </select>

                <br></br>

                <button>Submit</button>
        </form>
    )
}