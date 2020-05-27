import React, {useState, useEffect} from 'react';
import styled from 'styled-components'


class Numbers extends React.Component{

    state = {
        numArr : [1,2,3],
        note: "My Note"
    }


 addNumber = () =>{
        this.setState({numArr: [...this.state.numArr,this.state.numArr.pop() + 1]})
    }

delNumber = () =>{
    this.setState({numArr: this.state.numArr.slice(0,this.state.numArr.length-1)})
}


    

    


render(){
    return (
        <div className="container-fluid alert alert-dark">
            <h1>Numbers</h1>
            

           
            <div className="row">

                <div className = " d-flex flex-column">
                    <button className = "text-uppercase align-left btn-primary ml-2 my-3" onClick={this.addNumber}>Add</button>
                    
                    <button className =  " text-uppercase align-left btn-primary ml-2 my-3" onClick={this.delNumber} >Remove</button>
                </div>

                <div className="col-10 alert alert-primary ml-2" > 
                    <div >
                        {this.state.numArr.map(number => {
                        return <h2 key={number} className="text-left">{number} {this.state.note}</h2>
                        })}
                    </div>
                    
                </div>
            </div>
            
             
        </div>
        
 
     )//end of return
    }//end of render function
}//end of Numbers class



export default Numbers