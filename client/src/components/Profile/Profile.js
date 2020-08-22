import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Header, Image, Button } from 'semantic-ui-react'
import GetIndividualDevsBugs from './GetIndividualDevsBugs';
import EditProfile from './EditProfile';
import { useLocation } from 'react-router-dom';
import defautImg from '../img/default_profile.jpg'

export default function Profile() {
    const auth = useContext(AuthContext)
    const location = useLocation()
    const [editProfile, setEditProfile] = useState(location.form ? true : false)
    return (
        <div>
            <Header as='h1' style={{fontSize:'5em'}}><strong>Your Profile</strong></Header>
            <div style={style.profileCard}>
                <div>
                    <h3>Name: {auth.user.name}</h3>
                    <h3>Email: {auth.user.email}</h3>
                    <h3>Company: {auth.user.company}</h3>
                    <h3>Role: {auth.user.role}</h3>
                </div>
                <Image style={{backgroundColor:'black', height:'14em', width:'14em', borderRadius: '2em'}} src={auth.image ? auth.image : defautImg}/>
            </div>
            <Button onClick={() => setEditProfile(!editProfile)}>Edit Profile</Button>
            {editProfile && <EditProfile setEditProfile={setEditProfile}/>}
            <GetIndividualDevsBugs/>
        </div>
    )
}

const style= {
    profileCard: {
        display:'flex',
        justifyContent: 'space-between',
        border: '0.2em solid black',
        padding: '2em',
        borderRadius: '2em',
        margin: '4em',
        background: "linear-gradient(#B8BCCF, #667582)"
    }
}