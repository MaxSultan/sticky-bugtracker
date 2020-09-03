import React, { useEffect, useState } from 'react'
import {Header} from 'semantic-ui-react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Project from './Projects/Project';

export default function Archives() {
    const location = useLocation()
    const [projects, setProjects] = useState([])

    useEffect(()=>{
        axios.get('/api/projects')
        .then( res => setProjects(res.data.filter(project => project.status.toString() == 'inactive')))
        .catch( err => console.log(err))
    },[])

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
      }).filter(p => p.status == "inactive")
      setProjects(updatedProjects)
    })
      .catch(err => console.log(err))
    }

    const renderProject = () => {
        if (projects.length <= 0)
          return <h2>No Projects</h2>
        return projects.map(p => <Project p={p} update={updateProject} deleteProject={deleteProject}/>)
      }

    return (
        <div>
            <Header as='h1' style={{fontSize:'5em'}}><strong>Archives</strong></Header>
            <div style={styles.divGrid}>
              {renderProject()}
            </div>
        </div>
    )
}

const styles = {
    divGrid: {
      display:'flex',
      flexWrap:'wrap',
      justifyContent:'space-between',
      maxWidth: '900px',
      position:'relative',
      right:'-250px',
    },
}