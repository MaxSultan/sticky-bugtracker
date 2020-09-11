import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


export default function Project(props) {
    return (
        <Card key={`Project-${props.id}`} style={styles.card}>
            <Card.Content>
                <Card.Header style={{fontSize:'32px', color:'#314231'}}><strong>{props.name}</strong></Card.Header>
                <Card.Description style={{fontSize:'13px'}}>{props.status}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as={Link} to={`/project/${props.id}`} style={styles.button}>
                    View
                </Button>
                <Button onClick={()=> props.deleteFunction(props.id, props.name)} style={styles.whiteBtn}>Delete</Button>
                <Button onClick={()=> props.editFunction(props.id, props.name, props.status)} style={styles.whiteBtn}>Edit</Button>
            </Card.Content>
      </Card>
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