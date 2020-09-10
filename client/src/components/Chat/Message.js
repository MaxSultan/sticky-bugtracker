import React from 'react'
import { Comment } from 'semantic-ui-react'

export default function Message(props) {
    return (
        <Comment style={styles.bubble} className='change'>
            <Comment.Avatar as='a' src='' />
            <Comment.Content>
            <div style={styles.apart}>
                <Comment.Author as='a'>{props.username}</Comment.Author>
                <Comment.Metadata>
                    <div>{props.postTime}</div>
                </Comment.Metadata>
            </div>
                <Comment.Text>{props.content}</Comment.Text>
            </Comment.Content>
        </Comment>
    )
}

const styles = {
    bubble: {
        padding: '1em',
        margin: '10px',
        whiteSpace: 'wrap',
        maxWidth: '100%',
        textOverflow: 'elipses',
        wordWrap:'break-word'
    },
    apart: {
        display: 'flex',
        justifyContent: 'space-between',
    }
}