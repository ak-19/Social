import React, {Component} from 'react';

import {connect} from 'react-redux';
import {getProfile, updateProfile} from '../../actions/profile';
import Spinner from '../shared/spinner';

class MyProfile extends Component {
    state = {
        location: '',
        birthPlace: '',
        status: '',
        interests: '',
        description: '',
        error: ''
    }

    componentWillMount() {
        this.props.getProfile();
    }

    componentWillReceiveProps(props) {
        const {profile, loading} = props.componentState;
        if (!loading) {
            this.setState({...profile, error: ''});
        }
    }

    save(event) {
        event.preventDefault();
        const {location, birthPlace, status, interests, description} = this.state;
        this.props.updateProfile({location, birthPlace, status, interests, description});
    }

    change = (event) => {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value});
    }

    loadaedContent() {
        return (
            <div>
                <form onSubmit={(e) => this.save(e)}>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input type="text"
                               className="form-control"
                               id="location"
                               name="location"
                               placeholder="Enter location"
                               onChange={this.change}
                               value={this.state.location}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthPlace">Birth Place</label>
                        <input type="text"
                               className="form-control"
                               id="birthPlace"
                               name="birthPlace"
                               placeholder="Enter Birth Place"
                               onChange={this.change}
                               value={this.state.birthPlace}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <input type="text"
                               className="form-control"
                               id="status"
                               name="status"
                               placeholder="Enter status"
                               onChange={this.change}
                               value={this.state.status}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="interests">Interests</label>
                        <input type="text"
                               className="form-control"
                               name="interests"
                               placeholder="Enter interests"
                               onChange={this.change}
                               value={this.state.interests}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            rows="4"
                            cols="50"
                            className="form-control"
                            name="description"
                            placeholder="Enter description"
                            onChange={this.change}
                            value={this.state.description}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        );
    }

    render() {
        const {loading} = this.props.componentState;
        if (loading) {
            return <Spinner/>;
        }
        return this.loadaedContent();
    }
}

const mapStateToProps = (state) => ({
    auth: state.authReducer,
    componentState: state.profileReducer
})

export default connect(mapStateToProps, {getProfile, updateProfile})(MyProfile);
