import axios from 'axios';
// import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Header from '../Header/Header';
import './Search.css'

class Search extends Component {
    constructor() {
        super()

        this.state = {
            currentPage: 1,
            usersPerPage: 10,
            friendMates: true,
            search: '',
            inputValue: '',
            searchOption: '',
            searchResults: 'blank',
            loggedInUser: '',
            allFriendsList: [],
            userData: [],
            allProfiles: []
        }
        this.handlePageClick = this.handlePageClick.bind(this);
        this.reset = this.reset.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.selectedOption = this.selectedOption.bind(this);
        this.handleSearchButton = this.handleSearchButton.bind(this);
        this.addFriend = this.addFriend.bind(this);
    }

    // getting auth user, 1 logged in user and friend matches
    componentWillMount() {
        axios.get('/auth/authenticated').then(user => {
            this.setState({
               userData: user.data
            })
        }).catch( response => {
            console.log('cannot load search')
        })

        axios.get('/api/getUser').then(res => {
            this.setState({
                friendMates: res.data[0].id
            })
        })

        // all friends where user_id = $1(current user)
        axios.get('/api/friend/list').then(res => {
            let friendList = res.data
            this.setState({
                allFriendsList: friendList
            })
        })

        // every profile excluding current user
        axios.get('/api/profile/list').then(res => {
            let profileList = res.data
            this.setState({
                allProfiles: profileList
            })
        })

    }

    handlePageClick(e) {
        this.setState({
            currentPage: Number(e.target.id)
        })
    }

    reset() {
        this.setState({
            searchResults: 'blank',
            inputValue: ''
        })
    }

    // search results based on what is entered to input box
    handleInput(nameSearch) {
        let results = nameSearch.toUpperCase();
        this.setState({
            inputValue: results
        })
    }

    selectedOption(firstOrLast) {
        this.setState({
            search: firstOrLast.target.value
        })
    }


    handleSearchButton(searchOption) {
        let results = searchOption.toUpperCase()
        this.setState({
            searchResults: results
        })
    }

    // addFriend(friendId) {

    //     axios.post('/api/friend/add', friendId).then(response => {
    //     }

    //     ).catch(response => {
    //         console.log('no friend 4 u')
    //     })
    // }

    addFriend(friendId) {
        axios.post('/api/friend/add', { friendId }).then(res => {
            axios.get('/api/profile/list').then(res => {
                this.setState({ allProfiles: res.data })})
        }).catch( response => {
            console.log('no friend 4 u')
        })
    }

    removeFriend(friendId) {

        axios.post('/api/friend/remove', {friendId}).then(res => {
            axios.get('/api/profile/list').then(res => {
               this.setState({allProfiles: res.data}) 
            })
        }).catch(response => {
            console.log('friends forever sorry')
        })
    }

    render() {
        let { allProfiles, currentPage, usersPerPage } = this.state;

        let indexOfLastUser = currentPage * usersPerPage;
        let indexOfFirstUser = indexOfLastUser - usersPerPage;
        let profiles = allProfiles.slice(indexOfFirstUser, indexOfLastUser);
        let alltheFriends = this.state.allFriendsList

        let friendsMap = alltheFriends.map((friends, index) => {
            if (this.state.searchResults === 'blank') {
                console.log(friends)
                return (
                    <div key={index} className='profile_content'>
                        <div >
                            <span>{friends.first}</span>
                            <span>{friends.last}</span>
                        </div>
                        {this.state.friendMates === friends.friend_id ?
                            <button onClick={() => { this.removeFriend(friends.id) }} className='remove_btn black-btn'>Remove Friend</button> :
                            <button onClick={() => { this.addFriend(friends.id) }} className='add_btn orange-btn'>Add Friend</button>
                        }
                    </div>
                )
            }
        })

        let profilesMap = profiles.map((users, index) => {
            //console.log(users)
            if (this.state.searchResults === 'blank') {
                return (
                    <div key={index} className='profile_content content-container'>
                        <div className='list_left'> 
                        <img src={`${users.img}`} width='100px' alt='profile' />
                        </div>

                        <div className='profile_name'>
                            {users.first}
                            <br />
                            {users.last}
                        </div>
                        {this.state.friendMates === users.user_id ?
                            <button onClick={() => { this.removeFriend(users.id) }} className='add_btn black-btn'>Remove Friend</button> :
                            <button onClick={() => { this.addFriend(users.id) }} className='add_btn orange-btn'>Add Friend</button>
                        }
                    </div>
                )
            }

            if (users.first.toUpperCase() === this.state.searchResults && this.state.search === 'first') {
                return (
                    <div key={index} className='profile_content content-container'>
                        <img src={`${users.img}`} width='100px' alt='profile' />
                        <div classNames='profile_name'>
                            {users.first}
                            <br />
                            {users.last}
                        </div>
                        {this.state.friendMates === users.user_id ?
                            <button onClick={() => { this.removeFriend(users.id) }} className='add_btn black-btn'>Remove Friend</button> :
                            <button onClick={() => { this.addFriend(users.id) }} className='add_btn orange-btn'>Add Friend</button>
                        }
                    </div>
                )
            }


            if (users.last.toUpperCase() === this.state.searchResults && this.state.search === 'last') {
                return (
                    <div key={index} className='profile_content content-container'>
                        <img src={`${users.img}`} width='100px' alt='profile' />
                        <div classNames='names'>
                            {users.first}
                            <br />
                            {users.last}
                        </div>
                        {this.state.friendMates === users.friend_id ?
                            <button onClick={() => { this.removeFriend(users.id) }} className='add_btn orange-btn'>Remove Friend</button> :
                            <button onClick={() => { this.addFriend(users.id) }} className='add_btn orange-btn'>Add Friend</button>
                        }
                    </div>
                )
            }
        })

        let pageNumbers = [];

        for (let i = 1; i <= Math.ceil(allProfiles.length / usersPerPage); i++) {
            pageNumbers.push(i)
        }

        const showPages = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handlePageClick}
                >
                    {number}
                </li>
            )
        })

        return (
            
            <div className='search_container'>
                <Header page='Search' />
                <div className='search_parent'>
                    <div className='search_child content-container'>
                        <div className='child_top'>
                            <select onChange={this.selectedOption} className='select open-sans'>
                                <option value={''}>------------</option>
                                <option value='first'>First Name</option>
                                <option value='last'>Last Name</option>
                            </select>
                            <input onChange={(e) => { this.handleInput(e.target.value) }} className='input open-sans' />
                            <button className='search grey-btn' onClick={() => this.handleSearchButton(this.state.inputValue)}> Search </button>
                            <button onClick={() => {this.reset()}} className='complete black-btn'> Reset </button>
                        </div>

                        <div className='child_bottom'>
                            {profilesMap} 
                        </div>
                        <div>{showPages}</div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Search;

// {friendsMap}
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