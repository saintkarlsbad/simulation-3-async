// import axios from 'axios';
// import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Header from '../Header/Header';
import './Search.css'

class Search extends Component {
    // constructor() {
    //     super()
    // }

    // componentDidMount --> load friends list to search through 

    // figure out pagination so that page numbers show
    // limit number of friends to show on page at 24
    // filter by first or last name
    // reset list to get entire list of users again
    render() {
        return (
            <div className='search_container'>
                <Header page='Search' />
                <div className='search_parent'>
                    <div className='search_child content-container'>
                        <div className='child_top'>
                            <select className='select open-sans'>
                                <option>First Name</option>
                                <option>Last Name</option>
                            </select>
                            <input className='input open-sans' />
                            <button className='search grey-btn' onClick={()=> this.state}> Search </button>
                            <button className='complete black-btn'> Complete </button>
                        </div>

                        <div className='child_bottom'>
                            <div className='friends'>
                                <img width='100px' alt='profile' />
                                <span className='friend_name open-sans-bold'>Name</span>
                                <button className='add_btn orange-btn'> Add Friend </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Search;

// User can navigate to dashboard view or search view.
// User can logout.
// User should be navigated back to the Auth View when logging out.
// User should see a list of friends / people to add as friends.
// The container for these users should limit to 24.
// Pagination should be used to navigate between pages of users.
// User can apply a filter by first or last name.
// User can reset an applied filter to get the entire list of users again



 //// pagination example ///

// console.clear();

//     class TodoApp extends React.Component {
//       constructor() {
//         super();
//         this.state = {
//           todos: ['a','b','c','d','e','f','g','h','i','j','k'],
//           currentPage: 1,
//           todosPerPage: 3
//         };
//         this.handleClick = this.handleClick.bind(this);
//       }

//       handleClick(event) {
//         this.setState({
//           currentPage: Number(event.target.id)
//         });
//       }

//       render() {
//         const { todos, currentPage, todosPerPage } = this.state;

//         // Logic for displaying current todos
//         const indexOfLastTodo = currentPage * todosPerPage;
//         const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
//         const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

//         const renderTodos = currentTodos.map((todo, index) => {
//           return <li key={index}>{todo}</li>;
//         });

//         // Logic for displaying page numbers
//         const pageNumbers = [];
//         for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
//           pageNumbers.push(i);
//         }

//         const renderPageNumbers = pageNumbers.map(number => {
//           return (
//             <li
//               key={number}
//               id={number}
//               onClick={this.handleClick}
//             >
//               {number}
//             </li>
//           );
//         });

//         return (
//           <div>
//             <ul>
//               {renderTodos}
//             </ul>
//             <ul id="page-numbers">
//               {renderPageNumbers}
//             </ul>
//           </div>
//         );
//       }
//     }


//     ReactDOM.render(
//       <TodoApp />,
//       document.getElementById('app')
//     );