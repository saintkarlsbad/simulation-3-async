import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import search_icon from '../../assets/search.png';
import home_icon from '../../assets/home.png';

export default function Header ({page}) {
        return (
            <div className='header_parent_container orange-gradient'>
                <div className='header_child_container'>
                    <div className='header_child_left'>
                        <span className='header_title open-sans-bold'>Helo</span>
                        <Link to='/Dashboard' style={{ textDecoration: 'none' }}><img className='home_img' src={home_icon} alt='home button'/></Link>
                        <Link to='/Search' style={{ textDecoration: 'none' }}><img className='search_img' src={search_icon} alt='search button'/></Link>
                    </div>
                    <div className='header_child_middle'>
                        <span className='header_page open-sans'> {page} </span>
                    </div>
                    <div className='header_child_right'>
                        <a href='http://localhost:3030/auth/logout'><button className='header_logout open-sans' >Logout</button></a>
                    </div>
                </div>
            </div>
        )
}

    
// onClick={() => this.logout(history)}
  



