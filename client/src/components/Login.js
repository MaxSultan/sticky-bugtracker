import React, { useState, useContext, } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { Segment, Header, Form, Button, Image, Container } from 'semantic-ui-react';
import frog_no_letters from './img/froggy_copy_no_letters.png'

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
        <Container style={styles.center}>
            <div style={styles.layout}>
                <Segment basic style={styles.left}>
                    <Form onSubmit={handleSubmit} style={styles.form}>
                    <Header as='h1' textAlign='center'>Login</Header>
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
                <Segment style={styles.right}>
                    <Image src={frog_no_letters} style={styles.image}/>
                </Segment>
            </div>
        </Container>
    )
}

const styles = {
    layout: {
        display: 'flex',
        width: '100vw',
        height: '86vh',
        justifyContent: 'center'
    },
    left: {
        backgroundColor: '#667582',
        borderRadius: '1em',
        width:'40%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        margin:'1em',
        flexGrow:'1',
        marginRight:'.5em'
    },
    right:{
        backgroundColor: '#41553F',
        borderRadius: '1em',
        width:'40%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexGrow:'1',
        margin:'1em',
        marginLeft:'.5em'
    },
    image:{
        maxWidth: '30em',
    },
    center: {
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        height: '86vh',
        width: '100vw',
    },
    form:{
        flexGrow:'2',
        padding: '1em',
    }
}