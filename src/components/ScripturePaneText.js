import React, { Component } from 'react'

 class ScripturePaneText extends Component {

    constructor(props){
        super(props);
        let chapText = this.props.currChap.content;

        this.state ={
            scripText: ""
            
        }
        }

    //When the component is mounted get the first chapter of the selected book
    componentDidMount(){
        this.getScriptureText(this.props.currBook.id + ".1");
    } 

    //This lifecycle function checks when the props has changed for a component
    //To specify the props we are looking at we use the if condition to compare the
    //changed props to the previous props using the prevProps keyword.
    componentDidUpdate(prevProps){
        if (this.props.currBook !== prevProps.currBook){
            //console.log("Component Updated")
            if (this.props.currChap.id === undefined){
            this.getScriptureText(this.props.currBook.id + ".1")
            }
            else{
                this.getScriptureText(this.props.currChap.id)
            }
        }
    }

    //API Call to get the chapter the user clicked on. It is stored in the local
    //state as well as lifted back up to the currChap state of the main page component
    getScriptureText(chapId){
        
        fetch(`${this.props.baseURL}bibles/${this.props.bibleId}/chapters/${chapId}?content-type=text`, {
            method: 'GET',
            headers: {"api-key": this.props.apiKey},
            //mode: 'no-cors'
            
            })
            .then(response => response.json())
            .then(result => {this.setState({scripText: result.data.content})
                             this.setCurrChap(result.data)     
            })
            .catch(error => console.log('GetScripText error', error.code));

    }

    //method to call the main page method to set the state of the currChap
    setCurrChap(chap){
        this.props.setCurrChap(chap);

    }

    render() {
        return (
            <div style={{overflow:'auto', height:'100vh'}}>
                 {/* Scripture Pane */}
                <div id='scripture-pane' className="card">
                    <div className="card-header scrip-top">

                        <h1 >{this.props.currBook.name }</h1>

                        <div>
                        <div class="dropdown">
                            <button class="btn btn-book dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Chapter {this.props.currChap.number}
                            </button>
                            <div class="dropdown-menu btn-book" aria-labelledby="dropdownMenuButton">


                                {(this.props.currBook.chapters!== undefined) ? this.props.currBook.chapters.map(chap => {return(
                                        <button className = "m-0 btn-white " key={chap.id} onClick={() =>this.getScriptureText(chap.id)}>{chap.number}</button>                    
                                    ) }) : "Blank"
                                }                                
                            </div>
                        </div>
                        </div>
                    </div>
                   

                    <div className=" scrip-pane text-justify card-body" >
                        
                        {/* <div>
                            <h3>Chapter {this.props.currChap.number}</h3>
                        </div> */}
                        
                        {(this.props.currChap.content === undefined) ? "Please Select a Ca" : this.props.currChap.content}
                    </div>
        
                </div>
            </div>
        )
    }
}

export default ScripturePaneText
