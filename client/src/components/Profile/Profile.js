import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Header } from 'semantic-ui-react'
import GetIndividualDevsBugs from './GetIndividualDevsBugs';

export default function Profile() {
    const auth = useContext(AuthContext)
    return (
        <div>
            <Header as='h1' style={{fontSize:'5em'}}><strong>Profile</strong></Header>
            <h3>Name: {auth.user.name}</h3>
            <h3>Email: {auth.user.email}</h3>
            <h3>Company: {auth.user.company}</h3>
            <h3>Role: {auth.user.role}</h3>
            <GetIndividualDevsBugs/>
        </div>
    )
}
