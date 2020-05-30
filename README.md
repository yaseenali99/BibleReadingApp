##About

This project was created as my introduction to React and it's interaction with APIs
As of the first commit it is a simple, single component web app for reading the bible. The app makes use of the https://scripture.api.bible/ web api 
for getting the content. 

##The next steps are to :
1. Split out the test.js components into multiple components and manage the state from the main component - DONE
2. Add feedback when a chapter is selected - DONE
3. Split the left pane into 2 columns and possibly have an OT/NT button so the side pane list is not so long
4. Add in Next and Previous chapter Buttons
5. Improve the styling of the page.


###State

The state should maintain the following:
1. A list of books of the bible - bookList
2. The currently selected Book - currBook
3. The currently selected chapter - currChap


###Components
The app will be broken up into several components.
1. The Side bar with the Books of the bible (BookPane)
    - This component should make an API call to get the list of books when the componenet loads
    - It should set the state of the bookList
    -It should set the state of the currBook by making an API call when any of the buttons are clicked
2.  Scripture Pane (ScripPaneText)
    - This component will require the currBook when the user clicks on it in the Side Bar Component
    - the currBook.name should be displayed in the card Header section
    - For the current book it should provide a list of the chapter numbers
    - When the user clicks on a chapter the currChap state property should be updated
    - The appropriate text should then be loaded from the this.props.currChap.content prop
4. the App.js Main component that will assemble the various other componenets.

