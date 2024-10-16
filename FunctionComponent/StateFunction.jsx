import React, {useState} from "react";
 
function StateFunctionComponent(){
    const [name, setName]=useState(" Praveen ")
    return(
        <>
        <h1>{name}</h1>
 <div>
 <button onClick={()=>setName("Welcome to credo systemz")}>Login </button> <br />
 <button onClick={()=>setName("Thanks to Visit Credo Systemz")}>Logout</button>

 </div>
        </>
    )
}
export default StateFunctionComponent