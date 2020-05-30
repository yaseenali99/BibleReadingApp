import React from 'react';
import BookList from './BookPane';
import ScripturePaneText from './ScripturePaneText';


class Page extends React.Component{

    apiKey = "b7ad282d9d52b53e2c10f845b3339a7c"; //from https://scripture.api.bible/admin
        asvBibleID = '06125adad2d5898a-01'; //Bible ID for ASV version
      baseURL = 'https://api.scripture.api.bible/v1/';  
        bibleID = this.asvBibleID; //Assign the appropriate BibleID to be used.


    constructor(props){
        super(props)

        

        this.state = {
            bookList: [],
            currBook: [],
            currChap : []
        }
    }

    componentDidMount(){
        this.getBooks();
    }
//This method does a fetch of all the bible books
    getBooks = () => {

        fetch(`${this.baseURL}bibles/${this.bibleID}/books?include-chapters=true`, {
        method: 'GET',
        headers: {"api-key": this.apiKey}
        
        })
        .then(response => response.json())
        .then(result => {this.setState({bookList: result.data,
                                        currBook: result.data[0]                
                         })
                        console.log(this.state.bookList);
                        })
        //.then(res =>console.log(res))
        .catch(error => console.log('Get Books error', error.code));
    }//end of getBooks method



    bookClicked = book => {
        this.setState({currBook: book});
    }
    
    setCurrChap = chap => {
        this.setState({currChap: chap});
    }


render(){
    return(
    <div>
        <div className='row'>   
            <div className='col-4'>
                <BookList apiKey={this.apiKey} bookClicked={this.bookClicked} setCurrChap={this.setCurrChap} bookList={this.state.bookList} baseURL = {this.baseURL} bibleId = {this.bibleID}/>
            </div> 
            <div className='col-8'>
                <ScripturePaneText currBook = {this.state.currBook} currChap = {this.state.currChap} setCurrChap={this.setCurrChap} apiKey={this.apiKey} baseURL = {this.baseURL} bibleId = {this.bibleID} />
            </div> 
        </div>
    </div>
    
    )}

}

export default Page;