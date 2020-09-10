import React from 'react'
import { Header } from 'semantic-ui-react'

export default function BugAtAGlance(props) {
    return (
        <div style={styles.glance}>
            <Header as='h1'>At a Glance:</Header>
            <p>Assigned to: {props.assignedTo}</p>
            <p>Severity: {props.severity}</p>
            <p>Current Stage: {props.current_stage}</p>
            <p>Status: {props.status}</p>
            <p>Days worked on: {props.diffDays}</p>
            <p>Date Assigned: {props.date_assigned}</p>
        </div>
    )
}

const styles = {
    glance: {
       backgroundColor:'#B8BCCF',
       padding: '2em',
       borderRadius:'1em', 
       width:'auto',
       display: 'inline-block',
    }
}