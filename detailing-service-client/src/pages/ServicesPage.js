import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllServiceCategories } from '../http/utilsApi';
import { getAllServices } from '../http/ServicesApi';

import ServiceEditModal from '../modals/ServiceEditModal';
import ServiceAddModal from '../modals/ServiceAddModal';

import { deleteService, updateService, createService } from '../http/ServicesApi';
import { setFavoriteService } from '../http/UserApi';
import { getAllAssortment, deleteAssortment, editAssortment } from '../http/AssortmentApi';

import { jwtDecode } from 'jwt-decode';
import AssortmentModal from '../modals/AssortmentModal';

import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { observer } from 'mobx-react-lite';
import { Context } from '../index';


const ServicesPage = () => {
    const { service } = useContext(Context)
    const [services, setServices] = useState([]);
    const [assortment, setAssortment] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showAssortmentModal, setShowAssortmentModal] = useState(false);

    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const isAdmin = decodedToken && decodedToken.role === 'Admin';

    const handleShowAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const fetchAssortment = async () => {
        try {
            const response = await getAllAssortment();
            setAssortment(response);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await getAllServices();
            setServices(response);
            service.setServices(response)
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const handleAddService = async (newService) => {
        try {
            const formData = new FormData();
            formData.append('name', newService.name);
            formData.append('category_id', newService.category_id);
            formData.append('description', newService.description);
            formData.append('price', newService.price);
            formData.append('image', newService.image);

            const response = await createService(formData);
            console.log('Service added successfully:', response);
            fetchServices()
            handleCloseAddModal();
        } catch (error) {
            console.error('Error adding service:', error);
        }
    };

    const handleDelete = async (service) => {
        try {
            await deleteService(service.id);
            fetchServices();
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await getAllServiceCategories();
            setCategories(response);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const filteredServices = services
        .filter((service) => {
            const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || service.ServiceCategory.name === selectedCategory;
            const withinPriceRange =
                (minPrice === '' || parseFloat(service.price) >= parseFloat(minPrice)) &&
                (maxPrice === '' || parseFloat(service.price) <= parseFloat(maxPrice));

            return matchesSearch && matchesCategory && withinPriceRange;
        })
        .sort((a, b) => {
            const favoritedA = a.isFavorited ? 1 : 0;
            const favoritedB = b.isFavorited ? 1 : 0;

            return favoritedB - favoritedA;
        });


    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleEditClick = (service) => {
        setSelectedService(service);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowAssortment = () => setShowAssortmentModal(true);
    const handleCloseAssortment = () => setShowAssortmentModal(false);

    const handleSaveChanges = async (updatedService) => {
        try {
            const response = await updateService(updatedService.id, updatedService);
            await fetchServices();
            console.log('Service updated successfully:', response);
            handleCloseModal();
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [services]);

    useEffect(() => {
        fetchAssortment();
        fetchServices();
    }, []);

    const handleMinPriceChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setMinPrice(value >= 0 ? value : 0);
    };

    const handleMaxPriceChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setMaxPrice(value > 0 ? value : '');
    };

    const handleEditAssortment = async (editedAssortment) => {
        try {
            await editAssortment(editedAssortment.id, editedAssortment);
            handleCloseAssortment();
            fetchAssortment()
        } catch (error) {
            console.error("Error editing assortment:", error);
        }
    };

    const handleDeleteAssortment = async (id) => {
        try {
            await deleteAssortment(id);
            handleCloseAssortment();
            fetchAssortment()
        } catch (error) {
            console.error("Error deleting assortment:", error);
        }
    };

    const handleFavoriteClick = (service) => {
        toggleFavorite(service.id);
    };

    const toggleFavorite = async (serviceId) => {
        try {
            await setFavoriteService(serviceId)
            fetchServices();
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };


    return (
        <Container fluid>
            <Row>
                <Col className="text-center mt-3">
                    <h1>Услуги детейлинга</h1>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={6} lg={3} className="mb-4">
                    <Form.Control
                        type="text"
                        placeholder="Поиск услуг"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>

                <Col md={2} lg={2} className="mb-4">
                    <Form.Control
                        type="number"
                        placeholder="Мин. цена"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                    />
                </Col>

                <Col md={2} lg={2} className="mb-4">
                    <Form.Control
                        type="number"
                        placeholder="Макс. цена"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                    />
                </Col>

                <Col md={6} lg={2} className="mb-4">
                    <Form.Control
                        as="select"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >

                        <option value="All">Все категории</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </Form.Control>
                </Col>

                {isAdmin && (
                    <Col lg={2} className="mb-4">
                        <Button variant="success" style={{ marginLeft: '8px' }} onClick={handleShowAddModal}>
                            Добавить услугу
                        </Button>
                    </Col>
                )}

            </Row>

            <Row>
                <Col md={6} lg={4} className="mb-4">
                    <Card className="h-100 d-flex flex-column" style={{ backgroundColor: '#efe' }}>
                        <Image
                            src={`${process.env.REACT_APP_API_URL}detailing.jpg`}
                            alt='123'
                            fluid
                            style={{ height: '200px', objectFit: 'cover' }}
                        />
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>Предметы для детейлинга</Card.Title>
                            <Card.Text>Наши продукты - это ключ к безупречному блеску вашего автомобиля, создавая впечатляющий внешний вид и подчеркивая каждую деталь.</Card.Text>
                            <div className="mt-auto">
                                <Button variant="primary" onClick={handleShowAssortment}>Ассортимент</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {filteredServices.map((service) => (
                    <Col key={service.id} md={6} lg={4} className="mb-4">
                        <Card className="h-100 d-flex flex-column">
                            <Image
                                src={`${process.env.REACT_APP_API_URL}${service.image}`}
                                alt={service.name}
                                fluid
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <Card.Body className="d-flex flex-column">
                                <div className="d-flex justify-content-between">
                                    <Card.Title>
                                        {service.name}
                                        <Button
                                            variant="link"
                                            onClick={() => handleFavoriteClick(service)}
                                            className="ml-2"
                                        >
                                            {service.isFavorited ? (
                                                <FaHeart style={{ color: 'red' }} />
                                            ) : (
                                                <FaRegHeart />
                                            )}
                                        </Button>
                                    </Card.Title>
                                    <div className="price-tag">${service.price.toFixed(2)}</div>
                                </div>
                                <Card.Text>{service.description}</Card.Text>
                                <div className="mt-auto">
                                    <Link to={`/service/${service.id}`}>
                                        <Button variant="primary">Подробнее</Button>
                                    </Link>
                                    {isAdmin && (
                                        <>
                                            <Button
                                                variant="warning"
                                                style={{ marginLeft: '8px' }}
                                                onClick={() => handleEditClick(service)}
                                            >
                                                Редактировать
                                            </Button>
                                            <Button variant="danger" style={{ marginLeft: '8px' }} onClick={() => { handleDelete(service) }}>
                                                Удалить
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}


            </Row>

            {isAdmin && (
                <>
                    <ServiceEditModal
                        show={showModal}
                        handleClose={handleCloseModal}
                        handleSave={handleSaveChanges}
                        service={selectedService}
                    />
                    <ServiceAddModal
                        show={showAddModal}
                        handleClose={handleCloseAddModal}
                        handleAdd={handleAddService}
                        categories={categories} />
                </>
            )}

            <AssortmentModal assortment={assortment} showModal={showAssortmentModal} handleClose={handleCloseAssortment} isAdmin={isAdmin} handleDelete={handleDeleteAssortment} handleEdit={handleEditAssortment} />

        </Container>
    );
};

export default observer(ServicesPage);