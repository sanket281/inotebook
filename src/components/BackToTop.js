import React from "react";

function BackToTop() {
  let mybutton = document.getElementById("myBtn");
  //when user scroll down 20px from the top show the button
  window.onscroll = function () {
    scrollFunction();
  };
  const scrollFunction = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  };
  //when user clicks on the button, scroll to the top of document
  const handleOnClick = () => {
    document.body.scrollTop = 0; //for safari
    document.documentElement.scrollTop = 0; //for chrome
  };
  return (
    <>
      <button
        onClick={handleOnClick}
        id="myBtn"
        className="btn btn-dark"
        style={{
          transform: "rotate(-90deg)",
          marginRight: "2rem",
          marginBottom: "2rem",
          display: "none",
          zIndex: "99",
          position: "fixed",
          bottom: "20px",
          right: "30px"
        }}
      >
        <h2>{`>`}</h2>
      </button>
    </>
  );
}

export default BackToTop;
