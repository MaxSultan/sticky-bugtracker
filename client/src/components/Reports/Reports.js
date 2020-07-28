import React from 'react'
import AllBugsChart from './AllBugsChart'
import { Header } from 'semantic-ui-react'

export default function Reports() {
    return (
        <div style={{height:'100vh'}}>
            <Header as='h1' style={{fontSize:'5em'}}><strong>Reports</strong></Header>
            <AllBugsChart/>
        </div>
    )
}
