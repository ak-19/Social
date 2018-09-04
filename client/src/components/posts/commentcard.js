import React, {Component} from 'react';
import {formatPostTime} from "../../util/date";

class CommentCard extends Component {
    render() {
        const {avatar, name, comment} = this.props;
        return (
            <li className="comment-card-box">
                <div className="commenterImage">
                    <img src={avatar} alt={name}/>
                </div>
                <div className="commentText">
                    <p className="">
                        {comment}
                    </p>
                    <span className="date sub-text">{formatPostTime(this.props.date)}</span>
                </div>
            </li>
        );
    }
}

export default CommentCard;