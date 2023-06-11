import React from "react";
import Notes from "./Notes";


const Home = (props) => {
  const {showAlert} = props;
  return (
    <div>
      <h1><center>Gedu's Pad</center></h1>
      <Notes showAlert={showAlert}/>
    </div>
  );
};

export default Home;
