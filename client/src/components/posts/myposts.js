import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMyPosts, makePost} from "../../actions/posts";
import MyPostCard from "./mypostcard";
import Spinner from "../shared/spinner";
import {clearError} from "../../actions/error";

class MyPosts extends Component {
    state = {
        newPost: undefined,
        error: ''
    }

    componentWillReceiveProps(props){
        const {error} = props.errorProvider;
        if (error){
            this.setState({error});
        }
    }

    changeProp(e) {
        const newPost = e.target.value;
        this.props.clearError();
        this.setState({newPost});
    }

    makePost(e) {
        e.preventDefault();
        this.setState({newPost: '', error: ''});
        this.props.makePost({text: this.state.newPost});
    }

    componentDidMount() {
        this.props.getMyPosts();
    }

    renderPosts() {
        return this.props.data.posts.map(post => {
            return <MyPostCard key={post._id} {...post}/>
        });
    }

    render() {
        const {loading} = this.props.data;
        const {error} = this.state;
        if (loading) {
            return <Spinner/>;
        }
        return (
            <div>
                <form onSubmit={(e) => this.makePost(e)} className="my-posts-section">
                    <div className="form-group">
                        <label>New post</label>
                        <textarea
                            rows="4"
                            cols="50"
                            className="form-control"
                            id="newPost"
                            onChange={(e) => this.changeProp(e)}
                            value={this.state.newPost}
                            placeholder="Write something"/>
                            {
                                error ?
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div> : null
                            }
                    </div>
                    <button type="submit"
                            className="btn btn-primary">
                        Make Post
                    </button>
                </form>
                <div className="my-posts-section">
                    <h4>My previous posts</h4>
                </div>
                <div className="my-posts-section">
                    {this.renderPosts()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state.myPostsReducer,
    errorProvider: state.errorReducer
});

export default connect(mapStateToProps, {getMyPosts, makePost, clearError})(MyPosts);