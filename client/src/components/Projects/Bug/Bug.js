import React, { useState } from 'react'
import {Table} from 'semantic-ui-react'
import BugView from './BugView'
import { Link } from 'react-router-dom'

export default function Bug(props) {
    const [toggle, setToggle] = useState(false)
    return (
        <Table.Row>
            <Table.Cell><Link onClick={() => setToggle(!toggle)}>{props.title}</Link></Table.Cell>
            <Table.Cell>{props.severity}</Table.Cell>
            <Table.Cell>{props.assignedTo}</Table.Cell>
            <Table.Cell>{props.created_at}</Table.Cell>
            <Table.Cell>{props.dueDate}</Table.Cell>
            {toggle && <BugView {...props} setToggle={setToggle} toggle={toggle} delete={props.delete} update={props.update}/>}
        </Table.Row>
    )
}
