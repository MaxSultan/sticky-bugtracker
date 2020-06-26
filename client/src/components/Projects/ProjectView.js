import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { Segment, Header, Button, Table } from 'semantic-ui-react';
import Bug from './Bug/Bug';
import BugForm from './Bug/BugForm';

export default function ProductView(props){
    const [product, setProduct] = useState({})
    const [bugs, setBugs] = useState([])
    const [bugForm, setBugForm] = useState(false)

    useEffect(()=> {
        Axios.get(`/api/projects/${props.match.params.id}`)
        .then(res => setProduct(res.data))
        .catch(err => console.log(err))

        Axios.get(`/api/projects/${props.match.params.id}/bugs`)
        .then(res => {
            setBugs(res.data)
        })
        .catch(err => console.log(err))
    },[])

    const addBug = (bugObj) => {
        setBugs([bugObj, ...bugs])
    }

    const deleteBug = (id) => {
        setBugs(bugs.filter(b => b.id !== id))
    }

    return(
        <div>
            <Segment>
                <Header as='h1' textAlign='center'>{product.name}</Header>
                <h3>Bugs</h3>
                <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Severity</Table.HeaderCell>
                    <Table.HeaderCell>Assigned to:</Table.HeaderCell>
                    <Table.HeaderCell>Date assigned</Table.HeaderCell>
                    <Table.HeaderCell>Date Due</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                {bugs.map(b => <Bug {...b} delete={deleteBug}/>)}
                </Table.Body>
                </Table>
                <Button onClick={()=> setBugForm(!bugForm)}>Add New Bug</Button>
                {bugForm && <BugForm add={addBug} bugForm={bugForm} setBugForm={setBugForm} id={props.match.params.id}/>}
                <br/>
                <br/>
                <Button color='black' onClick={() => props.history.push('/projects')}>Back</Button>
            </Segment>

        </div>
    )
}