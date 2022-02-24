import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    getDate(dateTimeString) {
        let dateTime = (new Date(dateTimeString)).toDateString().split(" ");
        return `${dateTime[1]} ${dateTime[2]}, ${dateTime[3]}`;
    }

    renderComments(comments) {
        console.log("render comments");
        return comments.map(comment => {
            return (
                <div key={comment.id} className="mb-4">
                    <div className="mb-3">
                        {comment.comment}
                    </div>
                    <div className="mb-3">
                        -- {comment.author} , {this.getDate(comment.date)}
                    </div>
                </div>
            );
        });
    }

    renderDish(dish) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    render() {
        if (this.props.selectedDish != null) {
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.selectedDish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        {this.renderComments(this.props.selectedDish.comments)}
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}

export default DishDetail;