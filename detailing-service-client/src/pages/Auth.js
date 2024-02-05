import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { registration, login } from '../http/UserApi'
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const Auth = () => {
    const { user } = useContext(Context)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleToggle = () => {
        setIsLogin(!isLogin);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isLogin) {
                const data = await login(email, password)
                user.setUser(data);
                user.setIsAuth(true);
            } else {
                await registration(username, email, password);
            }
            window.location.href = "/";
            setUsername('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">{isLogin ? 'Вход' : 'Регистрация'}</h2>
                            <Form onSubmit={handleSubmit}>
                                {!isLogin && (
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Имя пользователя</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Введите имя пользователя"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </Form.Group>
                                )}
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name='email'
                                        placeholder="Введите email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Введите пароль"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Button type="submit" variant="primary" className='mt-2'>
                                    {isLogin ? 'Вход' : 'Регистрация'}
                                </Button>
                            </Form>
                            <p className="text-center mt-3">
                                {isLogin
                                    ? "Нет учетной записи? "
                                    : 'Уже есть учетная запись? '}
                                <span className="text-primary" onClick={handleToggle}>
                                    {isLogin ? 'Зарегистрируйтесь' : 'Войдите'}
                                </span>
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default observer(Auth);
