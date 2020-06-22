import React, { useState, useContext, } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { Segment, Header, Form, Button } from 'semantic-ui-react';

export default function Login({ props }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const history = useHistory()
    const auth = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.handleLogin({ email: email, password: password, }, history );
    }

    const handleChange = (e) => {
        const { name, value, } = e.target;
        if(name === 'email'){
            setEmail(value)
        }
        if(name === 'password'){
            setPassword(value)
        }
        return
    }

    return (
        <Segment basic>
            <Header as='h1' textAlign='center'>Login</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                label='Email'
                autoFocus
                required
                name='email'
                value={email}
                placeholder='Enter Email'
                onChange={handleChange}
                />
                 <Form.Input
                label='Password'
                autoFocus
                required
                type='password'
                name='password'
                value={password}
                placeholder='Enter Password'
                onChange={handleChange}
                />
                <Segment textAlign='center' basic>
                    <Button primary type='submit'>Submit</Button>
                </Segment>
            </Form>
        </Segment>
    )
}
