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
            <div className="btn-pane">
                <h2 className="sticky-top scrip-top">Books of the Bible</h2>
            <div id='booklist' style={{overflow:'auto', height:'100vh'}} className='btn-pane text-left alert-primary sticky-top'>
               
                
                {this.props.bookList.map( book => {return(
                    <div key={book.id} className="btn-pane ">
                        <button className="btn btn-pane  my-1"  onClick={() => this.wrapper(book)}>
                        <i className="fa fa-book mx-2"></i>
                            {book.name}</button><br/>
                    </div>
                    )}    
                )} 
            
            </div>
            </div>
        );
    }


}

export default BookList;