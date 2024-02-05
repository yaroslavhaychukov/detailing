import React, { useState } from 'react';
import { Modal, ListGroup, Col, Row, Button, Form } from 'react-bootstrap';

const AssortmentModal = ({ showModal, handleClose, assortment, isAdmin, handleDelete, handleEdit }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedPrice, setEditedPrice] = useState('');

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setEditedName(item.name);
        setEditedDescription(item.description);
        setEditedPrice(item.price)
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        handleEdit({ id: selectedItem.id, name: editedName, description: editedDescription, price: editedPrice });
        setIsEditing(false);
        setSelectedItem(null)
    };

    return (
        <Modal show={showModal} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Ассортимент</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={4}>
                        <ListGroup>
                            {assortment.map((item) => (
                                <ListGroup.Item
                                    key={item.id}
                                    onClick={() => handleItemClick(item)}
                                    active={selectedItem && selectedItem.id === item.id}
                                >
                                    {item.name}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col md={8}>
                        {selectedItem ? (
                            <div>
                                {isEditing ? (
                                    <div>
                                        <Form.Group controlId="editFormName">
                                            <Form.Label>Название:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={editedName}
                                                onChange={(e) => setEditedName(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="editFormDescription">
                                            <Form.Label>Описание:</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                value={editedDescription}
                                                onChange={(e) => setEditedDescription(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="editFormName">
                                            <Form.Label>Цена:</Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={editedPrice}
                                                onChange={(e) => setEditedPrice(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Button variant="success" onClick={handleSaveEdit} className='mt-2'>
                                            Сохранить
                                        </Button>{' '}
                                        <Button variant="secondary" onClick={() => setIsEditing(false)} className='mt-2'>
                                            Отмена
                                        </Button>
                                    </div>
                                ) : (
                                    <div>
                                        <h3>{selectedItem.name}</h3>
                                        <p>{selectedItem.description}</p>
                                        <p>${selectedItem.price}</p>
                                        {isAdmin && (
                                            <div>
                                                <Button variant="danger" onClick={() => handleDelete(selectedItem.id)}>
                                                    X Удалить
                                                </Button>{' '}
                                                <Button variant="warning" onClick={handleEditClick}>
                                                    ✏ Изменить
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p>Выберите предмет из списка, чтобы посмотреть детали</p>
                        )}
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default AssortmentModal;