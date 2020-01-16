import React, { Component } from 'react'
import { db } from '../config/firebaseConfig'
import { withRouter } from 'react-router-dom'

class Crud extends Component {
  constructor(props){
    super(props)
  
    this.state = {
      loaded: false,
      notes: {}
    }
  }

  componentDidMount() {
    this.readNotes()
  }
  
  createNote = () => {
    const titles = ['Title 1', 'Title 2', 'Title 3', 'Title 4', 'Title 5']
    const contents = ['Red Snake', 'Blue Fish', 'Yellow Monkey', 'Green Iguana', 'Black Cat']

    db.ref('notes/').push({
      title: titles[Math.floor(Math.random() * titles.length)],
      content: contents[Math.floor(Math.random() * contents.length)]
    })
  }

  deleteNote = note => {
    db.ref(`notes/${note}`).remove()
  }

  updateNote = note => {
    const titles = ['Title 1', 'Title 2', 'Title 3', 'Title 4', 'Title 5']
    const contents = ['Red Snake', 'Blue Fish', 'Yellow Monkey', 'Green Iguana', 'Black Cat']

    db.ref(`notes/${note}`).update({
      title: titles[Math.floor(Math.random() * titles.length)],
      content: contents[Math.floor(Math.random() * contents.length)]
    })
  }

  readNotes = () => {
    db.ref('notes/').on('value', snapshot => {
      this.setState({
        notes: snapshot.val(),
        loaded: true
      })
    })
  }

  sendToNoteDetails = note => {
    const state = this.state
    this.props.history.push(`notes/${note}`, state)
  }

  renderList = () => {
    const { notes } = this.state

   return(
    notes ? 
      <div className="center">
        <button className="btn teal darken-1" id="create" onClick={this.createNote}>Create</button>
          {
            Object.keys(notes).map((noteId, key) => {
              return (
                <div key={key} className="card z-depth-0">
                  <div onClick={() => this.sendToNoteDetails(noteId)} className="card-content">
                    <span className="card-title">{ JSON.stringify(notes[noteId].title) }</span>
                    <p>{ JSON.stringify(notes[noteId].content)}</p>
                  </div>
                  <button className="btn teal darken-1" id="delete" onClick={() => this.deleteNote(noteId)}>Delete</button>
                  <button className="btn teal darken-1" id="update" onClick={() => this.updateNote(noteId)}>Update</button>
                </div>

              )
            })
          }
      </div>
    :
      <div className="center">
        <button className="btn teal darken-1" id="create" onClick={this.createNote}>Create</button>
        <h1 className="white-text">Add some notes</h1>
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

export default withRouter(Crud)
