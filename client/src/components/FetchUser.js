import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import Axios from 'axios';

export default function FetchUser({ props }) {
    const [loaded, setLoaded] = useState(false);
    const auth = useContext(AuthContext)

    useEffect( () => {
        if(auth.authenticated){
            setLoaded(true)
        }else{
            if(checkLocalToken()){
                Axios
                .get('/api/auth/validate_token')
                .then(res => {
                    auth.setUser(res.data.data);
                    setLoaded(true)
                })
                .catch(err => {
                    setLoaded(true)
                })
            }else{
                setLoaded(true)
            }
        }
    },[])

    const checkLocalToken = () => {
        const token = localStorage.getItem('access-token')
        return token
    }

    return loaded ? props.children : null
}
