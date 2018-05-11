// import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';
//import { connect } from 'react-redux';
//import { getUser, user} from './../../ducks/reducer';
import './Dashboard.css';
// import 'https://robohash.org/'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: {},
            recommendedFriends: [],
            filterBy: '',
            sortValue: ''
        }
        this.addFriend = this.addFriend.bind(this);
    }

    componentDidMount() {
        
        axios.get('/auth/authenticated').then(user => {
            this.setState({userData: user.data})
        })

        axios.get('/api/recommended').then(res => {
            this.setState({
                recommendedFriends: res.data
            })
        })
    }

    addFriend(val) {
        axios.post('/api/friend/add', { val }).then(res => {
            axios.get('/api/recommended').then(res => {
                this.setState({ userData: res.data })
            })
        })
    }

    render() {
        console.log(this.state.userData, this.state.recommendedFriends)
        const {userData} = this.state
        const { sortValue } = this.state;
        // if (userData) {
        //     var userinfo = this.state.userData.filter(bots => bots[sortValue] === userData[sortValue] && bots.id !== userData.id)
        //     var userBoxes = userinfo.map((bots, i) => {
        //         return (
        //             <div key={i} className='friend_box'>
        //                 <img width="100px" src={bots.img} alt='pic' />

        //                 <div className="friend_names">
        //                     <span>{bots.first_name} </span>
        //                     <span>{bots.last_name}</span>
        //                 </div>

        //                 <button className="friend_button" onClick={() => this.addFriend(bots.id)}>add friend</button>
        //             </div>
        //         )
        //     })
        // }
        return (
            <div style={{ height: 'auto' }}>
                <Header page='Dashboard' />
                <div className='dash_parent_container'>
                    <div className='dash_child_container'>
                        <div className='dash_child_top'>
                            <div className='user_box'>
                                <span className='user_left'>
                                    {userData.auth_id ? <img src={'https://robohash.org/me'} className='user_image' alt='profile' /> : null}
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
                                    {/* <div className='dash_rec_usr_c'>
                                        <div className='rec_content content-container'>

                                            <img width='100px' src='https://robohash.org/me' alt='profile' />
                                         <span className='friend_name open-sans-bold'></span>
                                            <button className='add_btn orange-btn' onClick={() => { this.addFriend }}> Add Friend </button>

                                        </div>
                                    </div>

                                    <div className='dash_usr_empty'>
                                        <span className='open-sans'> No recommendations </span>
                                    </div> */}
                                    {/* {userBoxes} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

// function MapStateToProps(state) {
//     return {user: state.user}
// }

// export default connect(MapStateToProps, { getUser })(Dashboard);

// onClick event for 'Add Friend' button --> send info to helo_friends db --> automatically reload page w/ new friend

/// CSS ///
// .overflow-scrolling {
//     overflow-y: scroll;
//     -webkit-overflow-scrolling: touch;
// }


/// JSX ///
// import OverflowScrolling from 'react-overflow-scrolling';

// class MyComponent extends React.Component {
//     render() {
//         return (
//             <div>
//                 <OverflowScrolling className='overflow-scrolling'>
//                     ...
//                 </OverflowScrolling>
//             </div>
//         );
//     }
// }

// export default MyComponent;