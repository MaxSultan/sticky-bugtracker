import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Container, Header, Image, Icon, } from 'semantic-ui-react';
import ProjectForm from './ProjectForm';
import ProjectsNav from './ProjectsNav';
import Project from './Project'
import froggy_copy_no_letters from '../img/froggy_copy_no_letters.png'



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
            {/* <ProjectsNav showForm={showForm} setShowForm={setShowForm}/> */}
            {showForm && <ProjectForm add={addProject} showForm={showForm} setShowForm={setShowForm} />}
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Header as='h1' style={styles.head}><strong>Projects</strong></Header>
            <div style={styles.addBtn}><Icon style={styles.addIcon}name='add' size='huge' color='#101C17' onClick={() => setShowForm(!showForm)}/></div>
            </div>
            <Image src={froggy_copy_no_letters} style={styles.img}/>
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
    maxWidth: '900px',
    position:'relative',
    right:'-250px',
    margin:'20px',
  },
  head:{
    fontSize:'70px',
  },
  img:{
    maxHeight:'400px',
    position: 'fixed',
    left:'-224px',
  },
  addBtn:{
    background: '#93A081',
    border: '3px solid #41553F',
    boxSizing: 'border-box',
    borderRadius: '10px',
    width: '70px',
    height: '63px',
    diplay:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  addIcon:{
    color: '#101C17',
  }
}