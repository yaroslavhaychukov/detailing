import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddCommentModal = ({ show, handleClose, handleAddComment }) => {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');

    const handleAddCommentClick = () => {
        handleAddComment({ rating, comment });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить комментарий</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="rating">
                        <Form.Label>Оценка</Form.Label>
                        <Form.Select
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                        >
                            {[1, 2, 3, 4, 5].map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="comment">
                        <Form.Label>Текст комментария</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={handleAddCommentClick}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddCommentModal;
