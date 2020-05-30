import React from 'react';

class BookList extends React.Component{

    constructor(props){
        super(props);
        this.bookClicked = this.bookClicked.bind(this);
    }

    bookClicked(book){
       this.props.bookClicked(book); //Call 

    }

    setCurrChap(book){
        this.props.setCurrChap(book.chapters[0].id); //Call 
 
     }
        
     wrapper(book){
        this.bookClicked(book);
        this.setCurrChap(book);
     }
        render(){
        return(
            
            <div id='booklist' style={{overflow:'auto', height:'100%'}} className='text-left alert-dark'>
               
                <h3>Books of the Bible</h3>
                {this.props.bookList.map( book => {return(
                    <div key={book.id}>
                        <button className="btn btn-block"  onClick={() => this.wrapper(book)}>{book.name}</button><br/>
                    </div>
                    )}    
                )} 
            
            </div>
        );
    }


}

export default BookList;