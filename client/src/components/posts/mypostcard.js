import React, {Component} from 'react';
import {formatPostTime} from "../../util/date";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {deletePost} from "../../actions/posts";


class MyPostCard extends Component {
    deletePost() {
        this.props.deletePost(this.props._id);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div>
                        <img src={this.props.avatar}
                             className="rounded-circle"
                             alt={this.props.username}
                             style={{
                                 width: '15px',
                                 height: '15px',
                                 marginRight: '5px'
                             }}/>
                        <small>{formatPostTime(this.props.date)}</small>
                    </div>
                    <div>{this.props.text}</div>
                    <div>
                        <Link to={`/comments/${this.props._id}`}
                              className="btn btn-link">comments <span>{this.props.comments.length}</span></Link>
                        <button type="button" className="btn btn-link" onClick={(e) => this.deletePost()}>delete
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {deletePost})(MyPostCard);