import React from "react";
import Notes from "./Notes";
import BackToTop from "./BackToTop";
import Tag from "./Tag";


const Home = (props) => {
  const {showAlert} = props;
  return (
    <div>
      <h1><center>Gedu's Pad</center></h1>
      {/* <Notes showAlert={showAlert}/> */}
      <Tag showAlert={showAlert}/>
      <BackToTop/>
     </div>
  );
};

export default Home;
