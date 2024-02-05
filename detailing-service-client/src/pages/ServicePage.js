import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Image, ListGroup } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { getOneService, getReviewsService, deleteReview, addReview } from '../http/ServicesApi';
import { jwtDecode } from 'jwt-decode';
import AddCommentModal from '../modals/AddCommentModal';
import OrderModal from '../modals/OrderModal';
import { makeOrder } from '../http/UserApi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ServicePage = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);

    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const isAdmin = decodedToken && decodedToken.role === 'Admin';

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleCloseOrderModal = () => setShowOrderModal(false);

    const fetchService = async () => {
        try {
            const response = await getOneService(id);
            setService(response);
            const reviewsResponse = await fetchReviews(id);
            setReviews(reviewsResponse);
        } catch (error) {
            console.error('Error fetching service details:', error);
        }
    };

    const handleAddComment = async (commentData) => {
        try {
            const newReview = await addReview({ ...commentData, service_id: id, user_id: decodedToken.user_id });
            await fetchService()
            console.log('Successfully added review:', newReview);
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    const handleOrderSubmit = (formData) => {
        const fetchVehicles = async () => {
            try {
                await makeOrder({ ...formData, service_id: id });
                toast.success('Order submitted successfully');
            } catch (error) {
                console.error("Error making order:", error);
                toast.error('Error submitting order. Please try again.');
            }
        };

        fetchVehicles();
        console.log('Order submitted:', formData);
        handleCloseOrderModal(false);
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await deleteReview(reviewId);
            await fetchService();
            console.log('Review deleted successfully');
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    useEffect(() => {
        fetchService();
    }, [id]);

    const fetchReviews = async () => {
        try {
            const response = await getReviewsService(id);
            return response;
        } catch (error) {
            console.error('Error fetching service details:', error);
        }
    };

    if (!service) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col className="text-center">
                    <h1>{service.name}</h1>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={6} className="mb-4">
                    <Image src={`${process.env.REACT_APP_API_URL}${service.image}`} alt={service.name} fluid />
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Text>{service.description}</Card.Text>
                            <Card.Text>
                                <strong>Цена:</strong> ${service.price.toFixed(2)}
                            </Card.Text>
                            <Button
                                variant="primary"
                                onClick={() => setShowOrderModal(true)}
                                className="w-100 mb-2"
                            >
                                Заказать
                            </Button>
                            <Link to="/services">
                                <Button
                                    variant="secondary"
                                    className="w-100"
                                >
                                    Назад
                                </Button>
                            </Link>
                        </Card.Body>

                    </Card>
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <Card className="w-75 mx-auto mt-4">
                        <Card.Body>
                            <Card.Title>Отзывы</Card.Title>
                            <Button variant="primary" className="mb-3" onClick={handleShowModal}>
                                Добавить отзыв
                            </Button>
                            <ListGroup variant="flush">
                                {reviews.map((review) => (
                                    <ListGroup.Item key={review.id}>
                                        <strong>{review.User.username}:</strong> {review.comment}
                                        <br />
                                        <small>Оценка: {review.rating}</small>
                                        {isAdmin && (
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="ms-2"
                                                onClick={() => handleDeleteReview(review.id)}
                                            >
                                                Удалить
                                            </Button>
                                        )}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <AddCommentModal
                show={showModal}
                handleClose={handleCloseModal}
                handleAddComment={handleAddComment}
            />


            <OrderModal show={showOrderModal} handleClose={handleCloseOrderModal} handleOrderSubmit={handleOrderSubmit} />

            <ToastContainer />
        </Container>
    );
};

export default ServicePage;