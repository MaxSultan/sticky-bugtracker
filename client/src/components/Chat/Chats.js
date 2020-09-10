import React, { useState, useEffect, useContext } from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'
import Axios from 'axios'
import Message from './Message'
import { AuthContext } from '../../providers/AuthProvider'

export default function Chats(props) {
    const [messages, setMessages] = useState([])
    const [content, setContent] = useState('')
    const {user} = useContext(AuthContext)
    var today = new Date();
    var time = ((today.getHours()>12)?(today.getHours()-12):today.getHours()) +":"+ ((today.getMinutes() < 10)?"0":"") + today.getMinutes() + ((today.getHours()>12)? ' pm' : ' am')
    var date = today.getDate() +'/'+ (today.getMonth()+1) +'/'+ today.getFullYear()

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

    const handleSubmit = () => {
        addMessage(props.project_id, props.bug_id, {username: user.email, content: content, postTime: `${time} ${date}`})
        setContent('')
    }

    return (
        <div style={styles.chatBackground}>
            <h1 style={{textAlign:'center'}}><strong>chats</strong></h1>
            <div>
            {messages.map(m => <Message className='message' {...m}/>)}
            </div>
            <Form style={styles.chatContainer} onSubmit={() => handleSubmit()}>
                <Form.Group widths='equal' style={{padding:'1em'}}>
                    <Form.Input
                    attached='left'
                    name='content'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    action={{
                        backgroundColor: 'pink',
                        labelPosition:'right',
                        icon: 'add',
                    }}
                    />
                </Form.Group>
            </Form>
        </div>
    )
}

const styles = {
    chatContainer: {
        width: '100%',
        height: '100%',
    },
    chatBackground:{
        padding: '20px',
        borderRadius: '50px',
        overflowY: 'scroll',
        width:'60vw',
        margin: '20px',
    }
}
