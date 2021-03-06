import React, { Component } from 'react'
import firebase, { db } from '../config/firebaseConfig'

class Crud extends Component {
  _isMounted = false // src: https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component

  constructor(props) {
    super(props)

    this.state = {
      isLoaded: false,
      notes: {},
      image: null,
      user: null,
      progress: 0
    }
  }

  componentDidMount() {
    this._isMounted = true

    firebase.auth().onAuthStateChanged(user => {
      if (this._isMounted) {
        this.setState({
          user,
          isLoaded: true
        })
        this.readNotes()
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  createNote = () => {
    const titles = ['Title 1', 'Title 2', 'Title 3', 'Title 4', 'Title 5']
    const contents = [
      'Red Snake',
      'Blue Fish',
      'Yellow Monkey',
      'Green Iguana',
      'Black Cat'
    ]

    db.ref(`${firebase.auth().currentUser.uid}/notes/`).push({
      title: titles[Math.floor(Math.random() * titles.length)],
      content: contents[Math.floor(Math.random() * contents.length)],
      image_url: '',
      image_name: ''
    })

    this.setState({
      progress: 0
    })
  }

  deleteNote = (note, image_name) => {
    let rootRef = firebase.storage().ref()
    let imageRef = rootRef.child(
      `${firebase.auth().currentUser.uid}/images/${note}/${image_name}`
    )
    imageRef.delete()
    db.ref(`${firebase.auth().currentUser.uid}/notes/${note}`).remove()
  }

  updateNote = note => {
    const titles = ['Title 1', 'Title 2', 'Title 3', 'Title 4', 'Title 5']
    const contents = [
      'Red Snake',
      'Blue Fish',
      'Yellow Monkey',
      'Green Iguana',
      'Black Cat'
    ]

    db.ref(`${firebase.auth().currentUser.uid}/notes/${note}`).update({
      title: titles[Math.floor(Math.random() * titles.length)],
      content: contents[Math.floor(Math.random() * contents.length)]
    })
  }

  readNotes = () => {
    db.ref(`${firebase.auth().currentUser.uid}/notes/`).on(
      'value',
      snapshot => {
        this.setState({
          notes: snapshot.val()
        })
      }
    )
  }

  sendToNoteDetails = note => {
    const notes = this.state.notes
    this.props.history.push(`notes/${note}`, notes)
  }

  handleChange = e => {
    const image = e.target.files[0]
    this.setState(() => ({
      image
    }))
  }

  handleUpload = note => {
    const { image } = this.state
    let rootRef = firebase.storage().ref()
    let fileRef = rootRef.child(
      `${firebase.auth().currentUser.uid}/images/${note}/${image.name}`
    )
    const uploadTask = fileRef.put(image)

    uploadTask.on(
      'state_changed',
      snapshot => {
        const uploadProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        this.setState({
          progress: uploadProgress
        })
      },
      err => {
        console.log(err)
      },
      () => {
        fileRef.getDownloadURL().then(url => {
          db.ref(`${firebase.auth().currentUser.uid}/notes/${note}`).update({
            image_name: image.name,
            image_url: url
          })
        })
      }
    )
  }

  renderList = () => {
    const { notes } = this.state
    const user = firebase.auth().currentUser

    return notes ? (
      <div className="center">
        <h3 className="white-text">Welcome {user.email}</h3>
        <button
          className="btn teal darken-1"
          id="create"
          onClick={this.createNote}
        >
          Create
        </button>
        {Object.keys(notes).map((noteId, key) => {
          return (
            <div key={key} className="card z-depth-0">
              <div
                onClick={() => this.sendToNoteDetails(noteId)}
                className="card-content"
              >
                <span className="card-title">
                  {JSON.stringify(notes[noteId].title)}
                </span>
                <p>{JSON.stringify(notes[noteId].content)}</p>
                <img alt="" src={notes[noteId].image_url} />
              </div>
              <button
                className="btn teal darken-1"
                id="delete"
                onClick={() =>
                  this.deleteNote(noteId, notes[noteId].image_name)
                }
              >
                Delete
              </button>
              <button
                className="btn teal darken-1"
                id="update"
                onClick={() => this.updateNote(noteId)}
              >
                Update
              </button>
              {notes[noteId].image_url === '' ? (
                <div>
                  <form className="white">
                    <div className="file-field input-field white">
                      <div className="btn">
                        <span>File</span>
                        <input type="file" onChange={this.handleChange} />
                      </div>
                      <div className="file-path-wrapper white">
                        <input className="file-path validate" type="text" />
                      </div>
                      {this.state.progress !== 0 ? (
                        <div className="progress">
                          <div
                            className="determinate"
                            style={{ width: this.state.progress + '%' }}
                          />
                        </div>
                      ) : null}
                    </div>
                  </form>
                  <button
                    className="btn teal darken-1"
                    id="upload"
                    onClick={() => this.handleUpload(noteId)}
                  >
                    Upload
                  </button>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    ) : (
      <div className="center">
        <h3 className="white-text">Welcome {user.email}</h3>
        <button
          className="btn teal darken-1"
          id="create"
          onClick={this.createNote}
        >
          Create
        </button>
        <h1 className="white-text">Add some notes</h1>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        {this.state.isLoaded ? this.renderList() : null}
      </div>
    )
  }
}

export default Crud
