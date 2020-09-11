import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../providers/AuthProvider';
import Axios from 'axios'
import Bug from '../Bug/Bug';
import { Table } from 'semantic-ui-react';

export default function GetIndividualDevsBugs() {
    const [usersBugs, setUsersBugs] = useState([])
    const auth = useContext(AuthContext)

    useEffect(() => {
        Axios.get('/api/bugs/all')
        .then(res => {
            console.log(res.data)
            setUsersBugs(res.data.filter(bug => bug.assignedTo.toString() == auth.user.name))
        })
        .catch(err => console.log(err))
    },[])

    const renderUsersBugs = () => {
        console.log(usersBugs)
        return usersBugs.map(b => <Bug {...b}/>)
    }

    return (
        <div>
            <h3>Your Bugs: </h3>
            <Table celled>
                <Table.Header>
                <Table.Row >
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Severity</Table.HeaderCell>
                    <Table.HeaderCell>Assigned to:</Table.HeaderCell>
                    <Table.HeaderCell>Days worked on:</Table.HeaderCell>
                    <Table.HeaderCell>Current Stage</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                {renderUsersBugs()}
                </Table.Body>
            </Table>
        </div>
    )
}
