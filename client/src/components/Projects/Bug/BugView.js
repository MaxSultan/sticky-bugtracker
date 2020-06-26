import React, { useState } from 'react'
import { Card, Header, Icon, Button } from 'semantic-ui-react'
import Axios from 'axios'
import Chats from './Chat/Chats'

export default function BugView(props) {
    const [chat, toggleChat] = useState(false)

    const deleteBugFromDb = (project_id, bug_id) => {
        Axios.delete(`/api/projects/${project_id}/bugs/${bug_id}`)
        .then(res => {
            console.log(res.data)
            props.delete(bug_id)
            props.setToggle(!props.toggle)
        })
    }

    return (
        <div style={styles.views}>
        <Card>
            <Icon name='close' onClick={() => props.setToggle(!props.toggle)}/>
            <Header>Bug Title: {props.title}</Header>
            <Card.Content>Severity: {props.severity}</Card.Content>
                <Card.Content>Description:<br/> {props.description}</Card.Content>
                <Card.Content>Steps to Recreate:<br/> {props.steps}</Card.Content>
                <Card.Content>Desired Result:<br/> {props.result}</Card.Content>
                <Card.Content>Currently Assigned to:<br/> {props.assignedTo}</Card.Content>
                <Card.Content>Screenshots:<br/> {props.screentShots}</Card.Content>
                <Card.Content>Due Date:<br/> {props.dueDate}</Card.Content>
                <Card.Content extra>
                    <Card.Group>
                        <Button style={styles.buttons}>Edit</Button>
                        <Button style={styles.buttons} onClick={() => deleteBugFromDb(props.project_id, props.id)}>Delete</Button>
                        <Button style={styles.buttons} onClick={() => toggleChat(!chat)}>View Chat</Button>
                    </Card.Group>
                </Card.Content>
        </Card>
        {chat && <Chats project_id={props.project_id} bug_id={props.id}/>}
       </div>
    //    description: "", 
    //    steps: "", 
    //    results: "", 
    //    assignedTo:"", 
    //    severity:"", 
    //    screenShots:"",
    //    dueDate: "",  
    )
}

const styles = {
    views: {
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: '0px',
        left: '0px',
        backgroundColor: '#d6d6d6',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttons: {
        margin: '10px 2px',
    }
}
