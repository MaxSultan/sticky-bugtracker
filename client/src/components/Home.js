import React from 'react';
import { Image, Container, Button, Icon, Input } from 'semantic-ui-react';
import froggy from './img/froggy.png'


const Home = (props) => {
    return(
        <Container>
            <div style={styles.header}>
                <h1 style={{fontSize:'5em'}}>Home</h1>
                <Image src={froggy} style={{maxHeight:'200px'}}/>
            </div>
            <div style={styles.margin}>
                <Input size={'massive'}/>
                <br/>
                <Button>Search</Button>
            </div>
            <div style={styles.btnContainer}>
                <Button style={styles.button}>Add Project<br/>
                    <Icon size='big' name='add'/>
                </Button>
                <Button style={styles.button}>Add Project</Button>
                <Button style={styles.button}>Edit Profile</Button>
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
        textAlign:'center',
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