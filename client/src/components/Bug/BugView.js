import React, { useState, useEffect } from 'react'
import { Header, Icon, Button, Image } from 'semantic-ui-react'
import Axios from 'axios'
import Chats from '../Chat/Chats'
import BugForm from './BugForm'
import BugAtAGlance from './BugAtAGlance'
import DeleteConfirmation from '../Projects/DeleteConfirmation'

export default function BugView(props) {
    const [chat, toggleChat] = useState(false)
    const [editing, setEditing] = useState(false)
    const [showImage, setShowImage] = useState(false)
    const [currentBug, setCurrentBug] = useState({})
    const [confirmBugDelete, setConfirmBugDelete] = useState(false)
    const [animate, setAnimate] = useState(false)

    const getBug = () => {
        Axios.get(`/api/projects/${props.location.state.project_id}/bugs/${props.location.state.id}`)
        .then(res => setCurrentBug(res.data))
        .catch(err => console.log(err))
    }
    useEffect(()=> {
        getBug()
    }, [])

    const deleteBugFromDb = (project_id, bug_id) => {
        Axios.delete(`/api/projects/${project_id}/bugs/${bug_id}`)
        .then(res => {
            console.log(res.data)
            props.history.push(`/project/${project_id}`)
        })
        .catch(err=> console.log(err))
        
    }

    const toHumanDate = (date) => {
        let newDate = new Date(date).toDateString()
        return newDate
    }

    const deleting = () => {
        setAnimate(true)
        setConfirmBugDelete(!confirmBugDelete)
    }

    return (
        <div style={styles.views}>
            <div className={animate ? "shrink" : "grow"}>
                <div style={styles.grid}>
                <Header as='h1' style={{fontSize:'70px'}}><strong>{currentBug.title}</strong></Header>
                <Icon name='close' onClick={() => props.history.goBack()} style={{marginTop:'5px'}}/>
                </div>
                <div style={styles.format}>
                    <div style={{maxWidth:'50%'}}>
                        <h3>Description: {currentBug.description}</h3>
                        <h3>Steps to Recreate: {currentBug.steps}</h3>
                        <h3>Desired Result: {currentBug.result}</h3>
                        <h3>Currently Assigned to: {currentBug.assignedTo}</h3>
                        <h3>Screenshots: {currentBug.screenShots !== null ? <Button onClick={() => setShowImage(!showImage)}>View Screenshots</Button> : "No Screenshots"} </h3>
                        {showImage && 
                        <div style={styles.imgContainer}>
                            <div style={styles.imgHeader}>
                                <Icon name='window close' onClick={() => setShowImage(false)}/>
                            </div>
                        <Image src={currentBug.screenShots} style={{height: '80vh', width:'80vw'}}/>
                        </div>}
                    </div>
                    <BugAtAGlance
                    assignedTo={currentBug.assignedTo} 
                    severity={currentBug.severity} 
                    status={currentBug.status} 
                    current_stage={currentBug.current_stage} 
                    diffDays={props.location.state.diffDays}
                    date_assigned={toHumanDate(currentBug.date_assigned)}
                    />
                </div>
                <h3>Due Date: {toHumanDate(currentBug.dueDate)}</h3>
                <h3>Date Created: {toHumanDate(currentBug.created_at)}</h3>
                <h3>Date Assigned: {toHumanDate(currentBug.date_assigned)}</h3>
                <h3>Date Work Began: {toHumanDate(currentBug.date_work_began)}</h3>
                <h3 extra>
                <div>
                    <Button style={styles.buttons} onClick={() => setEditing(!editing)}>Edit</Button>
                    <Button style={styles.buttons} onClick={() => deleting()}>Delete</Button>
                    <Button style={styles.buttons} onClick={() => toggleChat(!chat)}>{chat ? 'Hide Chat' : 'View Chat'}</Button>
                </div>
                </h3>
                <hr/>
                {chat && <Chats project_id={currentBug.project_id} bug_id={currentBug.id}/>}
            </div>
            {confirmBugDelete && 
                    <DeleteConfirmation 
                    id={currentBug.id}
                    project_id={currentBug.project_id}
                    name={currentBug.title} 
                    setConfirmBugDelete={setConfirmBugDelete}
                    deleteBug={deleteBugFromDb}
                    setAnimate={setAnimate}
                    />
                }
            {editing && <BugForm 
            bug_id={currentBug.id} 
            projectEditId={currentBug.project_id}
            initTitle={currentBug.title}
            initSeverity={currentBug.severity}
            initDescription={currentBug.description}
            initSteps={currentBug.steps}
            initResult={currentBug.result}
            initAssignedTo={currentBug.assignedTo}
            initScreenShots={currentBug.screenShots}
            initDueDate={currentBug.dueDate}
            init_date_assigned={currentBug.date_assigned}
            init_date_work_began={currentBug.date_work_began}
            initStatus={currentBug.status}
            init_current_stage={currentBug.current_stage}
            editing={editing}
            setEditing={setEditing}
            getBug={getBug}
            devOptions={props.location.state.developers}
            />}
       </div>
    )
}

const styles = {
    views: {
        minHeight:'80vh',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        color: 'black',
    },
    buttons: {
        margin: '10px 2px',
    },
    grid:{
        display:'flex',
        justifyContent:'space-between',
        margin:'5px',
        width:'60vw',
    },
    imgContainer:{
        position: 'fixed',
        top:'0px',
        left:'0px',
        height:'100vh',
        width: '100vw',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#909aa7'
    },
    imgHeader:{
        position: 'fixed',
        top:'0px',
        width: '100vw',
        display: 'flex',
        justifyContent:'flex-end',
    },
    format:{
        display: 'flex',
        justifyContent:'space-between',
        width: '60vw',
    }
}
