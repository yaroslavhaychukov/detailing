import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const ServiceEditModal = ({ show, handleClose, handleSave, service }) => {
    const [editedService, setEditedService] = useState(service);

    useEffect(() => {
        setEditedService(service);
    }, [service]);

    const handleInputChange = (field, value) => {
        setEditedService((prevService) => ({
            ...prevService,
            [field]: value,
        }));
    };

    const handleSaveChanges = () => {
        handleSave(editedService);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Редактировать услугу</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="editServiceName">
                        <Form.Label>Название</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedService?.name || ''}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="editServiceDescription">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={editedService?.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="editServicePrice">
                        <Form.Label>Стоимость</Form.Label>
                        <Form.Control
                            type="number"
                            value={editedService?.price || ''}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ServiceEditModal;
