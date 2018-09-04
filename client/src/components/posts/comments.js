import React, {Component} from 'react';
import {connect} from "react-redux";
import {getSinglePost, makeComment} from "../../actions/posts";
import Spinner from "../shared/spinner";
import CommentCard from "./commentcard";
import {Link} from "react-router-dom";

class Comments extends Component {
    state = {
        newComment: undefined,
        error: undefined
    }

    componentWillMount() {
        const {postId} = this.props.match.params;
        if (postId) {
            this.props.getSinglePost(postId);
        }
    }

    postComment(e) {
        e.preventDefault();
        const {postId} = this.props.match.params;
        const {newComment} = this.state;
        this.setState({newComment: ''});
        this.props.makeComment(postId, {comment: newComment});
    }

    changeProp(e) {
        const {state} = this;
        state['newComment'] = e.target.value;
        this.setState(state);
    }

    renderComments() {
        const {post} = this.props.appState;
        if (!post) {
            return null;
        }
        const {comments} = this.props.appState.post;
        if (comments) {
            return comments.map(comment => {
                return <CommentCard key={comment._id} {...comment} />
            });
        }

        return null;
    }

    render() {
        if (this.props.appState.loading) {
            return <Spinner/>;
        }

        return (
            <div className="postCommentsScreen">
                <Link to="/wall">Back to posts</Link>
                <div className="postBox">
                    <p className="taskDescription">
                        {this.props.appState.post ? this.props.appState.post.text : null}
                    </p>
                </div>
                <div className="actionBox">
                    <ul className="commentList">
                        {this.renderComments()}
                    </ul>
                    <div className="status-upload">
                        <form onSubmit={(e) => this.postComment(e)} className="form-inline">
                                <textarea placeholder="Your comment"
                                          value={this.state.newComment}
                                          onChange={(e) => this.changeProp(e)}/>
                            <button type="submit" className="btn btn-success green"><i className="fa fa-share"></i>Add
                                comment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    appState: state.postReducer
});

export default connect(mapStateToProps, {getSinglePost, makeComment})(Comments);
