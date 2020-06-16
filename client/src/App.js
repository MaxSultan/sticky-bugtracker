import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import NoMatch from './components/NoMatch'
import Products from './components/Products';
import Home from './components/Home';


function App() {
  return (
   <>
   <NavBar/>
   <Container>
     <Switch>
       <Route exact path='/' component={Home}></Route>
       <Route exact path='/products' component={Products}></Route>
       <Route component={NoMatch}></Route>
     </Switch>
   </Container>
   </>
  );
}

export default App;
