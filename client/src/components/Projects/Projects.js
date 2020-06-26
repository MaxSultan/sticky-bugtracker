import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Card, Button, Container, Menu, } from 'semantic-ui-react';
import { Link, Switch, Route } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import ProjectsNav from './ProjectsNav';



const Project = (props) => {
    const [Projects, setProjects] = useState([])
    const [showForm, setShowForm] = useState(false)
    
    useEffect(()=>{
        axios.get('/api/projects')
        .then( res => setProjects(res.data))
        .catch( err => console.log(err))
    },[])

    const addProject = (projectObj) => {
        console.log(projectObj)
        setProjects([projectObj, ...Projects])
    }

    const deleteProject = (project_id) => {
      axios.delete(`/api/projects/${project_id}`)
      .then(res => {
       setProjects(Projects.filter(p => p.id !== res.data.id))
      })
    } 

    const renderProject = () => {
        if (Projects.length <= 0)
          return <h2>No Project</h2>
        return Projects.map( Project => (
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
              <Button onClick={()=> deleteProject(Project.id)}>Delete</Button>
              <Button>Edit</Button>
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