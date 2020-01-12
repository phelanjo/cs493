import React, { Component } from 'react'
import firebase, { db } from '../config/firebaseConfig'

class Crud extends Component {
  constructor(props){
    super(props)
  
    this.state = {
      loaded: false,
      notes: {}
    }
  }

  componentDidMount() {
    this.readNote()
  }
  
  createNote = () => {
    const titles = ['Title 1', 'Title 2', 'Title 3']
    const contents = ['Red Snake', 'Blue Fish', 'Yellow Monkey', 'Green Iguana', 'Black Cat']

    db.ref('notes/').push({
      title: titles[Math.floor(Math.random() * titles.length)],
      content: contents[Math.floor(Math.random() * contents.length)]
    })
  }

  deleteNote = note => {
    db.ref('notes/').remove()
  }

  readNote = () => {
    db.ref('notes/').on('value', snapshot => {
      this.setState({
        notes: snapshot.val(),
        loaded: true
      })
    })
  }

  renderList = () => {
    const { notes } = this.state
    return (
      <div className="center">
        <button className="btn teal darken-1" id="create" onClick={this.createNote}>Create</button>
          {
            Object.keys(notes).map((note, key) => {
              return (
                <div key={key} className="card z-depth-0">
                  <div className="card-content">
                    <span className="card-title">{ JSON.stringify(notes[note].title) }</span>
                    <p>{ JSON.stringify(notes[note].content)}</p>
                    <button className="btn teal darken-1" id="delete" onClick={() => this.deleteNote(key)}>Delete</button>
                    <button className="btn teal darken-1" id="update">Update</button>
                  </div>
                </div>
              )
            })
          }
      </div>
    )
  }

  render() {
    return (
      <div className="container">
          {
            this.state.loaded ? this.renderList() : null
          }
      </div>
    )
  }
}

export default Crud