import React from 'react';
import { Form, Header, Icon, } from "semantic-ui-react";
import axios from 'axios';

class ProductsForm extends React.Component {
  defaultValues = { 
      title: this.props.initTitle ? this.props.initTitle : "", 
      description: this.props.initDescription ? this.props.initDescription : "", 
      steps: this.props.initSteps ? this.props.initSteps : "", 
      result: this.props.initResult ? this.props.initResult : "", 
      assignedTo:this.props.initAssignedTo ? this.props.initAssignedTo : "", 
      severity:this.props.initSeverity ? this.props.initSeverity : "", 
      screenShots:this.props.initScreenShots ? this.props.initScreenShots : "",
      dueDate: this.props.initDueDate ? this.props.initDueDate : "",   
      date_assigned: this.props.init_date_assigned ? this.props.init_date_assigned : "",  
      date_work_began: this.props.init_date_work_began ? this.props.init_date_work_began : "",  
      status: this.props.initStatus ? this.props.initStatus : "",  
      current_stage: this.props.init_current_stage ? this.props.init_current_stage : "",  
  };

  resetValues = {
    title:"", 
    description:"", 
    steps:"", 
    result:"", 
    assignedTo:"", 
    severity:"", 
    screenShots:"",
    dueDate:"",
    date_assigned:"",
    date_work_began:"",
    status:"",
    current_stage:"", 
  }

  state = { ...this.defaultValues, };
 
  handleSubmit = (e) => {
    if(this.props.bug_id){
      axios.put(`/api/projects/${this.props.projectEditId}/bugs/${this.props.bug_id}`, {...this.state})
      .then(res => {
        console.log(res)
        this.props.update(res)
        this.props.setEditing(false)
      }).catch(err => console.log(err))
    }else {
      e.preventDefault();
      const { id } = this.props
      axios.post(`/api/projects/${id}/bugs`, {...this.state})
      .then( res => {
          this.props.add(res.data)
          this.props.setBugForm(!this.props.bugForm)
      })
      .catch(err => console.log(err))
    }
    this.setState({ ...this.resetValues, });
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
        result, 
        assignedTo, 
        severity, 
        screenShots,
        dueDate, 
        date_assigned,
        date_work_began,
        status,
        current_stage,
    } = this.state;
    return (
      <div style={styles.divform}>
        <Form onSubmit={this.handleSubmit} style={styles.formform}>
        <Icon style={styles.formbutton} name='close' onClick={() => this.props.bug_id ? this.props.setEditing(!this.props.editing) : this.props.setBugForm(!this.props.bugForm)}/>
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
              label="Expected Result after bug is fixed"
              name="result"
              placeholder="Name"
              value={result}
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
              value={severity}
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
              placeholder="Enter screenshots here"
              value={screenShots}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Enter the date the bug was assigned"
              name="date_assigned"
              placeholder="What day was the bug assigned?"
              value={date_assigned}
              onChange={this.handleChange}
            />
            </Form.Group>
            <Form.Group widths="equal">
            <Form.Input
              label="Enter date the work began on the bug"
              name="date_work_began"
              placeholder="What day did the dev begin work on the bug?"
              value={date_work_began}
              onChange={this.handleChange}
            />
            <Form.Input
              label="What is the bugs current status"
              name="status"
              placeholder="Enter bug status"
              value={status}
              onChange={this.handleChange}
            />
            <Form.Input
              label="What stage is the bug in?"
              name="current_stage"
              placeholder="Enter bug stage"
              value={current_stage}
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
    width: "1000px",
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