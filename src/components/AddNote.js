import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  let bool = true;

  const handleClick = (e) => {
    e.preventDefault(); //to prevent page reload
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Added Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  //   const handleOpenForm=()=>{
  //     const form = document.getElementById("addnoteContainer")
  //     if(bool === true){
  //         form.style.display = "block";
  //         bool = false;

  //     }
  //     else{
  //         form.style.display = "none"
  //         bool = true;
  //     }
  //   }

  const handleOpenForm = () => {
    const form = document.getElementById("addnoteContainer");

    if (bool === true) {
      //   form.style.display = "block";
      form.style.height = "0px";
      form.style.overflow = "hidden";

      setTimeout(() => {
        form.style.transition = "height 0.5s";
        form.style.height = "440px";
      }, 10);

      bool = false;
    } else {
      form.style.height = "0";

      setTimeout(() => {
        // form.style.display = "none";
        form.style.transition = "";
      }, 500);

      bool = true;
    }
  };

  return (
    <div className="container my-5" style={{paddingTop:"3rem"}}>
      <button
        className="btn btn-primary position-absolute top-0 start-50 translate-middle"
        onClick={handleOpenForm}
        style={{ marginTop: "13rem" }}
      >
        Add Note
      </button>
      <div className="addnoteContainer" id="addnoteContainer">
        <h1>
          <center>Add a Note</center>
        </h1>
        <hr />
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              value={note.title}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              value={note.description}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
              minLength={5}
              required
            />
          </div>
          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
          <button
            className="btn btn-primary mx-2"
            type="button"
            onClick={handleOpenForm}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
