import React, {useState, useEffect} from "react";
import NoteContext from "./noteContext";


const NoteState = (props) =>{
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    const [filteredNotes, setFilteredNotes] = useState(notesInitial);
    const [tags, setTags] = useState([]);
    

    useEffect(() => {
        setTags([...new Set(notes.map((note) => note.tag))]);
      }, [notes]);

   //Get all notes
      const getNotes = async ()=>{
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json',
               'auth-token': localStorage.getItem('token')
           },
       });
       const json = await response.json()
       console.log(json)
       setNotes(json);
       setFilteredNotes(json);
   }
   
    //Add a Note
    const addNote = async (title, description, tag)=>{
         // API Call
         const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        setNotes(notes.concat(note))
        
    }

    //Delete a note
    const deleteNote = async (id)=>{
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
          
        });
        const json = response.json();
        console.log(json)
        //Logic to delete a note at client side
       
        const newNotes = notes.filter((note)=>{return  note._id!==id})
        setNotes(newNotes)
    }

    //Edit a note
    const editNote = async (id, title, description, tag)=>{
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))
        //Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    //Filter notes by tag
    const filterNoteByTag = (tag) =>{
        const filtered = notes.filter((note)=>note.tag === tag);
        if(tag === 'All'){
            setFilteredNotes(notes);
        }
        else{
            setFilteredNotes(filtered);
            setTags([...new Set(notes.map((note) => note.tag))]);
        }
        //Update the tags state based on the filtered notes
        
    }

    return(
        <NoteContext.Provider value={{notes, filteredNotes, addNote, deleteNote, editNote, getNotes, filterNoteByTag, tags}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;