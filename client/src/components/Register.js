import React, { useState, useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import { useHistory } from 'react-router-dom'
import { Segment, Form, Header, Button } from 'semantic-ui-react'

export default function() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const auth = useContext(AuthContext)
    const history = useHistory()
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if(password === passwordConfirmation){
            auth.handleRegister({email: email, password: password, passwordConfirmation: passwordConfirmation}, history)
        } else {
            alert("Passwords do not match")
        }
    } 

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch(name){
            case 'email':
            setEmail(value)
            break;
            case 'password':
            setPassword(value)
            break;
            case 'passwordConfirmation':
            setPasswordConfirmation(value)
            break;
        }
        }

    return (
        <Segment basic>
            <Header as='h1' textAlign='center'>Register</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                label="Email"
                required
                autoFocus
                name='email'
                value={email}
                placeholder='Email'
                onChange={handleChange}
            />
            <Form.Input
                label="Password"
                required
                name='password'
                value={password}
                placeholder='Password'
                type='password'
                onChange={handleChange}
            />
            <Form.Input
                label="Password Confirmation"
                required
                name='passwordConfirmation'
                value={passwordConfirmation}
                placeholder='Password Confirmation'
                type='password'
                onChange={handleChange}
            />
            <Segment textAlign='center' basic>
            <Button primary type='submit'>Submit</Button>
          </Segment>
            </Form>
        </Segment>
    )
}
