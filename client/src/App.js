import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import NoMatch from './components/NoMatch'
import Projects from './components/Projects/Projects';
import Home from './components/Home';
import ProjectView from './components/Projects/ProjectView'
import Login from './components/Login';
import Register from './components/Register';
import FetchUser from './components/FetchUser'
import ProtectedRoute from './components/ProtectedRoute';
import BugView from './components/Projects/Bug/BugView';
import Archives from './components/Archives';
import Reports from './components/Reports/Reports';


function App() {
  return (
   <div style={styles.color}>
   <NavBar/>
   <FetchUser>
   <Container>
     <Switch>
       <ProtectedRoute exact path='/' component={Home}/>
       <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
       <ProtectedRoute exact path='/projects' component={Projects}/>
       <ProtectedRoute exact path='/project/:id' component={ProjectView}/> 
       <ProtectedRoute exact path='/projects/:project_id/bugs/:id' component={BugView}/>
       <ProtectedRoute exact path='/reports' component={Reports}/>
       <ProtectedRoute exact path='/archives' component={Archives}/>       
       <Route component={NoMatch}></Route>
     </Switch>
   </Container>
   </FetchUser>
   </div>
  );
}

const styles = {
  color: {
    backgroundColor: '#E5E3EB', 
    minHeight: '100vh',
    minWidth: '100vw',
    height: 'auto',
    width:'auto',
  }
}

export default App;
