import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProfiles} from '../../actions/profile';
import Spinner from "../shared/spinner";
import Profilelistitem from '../shared/profilelistitem';


class Profiles extends Component {
    componentDidMount(){
        this.props.getProfiles();
    }

    loadaedContent(profiles, error){
        return (
            <div>
                {this.generateProfileCards(profiles)}
                {error ? <div>{error}</div> : null}
            </div>
        );
    }

    generateProfileCards(profiles){
        const {user} = this.props.auth;
        const {username} =  user;
        return profiles.map(profile => {
            const isCurrentUser =  profile.user.username ===  username;
            return <Profilelistitem key={profile._id}
                                    {...profile}
                                    isCurrentUser={isCurrentUser}/>
        });
    }

    render() {
        const {loading, profiles} = this.props.componentState;
        const {error} = this.props.errorProvider;

        if (loading) {
            return <Spinner/>;
        }
        return this.loadaedContent(profiles, error);
    }
}

const mapStateToProps = (state) => ({
    auth: state.authReducer,
    componentState: state.profilesReducer,
    errorProvider: state.errorReducer
});

export default connect(mapStateToProps, {getProfiles})(Profiles);