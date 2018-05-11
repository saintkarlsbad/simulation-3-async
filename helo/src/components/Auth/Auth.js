// import axios from 'axios';
import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Auth.css'

class Auth extends Component {
    render() {
        return (
            <div className='auth_parent pink-to-green-gradient'>
                <div className='auth_child orange-to-yellow-gradient'>
                    <div className='auth_logo_container'>
                        <img className='logo_img' src={logo} alt='logo' />
                        <span className='logo_text open-sans-bold'>Helo</span>
                    </div>
                    <div className='auth_container'>
                        <div className='auth_div open-sans black-bgc'>
                            <a href='http://localhost:3030/auth/login' className='auth_link open-sans' >Login / Register</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Auth;

