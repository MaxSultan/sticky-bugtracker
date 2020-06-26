import React from 'react';
import { Image } from 'semantic-ui-react';
import froggy from './img/froggy.png'


const Home = (props) => {
    return(
        <div>
            <h1>Home</h1>
            <Image src={froggy} style={{maxHeight:'400px'}}/>
        </div>
    )
} 

export default Home