import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderComments({ comments }) {
    console.log("render comments");
    return (
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            {comments.map(comment => {
                return (
                    <div key={comment.id} className="mb-4">
                        <div className="mb-3">
                            {comment.comment}
                        </div>
                        <div className="mb-3">
                            -- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(comment.date))}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

function RenderDish({ dish }) {
    if (dish != null) {
        return (<div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

const DishDetail = (props) => {
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.comments} />
            </div>
        </div>
    );
}

export default DishDetail;