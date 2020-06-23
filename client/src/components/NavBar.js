import React, { useContext } from 'react';
import { Menu, } from 'semantic-ui-react';
import { Link, useLocation, useHistory, } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';


const NavBar = ({ props }) => {
    const auth = useContext(AuthContext)
    const location = useLocation()
    const history = useHistory()

    const rightNavItems = () => {
        // const { auth: { user, handleLogout}, location, } = props;
    
        if(auth.authenticated){
            return (
                <Menu.Menu position='right'>
                  <Menu.Item
                    name='logout'
                    onClick={ () => auth.handleLogout(history) }
                  />
                </Menu.Menu>
              )
            } else {
              return (
                <Menu.Menu position='right'>
                  <Link to='/login'>
                    <Menu.Item
                      id='login'
                      name='login'
                      active={location.pathname === '/login'}
                    />
                  </Link>
                  <Link to='/register'>
                    <Menu.Item
                      id='register'
                      name='register'
                      active={location.pathname === '/register'}
                    />
                  </Link>
                </Menu.Menu>
              )
        }
    }

    return(
        <Menu pointing secondary {...props} auth={auth}>
            <Link to='/'>
                <Menu.Item
                name='Home'
                id='Home'
                active={location.pathname === '/'}
                />
            </Link>
            <Link to='/products'>
                <Menu.Item
                name="Products"
                active={location.pathname === '/products'}
                />
            </Link>
            {rightNavItems()}
        </Menu>
    )
}

export default NavBar;