import React, { useState, useEffect } from 'react'
import { Table } from 'semantic-ui-react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import BugView from './BugView'
import Bug from './Bug'

export default function AllBugs() {
    const [bugs, setBugs] = useState([])
    const [toggle, setToggle] = useState(false)

    const getAllBugs = () => {
        Axios.get('/bugs/all').then(
            res => setBugs(res.data)
        ).catch(err => console.log(err))
    }

    useEffect( () => {
        getAllBugs()
    }, [])

    return (
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
            {bugs.map(b => <Bug {...b}/>)}
                {/* {bugs.map(b => (
                    <Table.Row>
                    <Table.Cell><Link onClick={() => setToggle(!toggle)}>{b.title}</Link></Table.Cell>
                    <Table.Cell>{b.project_name}</Table.Cell>
                    <Table.Cell>{b.severity}</Table.Cell>
                    <Table.Cell>{b.assignedTo}</Table.Cell>
                    <Table.Cell>{b.diffDays}</Table.Cell>
                    <Table.Cell>{b.current_stage}</Table.Cell>
                    {toggle && <BugView {...b} setToggle={setToggle} toggle={toggle} delete={b.delete} update={b.update}/>}
                    </Table.Row>
                    ))} */}
            </Table.Body>
        </Table>
    )
}

