import React, { useEffect, useState } from 'react'
import { Header, Table, } from 'semantic-ui-react'
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Project from './Projects/Project';
import ProjectForm from './Projects/ProjectForm'
import DeleteConfirmation from './Projects/DeleteConfirmation';

export default function Archives() {
    const location = useLocation()
    const [projects, setProjects] = useState([])
    const [archivedBugs, setArchivedBugs] = useState([])
    const [editing, setEditing] = useState(false)
    const [editId, setEditId] = useState('')
    const [editName, setEditName] = useState('')
    const [editStatus, setEditStatus] = useState('')
    const [deleteName, setDeleteName] = useState('')
    const [deleteId, setDeleteId] = useState('')
    const [deleting, setDeleting] = useState(false)

    useEffect(()=>{
        axios.get('/api/projects')
        .then( res => setProjects(res.data.filter(project => project.status.toString() == 'inactive')))
        .catch( err => console.log(err))

        axios.get("/api/bugs/all_project")
        .then(res => setArchivedBugs(res.data.filter(b => b.status == "complete" && b.current_stage == "fixed")))
        .catch(err => console.log(err))
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

    const editFunction = (id, name, status) => {
      setEditId(id)
      setEditName(name)
      setEditStatus(status)
      setEditing(true)
    }

    const deleteFunction = (id, name) => {
      setDeleteId(id)
      setDeleteName(name)
      setDeleting(true)
    }

    const renderProject = () => {
        if (projects.length <= 0)
          return <h2>No Projects</h2>
        return projects.map(p => <Project {...p} deleteFunction={deleteFunction} editFunction={editFunction} update={updateProject} deleteProject={deleteProject}/>)
      }

      const renderBugs = () => {
        if (archivedBugs.length <= 0)
        return <h2>No Bugs</h2>
      return archivedBugs.map(bug => (
        <Table.Row>
        <Table.Cell>{bug.project_name}</Table.Cell>
        <Table.Cell><Link to={{
            pathname: `/projects/${bug.project_id}/bugs/${bug.id}`,
            state: {
                project_id: bug.project_id, 
                id: bug.id,
                // diffDays: diffDays,
                developers: bug.developers
            },
            }}>{bug.title}</Link></Table.Cell>

        <Table.Cell>{bug.severity}</Table.Cell>
        <Table.Cell>{bug.assignedTo}</Table.Cell>
        {/* <Table.Cell>{diffDays}</Table.Cell> */}
        <Table.Cell>4</Table.Cell>
        <Table.Cell>{bug.current_stage}</Table.Cell>
    </Table.Row>
      ))
      }

    return (
      <>
        <div>
            <Header as='h1' style={{fontSize:'5em'}}><strong>Archives</strong></Header>
            <div style={styles.divGrid}>
              {renderProject()}
            </div>
            <section>
              <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Project</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Severity</Table.HeaderCell>
                        <Table.HeaderCell>Assigned to:</Table.HeaderCell>
                        <Table.HeaderCell>Days worked on:</Table.HeaderCell>
                        <Table.HeaderCell>Current Stage</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {renderBugs()}
                </Table.Body>
              </Table>
            </section>
        </div>
        {editing && 
          <ProjectForm
            id={editId} 
            initName={editName} 
            initStatus={editStatus} 
            update={updateProject} 
            editForm={editing} 
            setEditForm={setEditing}
          />
        }
        {deleting && 
          <DeleteConfirmation
            deleteProject={deleteProject}
            id={deleteId} 
            name={deleteName} 
            setConfirmDelete={setDeleting}
          />
        }
      </>
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