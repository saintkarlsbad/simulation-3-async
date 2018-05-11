
 // function object from redux store that creates ‘store’;
 import { createStore, compose } from 'redux';
 import reducer from './reducer';

 const enhancers = compose(
     window.devToolsExtension ? window.devToolsExtension() : f => f
 );
 
 export default createStore(reducer, enhancers, undefined);