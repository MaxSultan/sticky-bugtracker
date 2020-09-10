import React, {useState} from 'react'
import { Card, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ProjectForm from './ProjectForm'
import DeleteConfirmation from './DeleteConfirmation'

export default function Project(props) {
    const [editForm, setEditForm] =  useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const {p, deleteProject} = props

    const deleting = () => {
        props.setAnimate(true)
        setConfirmDelete(true)
    }

    const editing = () => {
        props.setAnimate(true)
        setEditForm(!editForm)
    }

    return (
        <>
        <Card key={`Project-${p.id}`} style={styles.card}>
            <Card.Content>
                <Card.Header style={{fontSize:'32px', color:'#314231'}}><strong>{p.name}</strong></Card.Header>
                <Card.Description style={{fontSize:'13px'}}>
                    {p.status}
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <Button as={Link} to={`/project/${p.id}`} style={styles.button}>
                    View
                </Button>
                <Button onClick={()=> deleting()} style={styles.whiteBtn}>Delete</Button>
                <Button onClick={()=> editing()} style={styles.whiteBtn}>Edit</Button>
            </Card.Content>
      </Card>
      {editForm && 
                <ProjectForm 
                id={p.id} 
                initName={p.name} 
                initStatus={p.status} 
                update={props.update} 
                editForm={editForm} 
                setEditForm={setEditForm}
                setAnimate={props.setAnimate}
                />
            }
            {confirmDelete && 
                <DeleteConfirmation 
                deleteProject ={deleteProject} 
                id={p.id} 
                name={p.name} 
                setConfirmDelete={setConfirmDelete}
                setAnimate={props.setAnimate}
                />
            }
      </>
    )
}

const styles = { 
    button: {
        backgroundColor: '#41553F',
        color: '#d6d6e1',
    },
    card:{
        margin:'20px 0px',
        border:'2px solid #909AA7',
        background:'linear-gradient(#ffffff, #D6D6E1)',
        borderRadius:'10px',
    },
    whiteBtn:{
        border:'1px solid #909AA7',
    }
}