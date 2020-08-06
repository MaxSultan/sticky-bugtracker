import React, { useEffect } from 'react'
import Axios from 'axios'

export default function GetIndividualDevsBugs() {

    useEffect(() => {
        Axios.get('/api/')
    },[])
    return (
        <div>
            
        </div>
    )
}
