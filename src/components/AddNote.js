import React, {useContext, useState} from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote, getUser, userinfo } = context;
    const [note,setNote] = useState({title: "", description: "",tag: ""})
    getUser();
    const handleClick = (e)=>{
        e.preventDefault();
        //calling addNote func
        addNote(note.title, note.description, note.tag);
        //after adding set form with emplty values
        setNote({title: "", description: "",tag: ""})
        props.showAlert("Added successfully", "success")
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return <div className="container my-3">
            <p>Welcome {userinfo.name}!</p>
            <h3>Add a Note</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={note.title} name="title" aria-describedby="emailHelp" onChange={onChange}/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange={onChange}/>
                </div>
                
                <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>

  </div>;
};

export default AddNote;
