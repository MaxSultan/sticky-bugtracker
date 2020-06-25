import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Card, Button, Container, Menu, } from 'semantic-ui-react';
import { Link, Switch, Route } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import ProjectsNav from './ProjectsNav';



const Project = (props) => {
    const [Project, setProject] = useState([])
    const [showForm, setShowForm] = useState(false)
    
    useEffect(()=>{
        axios.get('/api/projects')
        .then( res => setProject(res.data))
        .catch( err => console.log(err))
    },[])

    const addProject = (projectObj) => {
        console.log(projectObj)
        setProject([projectObj, ...Project])
    }

    const renderProject = () => {
        if (Project.length <= 0)
          return <h2>No Project</h2>
        return Project.map( Project => (
          <Card key={`Project-${Project.id}`}>
            <Card.Content>
              <Card.Header>{ Project.name }</Card.Header>
              <Card.Meta>{ Project.department }</Card.Meta>
              <Card.Description>
                { Project.description }
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button as={Link} to={`/project/${Project.id}`} color='blue'>
                View
              </Button>
            </Card.Content>
          </Card>
        ))
      }

    return(
        <Container>
            <ProjectsNav showForm={showForm} setShowForm={setShowForm}/>
            <h1>Projects</h1>
            {showForm && <ProjectForm add={addProject} showForm={showForm} setShowForm={setShowForm}/>}
            <Card.Group>
                {renderProject()}
            </Card.Group>
          </Container>
    )
} 

export default Project;