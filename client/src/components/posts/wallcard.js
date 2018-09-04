import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formatPostTime} from '../../util/date';
import {hatePost} from "../../actions/posts";
import {Link} from "react-router-dom";


class WallCard extends Component {
    hateThis(e){
        this.props.hatePost(this.props._id);
    }
    render() {
        return (
            <div className="row posts-row">
                <div className="col-md-12">
                    <div>
                        <img src={this.props.avatar}
                             className="rounded-circle"
                             alt={this.props.name}
                             style={{
                                 width: '15px',
                                 height: '15px',
                                 marginRight: '5px'
                             }}/>
                        <b>{this.props.name} - <small>{formatPostTime(this.props.date)}</small></b>
                    </div>
                    <div>{this.props.text}</div>
                    <div>
                        <button type="button" className="btn btn-link"
                                data-toggle="tooltip"
                                data-placement="top"
                                onClick={(e) => this.hateThis(e)}
                                title="Hate this">
                            <i className="far fa-thumbs-down"></i> <span>{this.props.hates.length}</span></button>
                        <Link to={`/comments/${this.props._id}`} className="btn btn-link">comments <span>{this.props.comments.length}</span></Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {hatePost})(WallCard);
