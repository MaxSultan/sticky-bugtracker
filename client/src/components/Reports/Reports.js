import React from 'react'
import AllBugsChart from './AllBugsChart'
import { Header } from 'semantic-ui-react'
import BugsByDateChart from './BugsByDateChart'

export default function Reports() {
    return (
        <div style={{minHeight:'100vh'}}>
            <Header as='h1' style={{fontSize:'5em'}}><strong>Reports</strong></Header>
            <div>
                <Header as='h3'>Total Bugs by Project</Header>
                <AllBugsChart/>
                <Header as='h3'>Bugs by Project and Days Worked on</Header>
                <BugsByDateChart/>
            </div>
        </div>
    )
}
