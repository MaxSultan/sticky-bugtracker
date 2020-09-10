import React from 'react'
import { Button, Card } from 'semantic-ui-react'

const DeleteConfirmation = (props) => {

    const deletePressed = () => {
        if (props.project_id) {
            props.deleteBug(props.project_id, props.id) 
            props.setConfirmBugDelete(false)
        }else{
            props.deleteProject(props.id)
            props.setAnimate(false)
            props.setConfirmDelete(false)
        }
    }

    const cancelPressed = () => {
        if(props.project_id) {
            props.setAnimate(false)
            props.setConfirmBugDelete(false) 
        }else{
            props.setAnimate(false)
            props.setConfirmDelete(false)
        }   
    }

    return(
    <div style={styles.delete}>
        <Card style={{padding:'2em'}}>
            <h3> Are you sure you want to delete {props.name}? </h3>
            {props.project_id ? 
                <p>Doing so will delete all associated chats. This infomation will not be able to be recovered.</p>:
                <p>Doing so will delete all associated active and inactive bugs and chats. This infomation will not be able to be recovered.</p>
            }
            <Button onClick={()=> deletePressed()}>Delete</Button>
            <Button onClick={()=> cancelPressed()}>Cancel</Button>
        </Card>
    </div>
    )
}
const styles = {
    delete: {
        height: '100vh',
        width: '100vw',
        backgroundColor: 'transparent', 
        position: 'fixed',
        top: '0px',
        left: '0px',
        zIndex:'1',
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
    }
}
export default DeleteConfirmation
