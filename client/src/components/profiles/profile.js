import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Profile extends Component {
    showAvatar(user) {
        if (user) {
            return (
                <img className="card-img-top" src={user.avatar} alt={user.username}/>
            )
        }
        return null;
    }

    render() {
        const {username} = this.props.match.params;
        const {profiles} = this.props.profilesReducer;

        if (profiles) {
            const profile = profiles.find(p => p.user.username === username);
            return (
                <div>
                    <Link to="/profiles">Back to profiles</Link>
                    <div className="card">
                        <div className="card-body">
                            {this.showAvatar(profile.user)}
                            <h4 className="card-title"
                                style={{marginTop: 18}}>{username}{profile.location ? `, ${profile.location}` : null}</h4>
                            <h4 className="card-title" style={{marginTop: 18}}><b>Status:</b> {profile.status} </h4>
                            <p className="card-title" style={{marginTop: 18}}><b>Interested in:</b> {profile.interests}
                            </p>
                            <p className="card-title" style={{marginTop: 18}}><b>Born in:</b> {profile.birthPlace} </p>
                            <p className="card-text"><b>Describe self as:</b> {profile.description}</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to="/profiles">Back to profiles</Link>
                    <p>
                        Profile not found
                    </p>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    profilesReducer: state.profilesReducer
});

export default connect(mapStateToProps, {})(Profile);