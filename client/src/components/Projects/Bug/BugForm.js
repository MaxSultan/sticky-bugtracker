import React from 'react';
import { Form, Header, Icon, } from "semantic-ui-react";
import axios from 'axios';

class ProductsForm extends React.Component {
  defaultValues = { 
      title: "", 
      description: "", 
      steps: "", 
      results: "", 
      assignedTo:"", 
      severity:"", 
      screenShots:"",
      dueDate: "",   
    };
  state = { ...this.defaultValues, };
 
  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props
    axios.post(`/api/projects/${id}/bugs`, {...this.state})
    .then( res => {
        this.props.add(res.data)
        this.props.setBugForm(!this.props.bugForm)
    })
    .catch(err => console.log(err))
    this.setState({ ...this.defaultValues, });
  }

  handleChange = (e) => {
    const { target: { name, value, } } = e;
    this.setState({ [name]: value, });
  }

  render() {
    const { 
        title, 
        description, 
        steps, 
        results, 
        assignedTo, 
        severity, 
        screenShots,
        dueDate, 
    } = this.state;
    return (
      <div style={styles.divform}>
        <Form onSubmit={this.handleSubmit} style={styles.formform}>
        <Icon style={styles.formbutton} name='close' onClick={() => this.props.setBugForm(!this.props.bugForm)}/>
        <Header as="h1">Add New Bug</Header>
          <Form.Group widths="equal">
            <Form.Input
              label="Bug Title"
              name="title"
              placeholder="Title"
              value={title}
              onChange={this.handleChange}
              required
            />
            <Form.TextArea
              label="Description of the Bug"
              name="description"
              placeholder="Enter Description"
              value={description}
              onChange={this.handleChange}
              required
            />
            <Form.TextArea
              label="Steps to recreate the bug"
              name="steps"
              placeholder="In simple terms what steps did you tak to produce the bug?"
              value={steps}
              onChange={this.handleChange}
              required
            />
            </Form.Group>
            <Form.Group widths="equal">
            <Form.Input
              label="Expected Results after bug is fixed"
              name="results"
              placeholder="Name"
              value={results}
              onChange={this.handleChange}
              required
            />
            <Form.Input
              label="Who is the bug assigned to in this stage?"
              name="assignedTo"
              placeholder="Enter the name of a dev/QA"
              value={assignedTo}
              onChange={this.handleChange}
              required
            />
            <Form.Input
              label="How severe is the bug?"
              name="severity"
              placeholder="not sure how you measure severity"
              value={ severity}
              onChange={this.handleChange}
              required
            />
            </Form.Group>
            <Form.Group widths="equal">
            <Form.Input
              label="When should the bug be completed?"
              name="dueDate"
              placeholder="Enter a future date"
              value={dueDate}
              onChange={this.handleChange}
              required
            />
             <Form.Input
              label="Attach any helpful screenshots of the bug"
              name="screenShots"
              placeholder="Enter the name of a dev/QA"
              value={screenShots}
              onChange={this.handleChange}
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
    width: "800px",
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