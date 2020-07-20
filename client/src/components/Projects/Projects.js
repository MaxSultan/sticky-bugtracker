import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Container, Header,} from 'semantic-ui-react';
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
        setProjects([projectObj, ...projects])
    }

    const deleteProject = (project_id) => {
      axios.delete(`/api/projects/${project_id}`)
      .then(res => {
       setProjects(projects.filter(p => p.id !== res.data.id))
      })
    } 

    const updateProject = (project_id, projectObj) => {
      axios.put(`/api/projects/${project_id}`, projectObj)
      .then(res => {
        const updatedProjects = projects.map(p => {
        if (p.id == project_id) 
          return res.data
        return p
      })
      setProjects(updatedProjects)
    })
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
            {showForm && <ProjectForm add={addProject} showForm={showForm} setShowForm={setShowForm} />}
            <Header as='h1' textAlign='center'>Projects</Header>
            <div style={styles.divGrid}>
              {renderProject()}
            </div>
        </Container>
    )
} 

export default Projects;

const styles = {
  divGrid: {
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'space-around',
  }
}