import React from 'react';
import { Image, Container, Button, Icon, Input } from 'semantic-ui-react';
import froggy from './img/froggy.png'
import { Link } from 'react-router-dom';


const Home = (props) => {
    return(
        <Container>
            <div style={styles.header}>
                <h1 style={{fontSize:'5em'}}>Home</h1>
                <Image src={froggy} style={{maxHeight:'200px'}}/>
            </div>
            <div style={styles.margin}>
                <Input size={'large'}/>
                <br/>
                <br/>
                <Button style={{backgroundColor:'#F96870'}}>Search</Button>
            </div>
            <div style={styles.btnContainer}>
                <Link to={{
                    pathname:'/projects',
                    form: true
                }}>
                    <Button style={styles.button}>
                        <h1>Add Project</h1>
                        <Icon size='big' name='add' style={{marginLeft:'.5em'}}/>
                    </Button>
                </Link>
                <Link to='/reports'>
                    <Button style={styles.button}>
                        <h1>View Reports</h1>
                        <Icon size='big' name='chart line' style={{marginLeft:'.5em'}}/>
                    </Button>
                </Link>
                <Link to={{
                    pathname:'/profile',
                    form: true
                }}>
                    <Button style={styles.button}>
                        <h1>Edit Profile</h1>
                        <Icon size='big' name='edit' style={{marginLeft:'.5em'}}/>
                    </Button>
                </Link>
            </div>
        </Container>
    )
} 

const styles = {
    header: {
        display:'flex',
        justifyContent:'space-between',
    },
    button: {
        backgroundColor:'#667582',
        height: '7em',
        width: '7em',
        fontSize:'2em',
        borderRadius:'20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
    },
    btnContainer: {
        display:'flex',
        justifyContent:'space-around',
    },
    margin:{
        marginBottom:'3em',
        marginTop: '-1em',
    }
}

export default Home