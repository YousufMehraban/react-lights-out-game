import React from "react";
import Board from "./Board";


function App() {
  return (
    <>
    < Board />
    < Board ncols={6} nrows={6} chanceLightStartsOn={0.35}/>
    
    </>
  );
}

export default App;


