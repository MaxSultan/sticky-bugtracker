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
  }
}

export default App;
