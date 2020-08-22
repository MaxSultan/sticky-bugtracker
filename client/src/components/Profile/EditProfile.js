import React, { useState, useContext } from 'react';
import { Form, Header, Icon, Label, } from "semantic-ui-react";
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider';
import { useHistory } from 'react-router-dom';
import Dropzone from 'react-dropzone';

const EditProfile = (props) =>  {
    const {user} = useContext(AuthContext)
    const auth = useContext(AuthContext)
    const [name, setName] = useState(user.name ? user.name : '')
    const [email, setEmail] = useState(user.email ? user.email : '')
    const [role, setRole] = useState(user.role ? user.role : '')
    const [image, setImage] = useState(user.image ? user.image : '')

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.handleProfileEdit({ email: email, name: name, image: image});
        props.setEditProfile(false)
    }

    const onDrop = (file) => {
      setImage(file[0]);
    }

    return (
      <div style={styles.divform}>
        <Form onSubmit={handleSubmit} style={styles.formform}>
        <Icon style={styles.formbutton} name='close' onClick={() => props.setEditProfile(false)}/>
        <Header as="h1">Edit Profile</Header>
            <Form.Input
              label="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Input
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
              label="Role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <Label style={{margin:'1em', backgroundColor:'white', color:'black'}}>Profile Image
              <Dropzone
                onDrop={onDrop}
                multiple={false}
                value={''}
              >
                {({ getRootProps, getInputProps, isDragActive }) => {
                  return (
                    <div {...getRootProps()} style={styles.dropzone}>
                      <input {...getInputProps()} />
                      {
                        isDragActive ?
                          <p>Drop files here...</p> :
                          <p>Try dropping some files here, or click to select files to upload.</p>
                      }
                    </div>
                  )
                }}
              </Dropzone>
            </Label>
          <Form.Button color="blue">Submit</Form.Button>
        </Form>
      </div>
    )
}

const styles = {
  divform: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#e6e6e6', 
    position: 'fixed',
    top: '0px',
    left: '0px',
    zIndex:'1',
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
  },
  formform: {
    zIndex: '2',
    height: 'auto',
    width: "300px",
    padding: '20px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

  },
  formbutton: {
    justifySelf:'flex-end',
    alignSelf: 'flex-end',
  },
  dropzone:{
    height: "50px",
    width: "240px",
    border: "1px dashed black",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    margin:'.5em',
  }
}

export default EditProfile;