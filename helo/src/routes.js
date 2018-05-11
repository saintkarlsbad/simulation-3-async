import {Switch, Route} from 'react-router-dom';
import React from 'react';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Search from './components/Search/Search';

export default (
    <Switch>
    <Route component = {Auth} path = '/' exact/>
    <Route component = {Dashboard} path = '/Dashboard'/>
    <Route component = {Profile} path = '/Profile'/>
    <Route component = {Search} path = '/Search'/>    
</Switch>
)
