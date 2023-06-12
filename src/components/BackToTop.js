import React, {useRef, useEffect} from "react";

function BackToTop() {
  const buttonRef = useRef(null);  

  //when user scroll down 20px from the top show the button
  useEffect(() => {
    const scrollFunction = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        buttonRef.current.style.display = "block";
      } else {
        buttonRef.current.style.display = "none";
      }
    };

    window.addEventListener("scroll", scrollFunction);

    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  //when user clicks on the button, scroll to the top of document
  const handleOnClick = () => {
    document.body.scrollTop = 0; //for safari
    document.documentElement.scrollTop = 0; //for chrome
  };
  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleOnClick}
        id="myBtn"
        className="btn btn-dark"
        style={{
          display: "none",
          transform: "rotate(-90deg)",
          marginRight: "2rem",
          marginBottom: "2rem",
          zIndex: "99",
          bottom: "20px",
          right: "30px",
          position: "fixed"
        }}
      >
        <h2>{`>`}</h2>
      </button>
    </>
  );
}

export default BackToTop;
