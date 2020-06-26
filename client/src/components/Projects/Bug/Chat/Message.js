import React from 'react'
import { Comment } from 'semantic-ui-react'

export default function Message(props) {
    return (
        <Comment style={styles.bubble}>
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
        backgroundColor: 'blue',
        padding: '5px',
        borderRadius: '20px',
        margin: '10px',
        color: 'white',
        whiteSpace: 'wrap',
        maxWidth: '240px',
        textOverflow: 'elipses',
        wordWrap:'break-word'
    }
}