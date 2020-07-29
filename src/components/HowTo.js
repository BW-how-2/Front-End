import React, {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

export default function HowTos(){

    const [howTo, setHowTo] = useState(null)
    const {howToId} = useParams()    
   
    useEffect(() => {
        axiosWithAuth().get(`/api/auth/howto/${howToId}`)
        .then((res) =>{
            console.log(res)
            setHowTo(res.data)
        })
    },[howToId])

    return(
        <div>
            {howTo && <container>
                <h2>{howTo.name}</h2>
                <h3>{howTo.description}</h3>
                <h3>{howTo.category}</h3>
                <h3>{howTo.complexity}</h3>
                <p>{howTo.steps}</p>
            </container>}
        </div>
    )
} 