import React, { useState } from 'react'
import {Table} from 'semantic-ui-react'
import BugView from './BugView'
import { Link } from 'react-router-dom'

export default function Bug(props) {
    const [toggle, setToggle] = useState(false)
    var today = new Date();
    var startDate = new Date(props.date_work_began)
    const diffTime = Math.abs(startDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const status = () => {
        if (diffDays >= 30){
            return (
                <Table.Row negative style={{backgroundColor:'rgba(249,104,112, 0.4)', color:''}}>
                    <Table.Cell><Link to={{
                        pathname: `/projects/${props.project_id}/bugs/${props.id}`,
                        state: {
                            project_id: props.project_id, 
                            id: props.id,
                            diffDays: diffDays,
                        },
                        }}>{props.title}</Link></Table.Cell>
                    <Table.Cell>{props.severity}</Table.Cell>
                    <Table.Cell>{props.assignedTo}</Table.Cell>
                    <Table.Cell>{diffDays}</Table.Cell>
                    <Table.Cell>{props.current_stage}</Table.Cell>
                    {/* {toggle && <BugView {...props} setToggle={setToggle} toggle={toggle} delete={props.delete} update={props.update} diffDays={diffDays}/>} */}
                </Table.Row>
            )
        }else if (diffDays >= 7){
            return(
                <Table.Row style={{backgroundColor: '#FFFFB7', color:'#cccc00'}}>
                    <Table.Cell><Link to={{
                        pathname: `/projects/${props.project_id}/bugs/${props.id}`,
                        state: {
                            project_id: props.project_id, 
                            id: props.id,
                            diffDays: diffDays,
                        },
                        }}>{props.title}</Link></Table.Cell>
                    <Table.Cell>{props.severity}</Table.Cell>
                    <Table.Cell>{props.assignedTo}</Table.Cell>
                    <Table.Cell>{diffDays}</Table.Cell>
                    <Table.Cell>{props.current_stage}</Table.Cell>
                    {toggle && <BugView {...props} setToggle={setToggle} toggle={toggle} delete={props.delete} update={props.update}/>}
                </Table.Row>
            )
        }else{
            return (
                <Table.Row >
                    <Table.Cell><Link to={{
                        pathname: `/projects/${props.project_id}/bugs/${props.id}`,
                        state: {
                            project_id: props.project_id, 
                            id: props.id,
                            diffDays: diffDays,
                        },
                        }}>{props.title}</Link></Table.Cell>
                    <Table.Cell>{props.severity}</Table.Cell>
                    <Table.Cell>{props.assignedTo}</Table.Cell>
                    <Table.Cell>{diffDays}</Table.Cell>
                    <Table.Cell>{props.current_stage}</Table.Cell>
                    {toggle && <BugView {...props} setToggle={setToggle} toggle={toggle} delete={props.delete}/>}
                </Table.Row>
            )
        }
    }

    return (
        <>
        {status()}
        </>
    )
}
