import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Provider} from 'react-redux';
import jwtDecode from 'jwt-decode';

import setAuthToken from '../util/setauthtoken';
import {setCurrentUser} from '../actions/auth';
import Layout from '../hoc/layout';
import Home from './home';
import Register from './auth/register';
import Login from './auth/login';
import MyProfile from './profiles/myprofile'
import MyAccount from './profiles/myaccount';
import PrivateRoute from './shared/privateroute';
import Profiles from './profiles/profiles';
import Profile from './profiles/profile';
import Wall from './posts/wall';
import MyPosts from './posts/myposts';
import Comments from "./posts/comments";
import store from '../store';



if (localStorage.token) {
    const user = jwtDecode(localStorage.token);
    const currentTime = Date.now() / 1000;
    if (user.exp < currentTime) {
        setAuthToken(false);
        store.dispatch(setCurrentUser({}));
    } else {
        setAuthToken(localStorage.token);
        store.dispatch(setCurrentUser(user));
    }
}

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Layout>
                        <Route exact path='/' component={Home}/>
                        <div className="container">
                            <Route exact path='/register' component={Register}/>
                            <Route exact path='/login' component={Login}/>
                            <Switch>
                                <PrivateRoute exact path='/comments/:postId' component={Comments}/>
                                <PrivateRoute exact path='/wall' component={Wall}/>
                                <PrivateRoute exact path='/myposts' component={MyPosts}/>
                                <PrivateRoute exact path='/profile/:username' component={Profile}/>
                                <PrivateRoute exact path='/profiles' component={Profiles}/>
                                <PrivateRoute exact path="/myprofile" component={MyProfile}/>
                                <PrivateRoute exact path="/myaccount" component={MyAccount}/>
                            </Switch>
                        </div>
                    </Layout>
                </Router>
            </Provider>
        )
    }
}

export default App;
