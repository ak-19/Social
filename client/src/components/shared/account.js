import React from 'react';

const Account = (props) => {
    return (
        <div className="register">
            <div className="form-group">
                <input type="text"
                       className="form-control form-control-lg"
                       placeholder="Username"
                       name="username"
                       required
                       value={props.username}
                       onChange={props.updateProp}
                />
            </div>
            <div className="form-group">
                <input type="email"
                       className="form-control form-control-lg"
                       placeholder="Email Address"
                       value={props.email}
                       onChange={props.updateProp}
                       name="email"/>
                <small className="form-text text-muted">This site uses Gravatar so if you want a profile image,
                    use a Gravatar email
                </small>
            </div>
            <div className="form-group">
                <input type="password"
                       className="form-control form-control-lg"
                       placeholder="Password"
                       value={props.password}
                       onChange={props.updateProp}
                       name="password"/>
            </div>
            <div className="form-group">
                <input type="password"
                       value={props.password2}
                       onChange={props.updateProp}
                       className="form-control form-control-lg" placeholder="Confirm Password"
                       name="password2"/>
            </div>
        </div>
    )
}

export default Account;
