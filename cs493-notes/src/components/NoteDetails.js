import React, { Component } from 'react';

class NoteDetails extends Component {

  goBack = () => {
    this.props.history.push('/crud')
  }

  renderNote = () => {
    const notes = this.props.location.state.notes
    const pathId = this.props.location.pathname.split("/").pop()

    return (
      <div className="center">
        {
          Object.keys(notes).map((noteId, key) => {
            return (
              noteId === pathId ?
                <div key={key} className="card z-depth-0">
                  <div className="card-content">
                    <span className="card-title">{ JSON.stringify(notes[noteId].title) }</span>
                    <p>{ JSON.stringify(notes[noteId].content)}</p>
                    <button className="btn teal darken-1" id="delete" onClick={() => this.goBack()}>Back</button>
                  </div>
                </div>
              :
                null
            )
          })
        }
      </div>
    )
  }

  render() { 
    return (
      <div className="container">
        { this.renderNote() }
      </div>
    );
  }
}
 
export default NoteDetails;