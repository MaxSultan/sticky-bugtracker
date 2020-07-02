import React, { useState } from 'react'
import { Card, Header, Icon, Button } from 'semantic-ui-react'
import Axios from 'axios'
import Chats from './Chat/Chats'
import BugForm from './BugForm'

export default function BugView(props) {
    const [chat, toggleChat] = useState(false)
    const [editing, setEditing] = useState(false)

    const deleteBugFromDb = (project_id, bug_id) => {
        Axios.delete(`/api/projects/${project_id}/bugs/${bug_id}`)
        .then(res => {
            console.log(res.data)
            props.delete(bug_id)
            props.setToggle(!props.toggle)
        })
    }

    const toHumanDate = (date) => {
        let newDate = new Date(date).toDateString()
        return newDate
    }

    return (
        <div style={styles.views}>
        <Card raised='true'>
            <div style={styles.grid}>
            <Header as='h1'> {props.title}</Header>
            <Icon name='close' onClick={() => props.setToggle(!props.toggle)} style={{marginTop:'5px'}}/>
            </div>
            <Card.Meta style={{marginLeft:'12px'}}>Status: {props.status}<br/>Severity: {props.severity}<br/> Current Stage: {props.current_stage}</Card.Meta>
                <Card.Content>Description: {props.description}</Card.Content>
                <Card.Content>Steps to Recreate: {props.steps}</Card.Content>
                <Card.Content>Desired Result: {props.result}</Card.Content>
                <Card.Content>Currently Assigned to: {props.assignedTo}</Card.Content>
                <Card.Content>Screenshots: {props.screenShots}</Card.Content>
                <Card.Content>Due Date: {toHumanDate(props.dueDate)}</Card.Content>
                <Card.Content>Date Assigned: {toHumanDate(props.date_assigned)}</Card.Content>
                <Card.Content>Date Work Began: {toHumanDate(props.date_work_began)}</Card.Content>
                <Card.Content extra>
                    <Card.Group>
                        <Button style={styles.buttons} onClick={() => setEditing(!editing)}>Edit</Button>
                        <Button style={styles.buttons} onClick={() => deleteBugFromDb(props.project_id, props.id)}>Delete</Button>
                        <Button style={styles.buttons} onClick={() => toggleChat(!chat)}>View Chat</Button>
                    </Card.Group>
                </Card.Content>
        </Card>
        {editing && <BugForm 
        bug_id={props.id} 
        projectEditId={props.project_id}
        // editBug={editBug} 
        initTitle={props.title}
        initSeverity={props.severity}
        initDescription={props.description}
        initSteps={props.steps}
        initResult={props.result}
        initAssignedTo={props.assignedTo}
        initScreenShots={props.screenShots}
        initDueDate={props.dueDate}
        init_date_assigned={props.date_assigned}
        init_date_work_began={props.date_work_began}
        initStatus={props.status}
        init_current_stage={props.current_stage}
        editing={editing}
        setEditing={setEditing}
        update={props.update}
        />}
        {chat && <Chats project_id={props.project_id} bug_id={props.id}/>}
       </div>
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
    },
    grid:{
        display:'flex',
        justifyContent:'space-between',
        margin:'5px'
    }
}
