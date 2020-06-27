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
                <Card.Meta>{p.department }</Card.Meta>
                <Card.Description>
                    {p.description }
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <Button as={Link} to={`/project/${p.id}`} color='blue'>
                    View
                </Button>
                <Button onClick={()=> deleteProject(p.id)}>Delete</Button>
                <Button onClick={()=> setEditForm(!editForm)} >Edit</Button>
                {editForm && <ProjectForm id={p.id} initName={p.name} update={props.update} editForm={editForm} setEditForm={setEditForm}/>}
            </Card.Content>
      </Card>
    )
}
