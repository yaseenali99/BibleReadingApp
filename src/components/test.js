import React from 'react';
import '../scripture.css';

class Test extends React.Component{

    apiKey = "77f3e92538ef5641b7346865022584be"; //from https://scripture.api.bible/admin
    asvBibleID = '06125adad2d5898a-01'; //Bible ID for ASV version
    baseURL = 'https://api.scripture.api.bible/v1/';
    
    bibleID = this.asvBibleID; //Assign the appropriate BibleID to be used.

    //Our state store the responses from the API call
    state = {
        books : [], //A list of the books of the bible.
        bookChapters: [],
        selChapText: "",
        currChap: "GEN.1"
        
    }


    //Get the list of books when the Component Mounts to populate the side panel
    componentDidMount(){
        
        //Get List of Books in the Bible to populate side pane
        this.getBooks();
        //console.log("Inside did Mount: ",this.state.books);
        this.getBookChapters("GEN");
        this.getScriptureText("GEN.1")
        //this.getScriptureText("GEN.1");
        //console.log("Test.js Component Mounted");
    }

    //This method does a fetch of all the bible books
    getBooks = () => {

        fetch(`${this.baseURL}bibles/${this.bibleID}/books`, {
        method: 'GET',
        headers: {"api-key": this.apiKey}
        
        })
        .then(response => response.json())
        .then(result => this.setState({books: result.data}))
        //.then(res =>console.log(res))
        .catch(error => console.log('Get Books error', error.code));
    }//end of getBooks method

    
   //Gets the chapters for the book clicked
    getBookChapters(bookID){
        fetch(`${this.baseURL}bibles/${this.asvBibleID}/books/${bookID}/chapters`, {
            method: 'GET',
            headers: {"api-key": this.apiKey}
            
            })
            .then(response => response.json())
            .then(result => {
                this.setState({bookChapters: result, currChap:result.data[0]})
                console.log("book chapters - ", this.state.bookChapters)
            })
            
            .catch(error => console.log('getBookchaps error', error.code));
        }//end of getBookChapters 
    
    changeBook = book =>{
        this.getBookChapters(book.id);
        this.getScriptureText(book.id + ".1");
        console.log("BookID :",book.id + ".1");
    
    } 
    

    getScriptureText = chapId =>{
        console.log("This chapter was clicked: ", chapId);
        this.setState({currChap: chapId});
        //this.setState({currChap: this.state.bookChapters[2].id});
        
        fetch(`${this.baseURL}bibles/${this.asvBibleID}/chapters/${chapId}?content-type=text`, {
            method: 'GET',
            headers: {"api-key": this.apiKey},
            //mode: 'no-cors'
            
            })
            .then(response => response.json())
            .then(result => {this.setState({selChapText: result.data.content})
            console.log("Selected Book Text", this.state.selChapText)
            })
            //.then(res =>console.log(res))
            .catch(error => console.log('GetScripText error', error.code));
    }
    render() {
        return(

        <div className = "container-fluid">
         <div id="page-title" className="jumbotron">
            <h1>Bible App</h1>
         </div>
            
        
            {/* <div >
                <button onClick={this.getBooks} className = "btn-primary my-5 btn-sm block">Show Books of the Bible</button>
            </div> */}
            <div className='row'>

                {/* Side pane with List of books */}
                <div id='booklist' className='col-2 text-left alert-dark'>
                    {/* {console.log("In render: ",this.state.books)} */}
                    {/* {this.getBookChapters("EXO")} */}
                    <h3>Books of the Bible</h3>
                    {this.state.books.map( book => {return(
                        <div key={book.id}>
                            <button className="btn btn-block" onClick={() => this.changeBook(book)} >{book.name}</button><br/>
                        </div>
                        )}    
                    )} 
                    {/* {console.log("BookChapters in Render",this.state.bookChapters)} */}
                </div>
                
                {/* Scripture Pane */}
                <div id='scripture-pane' className='col-10 card '>
                    <div className="card-header">
                        <h1>{(this.state.bookChapters.data === undefined) ? "nothing selected" : this.state.bookChapters.data[0].reference}</h1>
                    </div>    
                    
                    
                        
                            <div key="chap.id" >
                                {(this.state.bookChapters.data===undefined) ? <p>"blank"</p> : this.state.bookChapters.data.map(chap => {return(
                                        <button  onClick={() => this.getScriptureText(chap.id)}>{chap.number}</button>
                                    
                                    
                                    ) }
                                ) }
                                 
                            </div>

                        <div className="eb-container text-justify card-body">
                        {/* <p className="test card-text  text-justify"> */}
                            {(this.state.selChapText === undefined) ? "nothing selected" : this.state.selChapText.replace(/class=/g,"className=")}
                        </div>
                        

                
                </div>
            </div>
        </div>                           
        )//end of return
    }//end of render

}//end of Test class

export default Test;