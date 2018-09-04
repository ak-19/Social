import React from 'react';
import {Link} from 'react-router-dom';

const Profilelistitem = (props) => {
    const {user, description, isCurrentUser} = props;
    const {username, avatar} = user;

    const url = isCurrentUser ? '/myaccount'  :  `/profile/${username}`;

    return (
        <Link to={url}>
            <div className="list-group-item">
                <img src={avatar}
                     className="rounded-circle"
                     alt={username}
                     style={{
                         width: '20px',
                         height: '20px',
                         marginRight: '5px'
                     }}/>
                {isCurrentUser ? 'Me' : username} - {description}
            </div>
        </Link>
    );
}

export default Profilelistitem;