import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../http/UserApi';
import { jwtDecode } from 'jwt-decode';
import { Card, Container } from 'react-bootstrap';

const UserInfo = () => {
    const [user, setUser] = useState([]);
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const userId = decodedToken ? decodedToken.user_id : null;

    const fetchUser = async () => {
        try {
            if (userId) {
                const userData = await getUserInfo(userId);
                setUser(userData);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <Container className="mt-4">
            <h1>Профиль</h1>
            <Card>
                <Card.Body>
                    <Card.Text>
                        <strong>Username:</strong> {user.username}
                    </Card.Text>
                    <Card.Text>
                        <strong>Email:</strong> {user.email}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UserInfo;
