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


function App() {
  return (
   <>
   <NavBar/>
   <FetchUser>
   <Container>
     <Switch>
       <Route exact path='/' component={Home}></Route>
       <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
       <Route exact path='/products' component={Products}></Route>
       <Route exact path='/products/:id' component={ProductView}></Route>       
       <Route component={NoMatch}></Route>
     </Switch>
   </Container>
   </FetchUser>
   </>
  );
}

export default App;
