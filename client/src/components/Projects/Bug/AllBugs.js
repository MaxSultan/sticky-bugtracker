import React, { useState, useEffect } from 'react'
import { Table, Container, Header, Select } from 'semantic-ui-react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import BugView from './BugView'
import Bug from './Bug'

export default function AllBugs() {
    const [bugs, setBugs] = useState([])
    const [toggle, setToggle] = useState(false)
    const [filter1, setFilter1] = useState("")

    const getAllBugs = () => {
        Axios.get('/bugs/all').then(
            res => setBugs(res.data)
        ).catch(err => console.log(err))
    }

    useEffect( () => {
        getAllBugs()
    }, [])

    const opts = [
        {key:`AssignedTo`, value:'assignedTo', text:'Developer'},
        {key:`Days Worked On`, value:`Days Worked On`, text:`Days Worked On`},
        {key:`Severity`, value:`severity`, text:`Severity`},
        {key:`Status`, value:`status`, text:`Status`},
    ]

    const getFilterTwoVals = () => {
        console.log(filter1)
        console.log(bugs.map(b => b.assigned_to))
        // console.log(bugs.map(bug => ({key:`${bug.filter1}`, value:`${bug.filter1}`, text:`${bug.filter1}` })))
       return  Array.from(new Set(bugs.map(bug => ({key:`${bug.filter1}`, value:`${bug.filter1}`, text:`${bug.filter1}` }))))
    }

    return (
        <Container>
            <Header as='h1'>All Bugs</Header>
            <Header as='h3'>Filter By:</Header> <Select options={opts} onChange={(e)=>setFilter1(e.target.value), () => setToggle(true) }></Select>
            {toggle && <Select options={() => getFilterTwoVals()} onChange={(e)=>setFilter1(e.target.value) }></Select>}
        <Table celled style={{marginBottom:'20px'}}>
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
            {bugs.map(b => <Bug {...b}/>)}
            </Table.Body>
        </Table>
        </Container>
    )
}

