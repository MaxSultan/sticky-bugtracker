import React from 'react'

 const ArchiveDescription = () => (
        <div style={styles.description}>
            <h1><strong>Archives</strong></h1>
            <p>The Archives handle bugs or projects that fit into the following categories:</p>
                <ul>
                    <li>Bugs in current stage: fixed and status: complete</li>
                    <li>Projects with and inactive status</li>
                </ul>
            <br/>
            <p>Archived projects and bugs can be sent back to the regular projects/ project page by changing their status/current stage</p>
            <br/>
            <p>The Archives are meant to be a storing place for completed bugs, so if the issue or a similar one occurs again the previous information can be referenced easily.</p>
        </div>
    )

    const styles = {
        description: {
            padding: '2em',
            borderRadius: '30px',
            backgroundColor: 'white',
            maxWidth: '40vw',
            zIndex: 5,
            position: 'fixed',
            left: '325px',
            top: '100px',
            boxShadow: '3px 3px 3px #101c17'
        }
    }
    export default ArchiveDescription