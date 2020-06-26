import React, { useState, useEffect, useContext } from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'
import Axios from 'axios'
import Message from './Message'
import { AuthContext } from '../../../../providers/AuthProvider'

export default function Chats(props) {
    const [messages, setMessages] = useState([])
    const [content, setContent] = useState('')
    const {user} = useContext(AuthContext)
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();

    const getMessages = (project_id, bug_id) => {
        Axios.get(`/api/projects/${project_id}/bugs/${bug_id}/chats`)
        .then(res => setMessages(res.data))
        .catch(err => console.log(err))
    }
    
    const addMessage = (project_id, bug_id, chatObj) => {
        Axios.post(`/api/projects/${project_id}/bugs/${bug_id}/chats`, chatObj)
        .then(res => {
            console.log(res.data)
            setMessages([...messages, res.data]
                )})
        .catch(err => console.log(err))
    }

    useEffect(() => {
      getMessages(props.project_id, props.bug_id)  
    },[])

    return (
        <div style={styles.chatBackground}>
            chats
            <div>
            {messages.map(m => <Message {...m}/>)}
            </div>
            <Form style={styles.chatContainer} onSubmit={() => addMessage(props.project_id, props.bug_id, {username: user.email, content: content, postTime: time})}>
                <Form.Group>
                    <Form.Input
                    name='content'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}/>
                    <Button 
                    icon='add' 
                    name='add'
                    size='big' 
                    color='red'
                    circular='true' 
                    />
                </Form.Group>
            </Form>
        </div>
    )
}

const styles = {
    chatContainer: {
        width: '250px',
        height: '400px',
    },
    chatBackground:{
        backgroundColor:'black',
        padding: '20px',
        borderRadius: '50px',
        overflowY: 'scroll',
        maxHeight: '500px',
        width:'auto',
    }
}
