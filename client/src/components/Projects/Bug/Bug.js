import React from 'react'
import {Table} from 'semantic-ui-react'

export default function Bug(props) {
    return (
        <Table.Row>
            <Table.Cell>{props.title}</Table.Cell>
            <Table.Cell>{props.severity}</Table.Cell>
            <Table.Cell>{props.assignedTo}</Table.Cell>
            <Table.Cell>{props.created_at}</Table.Cell>
            <Table.Cell>{props.dueDate}</Table.Cell>
        </Table.Row>
    )
}
