import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Card, Button, Container, Menu, } from 'semantic-ui-react';
import { Link, Switch, Route } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import ProjectsNav from './ProjectsNav';
import Project from './Project'



const Projects = (props) => {
    const [projects, setProjects] = useState([])
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

    const updateProject = (project_id) => {
      axios.put(`/api/projects/${project_id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }

    const renderProject = () => {
        if (Projects.length <= 0)
          return <h2>No Projects</h2>
        return projects.map(p => <Project p={p} update={updateProject} deleteProject={deleteProject}/>)
      }

    return(
        <Container>
            <ProjectsNav showForm={showForm} setShowForm={setShowForm}/>
            <h1>Projects</h1>
            {showForm && <ProjectForm add={addProject} showForm={showForm} setShowForm={setShowForm} />}
                {renderProject()}
        </Container>
    )
} 

export default Projects;