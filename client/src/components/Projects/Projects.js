import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Header, Image, Icon, } from 'semantic-ui-react';
import ProjectForm from './ProjectForm';
import Project from './Project'
import froggy_copy_no_letters from '../img/froggy_copy_no_letters.png'
import { useLocation } from 'react-router-dom';
import DeleteConfirmation from './DeleteConfirmation';



const Projects = (props) => {
    const location = useLocation()
    const [projects, setProjects] = useState([])
    const [showForm, setShowForm] = useState(location.form ? true : false)
    const [toggleAddBtn, setToggleAddBtn] = useState(false)
    const [animate, setAnimate] = useState(location.animate ? true : false)
    const [deleteName, setDeleteName] = useState('')
    const [deleteId, setDeleteId] = useState('')
    const [deleting, setDeleting] = useState(false)
    const [editing, setEditing] = useState(false)
    const [editId, setEditId] = useState('')
    const [editName, setEditName] = useState('')
    const [editStatus, setEditStatus] = useState('')

    useEffect(()=>{
        axios.get('/api/projects')
        .then( res => setProjects(res.data.filter(project => project.status.toString() !== 'inactive')))
        .catch( err => console.log(err))
    },[])

    const addProject = (projectObj) => {
        if (projectObj.status != "inactive") setProjects([projectObj, ...projects])
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
      }).filter(p => p.status !== "inactive")
      setProjects(updatedProjects)
    })
      .catch(err => console.log(err))
    }

    const renderProject = () => {
        if (Projects.length <= 0)
          return <h2>No Projects</h2>
        return projects.map(p => <Project {...p} update={updateProject} deleteProject={deleteProject} setAnimate={setAnimate} deleteFunction={deleteFunction} editFunction={editFunction}/>)
      }

    const adding = () => {
      setAnimate(!animate)
      setShowForm(!showForm)
    }

    const deleteFunction = (id, name) => {
      setDeleteId(id)
      setDeleteName(name)
      setAnimate(true)
      setDeleting(true)
    }

    const editFunction = (id, name, status) => {
      setEditId(id)
      setEditName(name)
      setEditStatus(status)
      setAnimate(true)
      setEditing(true)
    }
    
    return(
      <>
      {editing && 
        <ProjectForm 
          id={editId} 
          initName={editName} 
          initStatus={editStatus} 
          update={updateProject} 
          editForm={editing} 
          setEditForm={setEditing}
          setAnimate={setAnimate}
        />
      }
      {deleting && 
        <DeleteConfirmation
          deleteProject={deleteProject}
          id={deleteId} 
          name={deleteName} 
          setConfirmDelete={setDeleting}
          setAnimate={setAnimate}
        />
      }
      {showForm && <ProjectForm add={addProject} showForm={showForm} setShowForm={setShowForm} setAnimate={setAnimate}/>}
        <div className={animate ? "shrink" : "growContainer"}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Header as='h1' style={styles.head}><strong>Projects</strong></Header>
            <div 
            className={toggleAddBtn ? 'addBtnHover' : 'addBtn'} 
            onMouseEnter={() => setToggleAddBtn(true)} 
            onMouseLeave={()=> setToggleAddBtn(false)}
            >
              <Icon 
              style={toggleAddBtn ? styles.addIconHover : styles.addIcon} 
              name='add' 
              size='huge' 
              color='#101C17' 
              onClick={() => adding()}/>
            </div>
            </div>
            <Image src={froggy_copy_no_letters} style={styles.img} className={animate ? 'frogImgHover':'frogImg'}/>
            <div style={styles.divGrid}>
              {renderProject()}
            </div>
        </div>
      </>
    )
} 

export default Projects;

const styles = {
  divGrid: {
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'space-between',
    maxWidth: '900px',
    position:'relative',
    right:'-250px',
  },
  head:{
    fontSize:'5em',
  },
  img:{
    maxHeight:'400px',
    position: 'fixed',
    left:'-224px',
  },
  addIcon:{
    color: '#101C17',
  },
  addIconHover:{
    color: '#101C17',
    fontWeight:'700'
  },
  container:{
    minHeight:'100vh',
  },
}