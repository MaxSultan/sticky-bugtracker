import React from 'react';
import { Form, Header, Icon, Label, } from "semantic-ui-react";
import axios from 'axios';
import DatePicker from 'react-date-picker'
import Axios from 'axios';
import Dropzone from 'react-dropzone'

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

  handleSelectChange = (e, {name, value}) => {
    this.setState({ [name]: value, })
  }

  handleDueDateTimeChange = (e) => {
    this.setState({dueDate: e})
  }
  handleDateAssignedTimeChange = (e) => {
    this.setState({date_assigned: e})
  }
  handleDateWorkBeganTimeChange = (e) => {
    this.setState({date_work_began: e})
  }
  onDrop = (e) => {
    console.log(e)
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

    const severity_options = [
      {key: 'm', value:'mild', text: 'mild'},
      {key: 'med', value:'medium', text: 'medium'},
      {key: 's', value:'severe', text: 'severe'},
      {key: 'im', value:'imediate attention', text: 'imediate attention'},
    ]

    const status_options = [
      {key: 'b', value:'backlog', text: 'backlog'},
      {key: 'd', value:'on deck', text: 'on deck'},
      {key: 'i', value:'in progress', text: 'in progress'},
      {key: 'p', value:'paused', text: 'paused'},
      {key: 'c', value:'complete', text: 'complete'},
    ]

    const stage_options = [
      {key: 'n', value:'new bug', text: 'new bug'},
      {key: 'r', value:'rejected', text: 'rejected'},
      {key: 'v', value:'verified', text: 'verified'},
      {key: 'bf', value:'being fixed', text: 'being fixed'},
      {key: 'rft', value:'ready for testing', text: 'ready for testing'},
      {key: 't', value:'testing', text: 'testing'},
      {key: 'f', value:'fixed', text: 'fixed'},
    ]

    return (
      <div style={styles.divform}>
        <Form onSubmit={this.handleSubmit} style={styles.formform}>
        <Icon style={styles.formbutton} name='close' onClick={() => this.props.bug_id ? this.props.setEditing(!this.props.editing) : this.props.setBugForm(!this.props.bugForm)}/>
        <Header as="h1">Add New Bug</Header>
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
            <Form.Input
              label="Expected Result after bug is fixed"
              name="result"
              placeholder="Describe result"
              value={result}
              onChange={this.handleChange}
              required
            />
            <Form.Select
              label="How severe is the bug?"
              name="severity"
              placeholder='Enter severity'
              options={severity_options}
              value={severity}
              onChange={this.handleSelectChange}
              required
            />
            <Form.Select
              label="What is the bugs current status"
              name="status"
              options={status_options}
              placeholder="Enter bug status"
              value={status}
              onChange={this.handleSelectChange}
            />
            <Form.Select
              label="What stage is the bug in?"
              name="current_stage"
              options={stage_options}
              placeholder="Enter bug stage"
              value={current_stage}
              onChange={this.handleSelectChange}
            />
             <Form.Input
              label="Attach any helpful screenshots of the bug"
              name="screenShots"
              placeholder="Enter screenshots here"
              value={screenShots}
              onChange={this.handleChange}
            />
            <Dropzone
                onDrop={this.onDrop}
                multiple={false}
              >
                {({ getRootProps, getInputProps, isDragActive }) => {
                  return (
                    <div
                      {...getRootProps()}
                      style={styles.dropzone}
                    >
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
            <Form.Input
              label="Who is the bug assigned to in this stage?"
              name="assignedTo"

              placeholder="Enter the name of a dev/QA"
              value={assignedTo}
              onChange={this.handleChange}
              required
            />
            <Label for='date_assigned'>What day was the bug assigned?</Label>
            <DatePicker
             label="What day was the bug assigned?"
             name="date_assigned"
             placeholder="Enter date bug was assigned"
             value={date_assigned}
             onChange={this.handleDateAssignedTimeChange}
            />
            <div style={{height:'22px'}}></div>
            <Label for='date_work_began'>Enter date the work began on the bug</Label>
            <DatePicker
             label="Enter date the work began on the bug"
             name="date_work_began"
             placeholder="What day did the dev begin work on the bug?"
             value={date_work_began}
             onChange={this.handleDateWorkBeganTimeChange}
            />
            <div style={{height:'22px'}}></div>
            <Label for='dueDate'>When should the bug be completed?</Label>
            <DatePicker
             label="When should the bug be completed?"
             name="dueDate"
             placeholder="Enter a future date"
             value={dueDate}
             onChange={this.handleDueDateTimeChange}
             required
            />
            <div style={{height:'22px'}}></div>
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
    width: "700px",
    padding: '20px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    overflowY: 'scroll',
    position:'relative',
    top: '300px',

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
  }
}

export default ProductsForm;