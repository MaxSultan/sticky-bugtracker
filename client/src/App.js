import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import NoMatch from './components/NoMatch'
import Products from './components/Products';
import Home from './components/Home';
import ProductView from './components/ProductView'
import Login from './components/Login';
import Register from './components/Register';
import FetchUser from './components/FetchUser'
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
   <>
   <NavBar/>
   <FetchUser>
   <Container>
     <Switch>
       <ProtectedRoute exact path='/' component={Home}/>
       <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
       <ProtectedRoute exact path='/products' component={Products}/>
       <ProtectedRoute exact path='/products/:id' component={ProductView}/>     
       <Route component={NoMatch}></Route>
     </Switch>
   </Container>
   </FetchUser>
   </>
  );
}

export default App;
