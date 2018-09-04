import React, {Component} from 'react';
import Account from "../shared/account";
import { connect } from 'react-redux';
import {updateAccount} from "../../actions/auth";


class MyAccount extends Component {
    state = {
        email: this.props.auth.user.email,
        username: this.props.auth.user.username,
        password: undefined,
        password2: undefined,
        error: undefined
    }

    tryUpdate = (e) => {
        e.preventDefault();
        const {username, email, password, password2} = this.state;
        this.props.updateAccount(JSON.parse(JSON.stringify({username, email, password, password2})));
    }

    updateProp = (ev) => {
        const state = this;
        state[ev.target.name] = ev.target.value;
        state.error = undefined;
        this.setState(state);
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

    render() {
        const {error} = this.state;
        const props = {...this.state};
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <p className="lead text-center">Your account</p>
                            <form onSubmit={this.tryUpdate}>
                                <Account updateProp={this.updateProp} {...props}/>
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
        );
    }
}


const mapStateToProps = (state) => ({
    auth: state.authReducer,
    errorProvider: state.errorReducer
})

export default connect(mapStateToProps, {updateAccount})(MyAccount);
