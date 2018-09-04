import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/posts';
import WallCard from "./wallcard";
import Spinner from "../shared/spinner";

class Wall extends Component {
    componentDidMount() {
        this.props.getPosts();
    }

    renderPosts(){
        return this.props.data.posts.map(post => {
            return <WallCard key={post._id} {...post}/>
        });
    }

    render() {
        if (this.props.data.loading){
            return <Spinner/>;
        }
        return (
            <div className="container">
                <h3 className="wall-caption">Wall of shame (posts)</h3>
                {this.renderPosts()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state.postsReducer
});

export default connect(mapStateToProps, {getPosts})(Wall);