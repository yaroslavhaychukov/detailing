import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Modal, Form, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { createCategory, getAllServiceCategories, deleteCategory } from '../http/utilsApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPage = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setCategoryName('');
    };

    const handleAddCategory = async () => {
        try {
            await createCategory({ name: categoryName });

            toast.success('Категория успешно создана', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            handleCloseModal();
        } catch (error) {
            console.error('Error creating category:', error.message);

            toast.error('Ошибка при создании категории', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await getAllServiceCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleDeleteClick = async () => {
        if (selectedCategory) {
            try {
                await deleteCategory(selectedCategory.id);
                console.log('Category deleted successfully:', selectedCategory);

                const updatedCategories = categories.filter(category => category.id !== selectedCategory.id);
                setCategories(updatedCategories);

                setSelectedCategory(null);
                setShowDeleteModal(false);
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        } else {
            console.warn('No category selected for deletion');
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-4">
                <Col xs={12} md={6} lg={4}>
                    <Link to="/admin/employees" className="d-flex mb-3">
                        <Button variant="primary" className="w-100">
                            Работники
                        </Button>
                    </Link>
                    <Link to="/admin/appointments" className="d-flex mb-3">
                        <Button variant="primary" className="w-100">
                            Записи на детейлинг
                        </Button>
                    </Link>
                    <Button variant="success" className="w-100" onClick={handleShowModal}>
                        Добавить категорию
                    </Button>
                    <Button variant="danger" className="w-100 mt-3" onClick={() => setShowDeleteModal(true)}>
                        Удалить категорию
                    </Button>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить категорию</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="categoryName">
                            <Form.Label>Название категории</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите название"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Закрыть
                    </Button>
                    <Button variant="success" onClick={handleAddCategory}>
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить категорию</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {selectedCategory ? selectedCategory.name : 'Выберите категорию'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {categories.map((category) => (
                                <Dropdown.Item key={category.id} onClick={() => setSelectedCategory(category)}>
                                    {category.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Закрыть
                    </Button>
                    <Button variant="danger" onClick={handleDeleteClick}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </Container>
    );
};

export default AdminPage;
