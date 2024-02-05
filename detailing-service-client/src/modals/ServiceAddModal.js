import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ServiceAddModal = ({ show, handleClose, handleAdd, categories }) => {
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleAddService = () => {
        const newService = {
            name: serviceName,
            description: description,
            price: parseFloat(price),
            image: selectedImage,
            category_id: selectedCategory
        };

        handleAdd(newService);

        setServiceName('');
        setDescription('');
        setPrice('');
        setSelectedImage(null);
        handleClose();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить новую услугу</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="serviceName">
                        <Form.Label>Название услуги</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите название услуги"
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Введите описание услуги"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Стоимость</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Введите стоимость услуги"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Выберите фото</Form.Label>
                        <Form.Control
                            id="custom-file"
                            type='file'
                            label="Choose file"
                            onChange={handleImageChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="category">
                        <Form.Label>Выберите категорию</Form.Label>
                        <Form.Control as="select" value={selectedCategory} onChange={handleCategoryChange}>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={handleAddService}>
                    Добавить услугу
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ServiceAddModal;
