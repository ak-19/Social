import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/auth';
import Account from '../shared/account';

class Register extends React.Component {
    state = {
        email: undefined,
        username: undefined,
        password: undefined,
        password2: undefined,
        error: undefined
    }
    updateProp = (ev) => {
        const state = this;
        state[ev.target.name] = ev.target.value;
        state.error = undefined;
        this.setState(state);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/wall');
        }
    }

    componentWillReceiveProps(nextProps) {
        const {errorProvider} = nextProps;
        if (errorProvider) {
            this.updateError(errorProvider.error);
        }
    }

    updateError = (error) => {
        const state = this;
        state.error = error;
        this.setState(state);
    }
    tryRegister = (e) => {
        e.preventDefault();
        const {username, email, password, password2} = this.state;
        this.props.registerUser({username, email, password, password2}, this.props.history);
    }

    render() {
        const {error} = this.state;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your account</p>
                            <form onSubmit={this.tryRegister}>
                                <Account updateProp={this.updateProp} {...this.state}/>
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                            {
                                error ?
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.authReducer,
    errorProvider: state.errorReducer
});


export default connect(mapStateToProps, {registerUser})(withRouter(Register));
