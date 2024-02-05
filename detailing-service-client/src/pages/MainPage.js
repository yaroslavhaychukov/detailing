import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './MainPage.css';
import { Link } from "react-router-dom";

const MainPage = () => {
    return (
        <div className="app-background">
            <Container fluid>
                <Row>
                    <Col className="text-center mt-5">
                        <h1 className="main-title">Добро пожаловать в наш сервис автомобильной детализации</h1>
                        <p className="lead">Ваш автомобиль заслуживает лучшего ухода!</p>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col>
                        <h2>Наши услуги</h2>
                        <p>Выберите из наших премиальных услуг по детейлингу автомобилей:</p>
                        <ul className="service-list">
                            <li>Внешняя мойка и воскование</li>
                            <li>Внутренняя уборка и чистка</li>
                            <li>Коррекция краски и полировка</li>
                            <li>Обработка кожаных сидений</li>
                        </ul>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col>
                        <div className="book-now-section">
                            <h2>Запишитесь на прием прямо сейчас!</h2>
                            <p>Предоставьте своему автомобилю заботу, которую он заслуживает. Запишитесь на прием уже сегодня.</p>
                            <Link className="btn btn-primary" to="/services">Записаться</Link>
                        </div>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col>
                        <h2>О нас</h2>
                        <p className="about-us">
                            Мы стремимся предоставлять услуги автомобильной детализации высшего качества.
                            С годами опыта наша команда гарантирует, что ваш автомобиль уезжает, выглядя лучше, чем когда-либо.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MainPage;