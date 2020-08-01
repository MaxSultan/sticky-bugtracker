import React from 'react'
import { Comment } from 'semantic-ui-react'

export default function Message(props) {
    return (
        <Comment style={styles.bubble} className='change'>
            <Comment.Avatar as='a' src='' />
            <Comment.Content>
            <Comment.Author as='a'>{props.username}</Comment.Author>
                <Comment.Metadata>
                    <span>{props.postTime}</span>
                </Comment.Metadata>
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
    }
}