import React, {useState} from 'react'
import { Card, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ProjectForm from './ProjectForm'

export default function Project(props) {
    const [editForm, setEditForm] =  useState(false)

    const {p, deleteProject} = props
    return (
        <Card key={`Project-${p.id}`}>
            <Card.Content>
                <Card.Header>{p.name }</Card.Header>
                <Card.Description>
                    {p.status}
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <Button as={Link} to={`/project/${p.id}`} style={styles.button}>
                    View
                </Button>
                <Button onClick={()=> deleteProject(p.id)}>Delete</Button>
                <Button onClick={()=> setEditForm(!editForm)} >Edit</Button>
            </Card.Content>
            {editForm && <ProjectForm id={p.id} initName={p.name} initStatus={p.status} update={props.update} editForm={editForm} setEditForm={setEditForm}/>}
      </Card>
    )
}

const styles = { 
    button: {
        backgroundColor: '#3f5164',
        color: '#d6d6e1',
    }
}