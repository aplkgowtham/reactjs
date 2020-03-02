import axios from 'axios';

export const apiPostMessage = async (props) => {
    try {
        const msg = props[1]
        const id = props[0]
        const dispatch = props[2]
        const response = await axios.post('http://localhost:9001/samples', {
            "id": id,
            "user_id": id,
            "message": msg
        });
        dispatch({ type: 'ADD_TODO', data: response.data.result })
        return response.data.result;
    }
    catch (err) {
        console.log(err)
    }
}

export const apiPostUser = async (props) => {
    try {
        let name = props[1]
        let id = props[0]
        let dispatch = props[2]
        console.log(name, id);
        let response = await axios.post('http://localhost:9001/users', {
            "id": id,
            "name": name
        });
        const res = await axios.get(`http://localhost:9001/userid?id=${id}`)
        console.log('res', res.data.result[0].name)
        if (name === res.data.result[0].name) {
            dispatch({ type: 'ADD_TODO', data: response.data.result })
            return response.data.result;
        }
        else {
            alert('Invalid User')
        }

    }
    catch (err) {
        console.log(err)
    }
}

export const isCompleted = async (props) => {
    try {
        let isCompleted = props[1]
        let id = props[0]
        let user_id = props[2]
        let dispatch = props[3]
        let response = await axios.post('http://localhost:9001/isCompleted', {
            "id": id,
            "isCompleted": isCompleted,
            "user_id": user_id
        })
        dispatch({ type: 'ADD_TODO', data: response.data.result })
        console.log('isCompleted', response)

    }
    catch (error) {
        alert(error)
    }
}


export const messageChange = async (props) => {
    try {
        let id = props[0]
        let user_id = props[1]
        let message = props[2]
        let dispatch = props[3]
        let response = await axios.post('http://localhost:9001/messageChange', {
            "id": id,
            "message": message,
            "user_id": user_id
        })
        dispatch({ type: 'ADD_TODO', data: response.data.result })
        console.log('messageChange', response)
    }
    catch (error) {
        alert(error)
    }
}

export const deleteMessage = async (props) => {
    let id = props[0]
    let user_id = props[1]
    let dispatch = props[2]
    try {
        let response = await axios.delete(`http://localhost:9001/deleteMessage?id=${id}&user_id=${user_id}`)
        dispatch({ type: 'ADD_TODO', data: response.data.result })
        console.log('messageDeleted', response)
    }
    catch (error) {
        alert(error)
    }

}
