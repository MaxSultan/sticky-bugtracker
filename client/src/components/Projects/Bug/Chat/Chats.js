import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import Axios from 'axios'

export default function Chats() {
    const [messages, setMessages]= useState([])

    const getMessages = (project_id, bug_id) => {
        Axios.get()
    }
    return (
        <div>
            chats
            <Form>
                {}
                <Form.Input></Form.Input>
            </Form>
        </div>
    )
}
