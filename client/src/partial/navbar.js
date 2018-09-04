import React from 'react';
import {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/auth';

class Navbar extends Component {
    genenrateDynamicLinks() {
        const {isAuthenticated, user} = this.props.auth;
        if (isAuthenticated) {
            const {avatar, username} = user;
            return (
                <ul className="navbar-nav ml-auto">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profiles">People</Link>
                        </li>
                    </ul>
                    <li className="nav-item">
                        <Link  className="nav-link" to="/myposts">
                            My posts
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link  className="nav-link" to="/myprofile">
                            My profile
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link  className="nav-link" to="/myaccount">
                            My account
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => this.logout()}>
                            <img src={avatar}
                                 className="rounded-circle"
                                 alt={username}
                                 style={{
                                     width: '20px',
                                     height: '20px',
                                     marginRight: '5px'
                                 }}/>
                            Logout
                        </a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Sign Up</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                </ul>
            );
        }
    }

    logout() {
        this.props.logoutUser();
        this.props.history.push('/login');
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <button className="navbar-toggler" type="button"
                            data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        {this.genenrateDynamicLinks()}
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer,
        errorProvider: state.errorReducer
    }
}

export default connect(mapStateToProps, {logoutUser})(withRouter(Navbar));
