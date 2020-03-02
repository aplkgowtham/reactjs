import { connect } from "react-redux";
import * as ApiService from '../APIService'
import React from 'react'


let AddMessage = (props) => {
    let input;
    console.log(props, 'inaddmsg')
    const handleMessage = async (e) => {
        e.preventDefault();
        let values = [props.id, input.value, props.dispatch]
        input.value = ""
        await ApiService.apiPostMessage(values)
    }
    return (
        <div>
            <form>
                <input ref={node => (input = node)} placeholder="Enter the message" required />
                <button onClick={handleMessage}>
                    Add Todo</button>
            </form>
        </div>
    )
}

AddMessage = connect()(AddMessage)
export default AddMessage
