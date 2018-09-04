import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/auth';

class Login extends React.Component {
  state = {
    username: undefined,
    password: undefined,
    error: undefined
  }
  componentDidMount(){
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/wall');
    }
  }
  componentWillReceiveProps(nextProps){
    const {errorProvider} = nextProps;
    if (errorProvider) {
      this.updateError(errorProvider.error);
    }
  }
  submitLogin = (e) => {
    e.preventDefault();
    const {username, password} = this.state;
    this.props.loginUser(username, password, this.props.history);
  }
  updateError = (error) => {
    const state = this;
    state.error = error;
    this.setState(state);
  }
  updateProp = (ev) => {
    const {state} = this;
    state.error = undefined;
    state[ev.target.name] = ev.target.value;
    this.setState(state);
  }
  render () {
    const {error} = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your account</p>
              <form onSubmit={this.submitLogin}>
                <div className="form-group">
                  <input type="text"
                         className="form-control form-control-lg"
                         placeholder="username"
                         name="username"
                         text={this.state.username}
                         onChange={this.updateProp}
                         />
                </div>
                <div className="form-group">
                  <input type="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        text={this.state.password}
                        onChange={this.updateProp}
                        name="password" />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
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

export default connect(mapStateToProps, {loginUser})(withRouter(Login));
