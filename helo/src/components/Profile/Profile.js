import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import './Profile.css';

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: {},
            userInfo: [],
            firstName: '',
            lastName: '',
            profileGender: '',
            hairColor: '',
            eyeColor: '',
            profileHobby: '',
            bDate: '',
            bMonth: '',
            bYear: ''
        }
        this.updateProfile = this.updateProfile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    // assigning userData based on authentication of user or not
    // getting one user and assigning profile info to each element from database
    componentDidMount() {

        axios.get('/auth/authenticated').then(user => {
            this.setState({ userData: user.data })
        })

        // assigning state to res.data
        axios.get('/api/getUser').then(res => {
            this.setState({
                firstName: res.data[0].first,
                lastName: res.data[0].last,
                profileGender: res.data[0].gender,
                hairColor: res.data[0].hair_color,
                eyeColor: res.data[0].eye_color,
                profileHobby: res.data[0].hobby,
                bDate: res.data[0].birth_date,
                bMonth: res.data[0].birth_month,
                bYear: res.data[0].birth_year 
            })
        }).catch(() => { this.props.history.push('/') })
    }

    updateProfile() {
        const { firstName, lastName, profileGender, hairColor, eyeColor, profileHobby, bDate, bMonth, bYear } = this.state;
        console.log(this.state)
        axios.put('/api/profile/update', {
            firstName,
            lastName,
            profileGender,
            hairColor,
            eyeColor,
            profileHobby,
            bDate,
            bMonth,
            bYear

        }).then(res => {
            this.setState({

                userInfo: res.data[0],
                firstName: res.data.first || '',
                lastName: res.data.last || '',
                profileGender: res.data.gender || '',
                hairColor: res.data.hair_color || '',
                eyeColor: res.data.eye_color || '',
                profileHobby: res.data.hobby || '',
                bDate: res.data.birth_date || '',
                bMonth: res.data.birth_month || '',
                bYear: res.data.birth_year || ''
            })
            this.props.history.push('/Dashboard')
        })
    }

    // handleChange val, val2 setup in controller
    handleChange(val, val2) {
        this.setState({ [val2]: val })
    }
    cancel() {
        const { userData } = this.state;
        const { first, last, gender, hair_color, eye_color, hobby, birth_date, birth_month, birth_year } = userData;

        this.setState({

            firstName: first || '',
            lastName: last || '',
            profileGender: gender || '',
            hairColor: hair_color || '',
            eyeColor: eye_color || '',
            profileHobby: hobby || '',
            bDate: birth_date || '',
            bMonth: birth_month || '',
            bYear: birth_year || ''
        })
        this.props.history.push('/Dashboard')
    }

    render() {
        console.log(this.state.userData, 'profile info')
        return (
            <div style={{ minHeight: '100vh' }}>
                <Header page='Profile' />
                <div className='profile_parent'>
                    <div className='profile_child'>
                        <div className='profile_usr_top content-container'>
                            <img src={this.state.userData.img} className='profile_img' alt='profile_pic' />
                            <div className='usernamebox open-sans-bold'>
                                {this.state.userData.auth_id
                                    ?
                                    <span className='name'> {this.state.userData.first}
                                        {this.state.userData.last} </span>
                                    :
                                    null}
                            </div>
                            <div className='usr_btns'>
                                <button className='profile_btn black-btn' onClick={() => { this.updateProfile() }} >Update</button>
                                <button className='profile_btn grey-btn' onClick={() => { this.cancel() }}>Cancel</button>
                            </div>
                        </div>

                        <div className='profile_bottom content-container'>
                            <div className='profile_bottom_child'>
                                <span className='name_span open-sans' > First Name </span>
                                <input value={this.state.firstName} className='input' onChange={(e) => this.handleChange(e.target.value, 'firstName')} />
                                <span className='name_span open-sans' > Last Name </span>
                                <input value={this.state.lastName} className='input' onChange={(e) => this.handleChange(e.target.value, 'lastName')} />

                                <span className='open-sans'> Gender </span>
                                <select value={this.state.profileGender} className='select' onChange={(e) => this.handleChange(e.target.value, 'profileGender')}>
                                    <option disabled=''> -- Select -- </option>
                                    <option> Male </option>
                                    <option> Female </option>
                                    <option> Agender </option>
                                </select>
                                <span className='open-sans'> Hair Color </span>
                                <select value={this.state.hairColor} className='select' onChange={(e) => this.handleChange(e.target.value, 'hairColor')}>
                                    <option disabled=''> -- Select -- </option>
                                    <option> Green </option>
                                    <option> Pink </option>
                                    <option> Purple </option>
                                    <option> Blue </option>
                                    <option> Orange </option>
                                </select>
                                <br />
                                <span className='open-sans'> Eye Color </span>
                                <select value={this.state.eyeColor} className='select' onChange={(e) => this.handleChange(e.target.value, 'eyeColor')}>
                                    <option disabled=''> -- Select -- </option>
                                    <option> Blue </option>
                                    <option> Green </option>
                                    <option> Silver </option>
                                </select >
                                <span className='open-sans' > Hobby </span>
                                <select value={this.state.profileHobby} className='select' onChange={(e) => this.handleChange(e.target.value, 'profileHobby')}>
                                    <option disabled=''> -- Select -- </option>
                                    <option> Computing </option>
                                    <option> Debugging </option>
                                    <option> Rewiring </option>
                                    <option> Hacking </option>
                                </select>
                                <br />
                                <span className='open-sans'> Birth Date </span>
                                <select value={this.state.bDate} className='select' onChange={(e) => this.handleChange(e.target.value, 'bDate')}>
                                    <option disabled=''> -- Select -- </option>
                                    <option> 01 </option>
                                    <option> 02 </option>
                                    <option> 03 </option>
                                    <option> 04 </option>
                                    <option> 05 </option>
                                    <option> 06 </option>
                                    <option> 07 </option>
                                    <option> 08 </option>
                                    <option> 09 </option>
                                    <option> 10 </option>
                                    <option> 11 </option>
                                    <option> 12 </option>
                                    <option> 13 </option>
                                    <option> 14 </option>
                                    <option> 15 </option>
                                    <option> 16 </option>
                                    <option> 17 </option>
                                    <option> 18 </option>
                                    <option> 19 </option>
                                    <option> 20 </option>
                                    <option> 21 </option>
                                    <option> 22 </option>
                                    <option> 23 </option>
                                    <option> 24 </option>
                                    <option> 25 </option>
                                    <option> 26 </option>
                                    <option> 27 </option>
                                    <option> 28 </option>
                                    <option> 29 </option>
                                    <option> 30 </option>
                                    <option> 31 </option>
                                </select>
                                <span className='open-sans'> Birth Month </span>
                                <select value={this.state.bMonth} className='select' onChange={(e) => this.handleChange(e.target.value, 'bMonth')}>
                                    <option disabled=''> -- Select -- </option>
                                    <option> January </option>
                                    <option> February </option>
                                    <option> March </option>
                                    <option> April </option>
                                    <option> May </option>
                                    <option> June </option>
                                    <option> July </option>
                                    <option> August </option>
                                    <option> September </option>
                                    <option> October </option>
                                    <option> November </option>
                                    <option> December </option>
                                </select>
                                <span className='open-sans'> Birth Year </span>
                                <select value={this.state.bYear} className='select' onChange={(e) => this.handleChange(e.target.value, 'bYear')}>
                                    <option disabled=''> -- Select -- </option>
                                    <option> 2000 </option>
                                    <option> 1999 </option>
                                    <option> 1998 </option>
                                    <option> 1997 </option>
                                    <option> 1996 </option>
                                    <option> 1995 </option>
                                    <option> 1994 </option>
                                    <option> 1993 </option>
                                    <option> 1992 </option>
                                    <option> 1991 </option>
                                    <option> 1990 </option>
                                    <option> 1989 </option>
                                    <option> 1988 </option>
                                    <option> 1987 </option>
                                    <option> 1986 </option>
                                    <option> 1985 </option>
                                    <option> 1984 </option>
                                    <option> 1983 </option>
                                    <option> 1982 </option>
                                    <option> 1981 </option>
                                    <option> 1980 </option>
                                    <option> 1979 </option>
                                    <option> 1978 </option>
                                    <option> 1977 </option>
                                    <option> 1976 </option>
                                    <option> 1975 </option>
                                    <option> 1974 </option>
                                    <option> 1973 </option>
                                    <option> 1972 </option>
                                    <option> 1971 </option>
                                    <option> 1970 </option>
                                    <option> 1969 </option>
                                    <option> 1968 </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
