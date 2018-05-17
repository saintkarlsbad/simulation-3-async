// import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';
import './Dashboard.css';

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: {},
            recommendedFriends: [],
            sortValue: ''
        }
        this.addFriend = this.addFriend.bind(this);
    }


    // getting user authentication(req.user) from server and recommended from db
    componentDidMount() {

        axios.get('/auth/authenticated').then(user => {
            this.setState({ userData: user.data })
        })

        axios.get('/api/recommended').then(res => {
            this.setState({
                recommendedFriends: res.data
            })
        }).catch(response => {
            console.log('cant get ya authorized boi')
        })
    }

    // adding friend/assigning a friendId (set up in controller file) then returning recommended friends (all users that aren't friends or current user)
    addFriend(friendId) {
        axios.post('/api/friend/add', { friendId }).then(res => {
            axios.get('/api/recommended').then(res => {
                this.setState({ recommendedFriends: res.data })
            })
        })
    }

    render() {
        
        const { userData, sortValue, recommendedFriends } = this.state
        // assign sort option from recommended list to users data to see if there is a mutual sort option 
        const recommendedFiltered = recommendedFriends.filter(el => {
            if (sortValue === 'first') {
                return el.first === userData.first
            }
            if (sortValue === 'last') {
                return el.last === userData.last
            }
            if (sortValue === "hobby") {
                return el.hobby === userData.hobby
            }
            if (sortValue === 'gender') {
                return el.gender === userData.gender
            }
            if (sortValue === 'h_color') {
                return el.hair_color === userData.hair_color
            }
            if (sortValue === 'e_color') {
                return el.eye_color === userData.eye_color
            }
            if (sortValue === 'birthday') {
                return (el.birth_day === userData.birth_day && el.birth_month === userData.birth_month && el.birth_year === userData.birth_year)
            }
            if (sortValue === '') {
                return userData;
            }
        })


        // taking filtered from above and reassigning so that you can add a friend to the logged in user's id (will assign a friend_id)
        const listedBots = recommendedFiltered.map((user, i) => {
            //console.log(user)
            return (

                <div key={i} className='rec_content content-container'>
                    <div className='rec_left'>
                        <img width='100px' src={user.img} alt='profile' />
                    </div>
                    <div className='friend_name open-sans-bold'>
                        <h3>{user.first}</h3>
                        <h3>{user.last}</h3>
                    </div>
                    <button className='add_btn orange-btn' onClick={() => this.addFriend(user.id)}> Add Friend </button>
                </div>
            )
        })

        // based on user's auth_id, will assign name and pic to go with it
        return (
            <div style={{ height: 'auto' }}>
                <Header page='Dashboard' />
                <div className='dash_parent_container'>
                    <div className='dash_child_container'>
                        <div className='dash_child_top'>
                            <div className='user_box'>
                                <span className='user_left'>
                                    {userData.auth_id ? <img src={this.state.userData.img} className='user_image' alt='profile' /> : null}
                                </span>
                                <span className='user_right'>
                                    {userData.auth_id ? <span className='usr_first open-sans-bold'> {userData.first} </span> : null}
                                    {userData.auth_id ? <span className='usr_last open-sans-bold'> {userData.last} </span> : null}
                                    <Link to='/Profile'><button className='edit_button grey-btn open-sans'>Edit Profile</button></Link>
                                </span>
                            </div>
                            <div className='dash_board content-container'>
                                <span className='open-sans'>Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!</span>
                            </div>
                        </div>
                        <div className='dash_recommend_parent'>
                            <div className='dash_recommend_child content-container'>
                                <div className='dash_recommend_header'>
                                    <span className='recommend_span_h open-sans'>Recommended Friends</span>
                                    <span className='recommend_span_s open-sans'>Sorted by</span>
                                    <select className='dash_select open-sans' onChange={(e) => this.setState({ sortValue: e.target.value })}>
                                        <option value={''}>------------</option>
                                        <option value='first'> First Name </option>
                                        <option value='last'> Last Name </option>
                                        <option value='gender'> Gender </option>
                                        <option value='hobby'> Hobby </option>
                                        <option value='h_color'> Hair Color </option>
                                        <option value='e_color'> Eye Color </option>
                                        <option value='birthday'> Birthday </option>
                                    </select>
                                </div>

                                <div className='dash_rec_usr_p'>
                                    <div className='dash_rec_usr_c'>
                                        {listedBots}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}



