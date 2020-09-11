import React from 'react';
import { Image, Container, Button, Icon, Input } from 'semantic-ui-react';
import froggy from './img/froggy.png'
import { Link } from 'react-router-dom'
import gray_frog from './img/froggy_gray_flip.png'


const Home = (props) => {
    return(
        <Container>
            <Image src={gray_frog} style={{opacity:'0.3', position:'fixed', zIndex:'0', right:'-200px', height:'120vh'}}/>
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
                    form: true,
                    animate: true
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
                    form: true,
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
        zIndex:'2',
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
        zIndex:'3',
        boxShadow:'5px 5px 3px #101c17',
        position:'relative',
    },
    btnContainer: {
        display:'flex',
        justifyContent:'space-around',
        zIndex:'2',
    },
    margin:{
        marginBottom:'3em',
        marginTop: '-1em',
        zIndex:'2'
    }
}

export default Home