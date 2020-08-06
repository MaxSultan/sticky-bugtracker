import React, { useState, useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import { useHistory } from 'react-router-dom'
import { Segment, Form, Header, Button } from 'semantic-ui-react'

export default function() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [fullName, setFullName] = useState('')
    const [company, setCompany] = useState('')
    const [role, setRole] = useState('')
    const auth = useContext(AuthContext)
    const history = useHistory()
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password === passwordConfirmation){
            auth.handleRegister({email: email, password: password, passwordConfirmation: passwordConfirmation, name: fullName}, history)
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
            case 'fullName':
            setFullName(value)
            break;
            case 'company':
            setCompany(value)
            break;
            case 'role':
            setRole(value)
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
                <Form.Group widths={"equal"}>
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
                    label="Name"
                    required
                    autoFocus
                    name='fullName'
                    value={fullName}
                    placeholder='Please enter your full name'
                    onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group widths={"equal"}>
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
            </Form.Group>
            <Form.Group widths={"equal"}>
                    <Form.Input
                        label="Company"
                        required
                        name='company'
                        value={company}
                        placeholder='Company Name'
                        onChange={handleChange}
                    />
                    <Form.Input
                        label="Role"
                        required
                        name='role'
                        value={role}
                        placeholder='Enter your Role'
                        onChange={handleChange}
                    />
            </Form.Group>
            <Segment textAlign='center' basic>
            <Button primary type='submit'>Submit</Button>
            </Segment>
            </Form>
        </Segment>
    )
}
