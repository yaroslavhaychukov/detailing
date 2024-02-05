import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { ADMINISTRATOR_ROUTE, LOGIN_ROUTE, USERPROFILE_ROUTE, FAQ_ROUTE, MAIN_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '..';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Header = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const isAdmin = decodedToken && decodedToken.role === 'Admin';

    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.clear()
        navigate(MAIN_ROUTE)
    }

    return (
        <Navbar bg="dark">
            <Container fluid>
                <NavLink
                    style={{
                        fontSize: "20px", color: "white", textDecoration: "none"
                    }}
                    to={MAIN_ROUTE}
                >
                    Detailing
                </NavLink>
                {localStorage.getItem('isAuth') ?
                    <Nav className="ml-auto">
                        {isAdmin &&
                            <Button
                                className="me-2"
                                style={{ color: "white" }}
                                onClick={() => navigate(ADMINISTRATOR_ROUTE)}
                                variant='outlined-primary'
                            >
                                Панель администратора
                            </Button>
                        }
                        <Button
                            className="me-2"
                            style={{ color: "white" }}
                            onClick={() => navigate(USERPROFILE_ROUTE)}
                            variant='outlined-primary'
                        >
                            Профиль
                        </Button>
                        <Button
                            className="me-2"
                            style={{ color: "white" }}
                            onClick={() => navigate(FAQ_ROUTE)}
                            variant='outlined-primary'
                        >
                            FAQ
                        </Button>
                        <Button
                            variant='outlined-primary'
                            style={{ color: "white" }}
                            onClick={() => logout()}
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <>
                        <Nav className="ml-auto">
                            <Button
                                className="me-2"
                                style={{ color: "white" }}
                                onClick={() => navigate(FAQ_ROUTE)}
                                variant='outlined-primary'
                            >
                                FAQ
                            </Button>
                            <Button
                                variant='outlined-primary'
                                style={{ color: "white" }}
                                onClick={() => navigate(LOGIN_ROUTE)}
                            >
                                Авторизация
                            </Button>
                        </Nav>
                    </>
                }
            </Container>
        </Navbar>
    );
});

export default Header;
