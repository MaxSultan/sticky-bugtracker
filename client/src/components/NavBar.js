import React, { useContext } from 'react';
import { Menu, Image, } from 'semantic-ui-react';
import { Link, useLocation, useHistory, } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import froggy_copy_no_letters from './img/froggy_copy_no_letters.png'


const NavBar = ({ props }) => {
    const auth = useContext(AuthContext)
    const location = useLocation()
    const history = useHistory()

    const rightNavItems = () => {
        if(auth.authenticated){
            return (
                <Menu.Menu position='right'>
                  <Link to='/profile' style={{marginTop:'auto', marginBottom:'auto'}}>
                    <Menu.Item 
                      color='yellow'
                      active={location.pathname === '/profile'} 
                      style={styles.white}
                    > 
                      {auth.user.name}
                    </Menu.Item>
                  </Link>
                  <Link>
                  <Menu.Item
                    color='yellow'
                    style={styles.white}
                    name='logout'
                    onClick={ () => auth.handleLogout(history) }
                  />
                  </Link>
                  </Menu.Menu>
              )
            } else {
              return (
                <Menu.Menu position='right'>
                  <Link to='/login'>
                    <Menu.Item
                      color='yellow'
                      style={styles.white}
                      id='login'
                      name='login'
                      active={location.pathname === '/login'}
                    />
                  </Link>
                  <Link to='/register'>
                    <Menu.Item
                      color='yellow'
                      style={styles.white}
                      id='register'
                      name='register'
                      active={location.pathname === '/register'}
                    />
                  </Link>
                </Menu.Menu>
              )
        }
    }

    const leftNavItems = () => {
      if(auth.authenticated){
        return(
          <>
            <Link to='/'>
                <Menu.Item
                color='yellow'
                style={styles.white}
                icon='home'
                id='Home'
                active={location.pathname === '/'}
                />
            </Link>
            <Link to='/projects'>
                <Menu.Item
                color='yellow'
                style={styles.white}
                icon='bug'
                active={location.pathname === '/projects'}
                />
            </Link>
            <Link to='/reports'>
                <Menu.Item
                color='yellow'
                style={styles.white}
                icon='chart line'
                active={location.pathname === '/reports'}
                />
            </Link>
            <Link to='/archives'>
                <Menu.Item
                color='yellow'
                style={styles.white}
                icon='box'
                active={location.pathname === '/archives'}
                />
            </Link>
            </>
        )}  else {return null;}
    }

    return(
      <Menu pointing secondary {...props} auth={auth} style={styles.menu}>
      <Image src={froggy_copy_no_letters} style={{maxHeight:'40px'}}/>
            {leftNavItems()}
            {rightNavItems()}
        </Menu>
    )
}

const styles = {
  menu: {
    background: 'linear-gradient(#58694e, #41553f)',
  },
  white: {
    color: 'white'
  }
}

export default NavBar;