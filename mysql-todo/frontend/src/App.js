import React, { Component } from 'react'
import './App.css'
import axios from 'axios';
import Display from './Display'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      res: [],
      edit: true,
      name: undefined,
      result: [],
    }
  }


  getid = async (e) => {
    e.preventDefault();
    const id = parseInt(e.target.elements.id.value)
    const name = e.target.elements.name.value
    console.log('getid', id, name)
    axios.post('http://localhost:9001/login', {
      "id": id,
      "name": name
    });
    console.log('res', this.state.res)
    this.setState({
      id: id,
      edit: !this.state.edit,
      name: name
    })

    const reponse = await axios.get(`http://localhost:9001/data?id=${id}`)
    console.log(reponse.data.result)
    this.setState({
      res: reponse.data.result,
    })
  }

  addid = async (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    console.log('in', msg)

    axios.post('http://localhost:9001/users', {
      "id": this.state.id,
      "message": msg
    });
    const reponse = await axios.get(`http://localhost:9001/data?id=${this.state.id}`)
    console.log(reponse.data.result)
    this.setState({
      res: reponse.data.result,
      text: ''
    })
  }

  render() {
    var view = {};
    var hide = {};

    if (this.state.edit) {
      view.display = 'none';
    }

    if (!this.state.edit) {
      hide.display = 'none'
    }

    return (
      <div>
        <div style={hide}>
          <h2>Login</h2>
          <form onSubmit={this.getid}>
            <input type="number" className='id' required placeholder='enter id' name='id' /> <br />
            <input type="text" required placeholder='enter the name' name='name' /> <br />
            <button >Submit</button>
          </form>
        </div>
        <div style={view}>
          {this.state.name ? <h3> Welcome {this.state.name}</h3> : null}

          {console.log('resss', this.state.res)}
          <Display data={this.state.res} />
          <div >
          </div>
          <div>
            <form onSubmit={this.addid}>
              <input type="text" required placeholder='enter the task' name='msg' />
              <button >Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

