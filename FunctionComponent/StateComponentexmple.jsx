import React from "react";
 
class StateClassComponent1 extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={text:""}
    }
    render()
    {
        return(
            <>
            <h1>{this.state.text}</h1>
            <button onClick={()=>this.setState({text:"Hi I am Sridhar Raj P UI Developer and Trainer Welcome to our Session"})}>Click</button>
            </>
        )
    }
}
export default StateClassComponent1