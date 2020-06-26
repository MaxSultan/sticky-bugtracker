import React from 'react';
import { Form, Header, Icon, } from "semantic-ui-react";
import axios from 'axios';

class ProductsForm extends React.Component {
  defaultValues = { name: "" };
  state = { ...this.defaultValues, };
  handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`api/projects`, {...this.state})
    .then( res => {
        this.props.add(res.data)
        this.props.setShowForm(!this.props.showForm)
    })
    .catch(err => console.log(err))
    this.setState({ ...this.defaultValues, });
  }

  handleChange = (e) => {
    const { target: { name, value, } } = e;
    this.setState({ [name]: value, });
  }

  handleClose = () => {
    const { id, setShowForm, setEditForm, showForm, editForm } = this.props
    setEditForm(false)
    setShowForm(false)
    
  }

  render() {
    const { name, } = this.state;
    return (
      <div style={styles.divform}>
        <Form onSubmit={this.handleSubmit} style={styles.formform}>
        <Icon style={styles.formbutton} name='close' onClick={() => this.handleClose}/>
        <Header as="h1">{this.props.id ? 'Edit Project' : 'Add New Project'}</Header>
          <Form.Group widths="equal">
            <Form.Input
              label="Name"
              name="name"
              placeholder="Name"
              value={name}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Button color="blue">Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

const styles = {
  divform: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#e6e6e6', 
    position: 'absolute',
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
  }
}

export default ProductsForm;