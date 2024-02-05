import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getAllForUser } from '../http/UserApi';
import { jwtDecode } from 'jwt-decode';
import { getAllAvailableEmployees } from '../http/employeesApi';

const OrderModal = ({ show, handleClose, handleOrderSubmit }) => {
    const [employees, setEmployees] = useState([])
    const [cars, setCars] = useState([])
    const [formData, setFormData] = useState({
        employee_id: '',
        date: '',
        time: '',
        vehicle_id: '',
    });

    const getUserIdFromToken = () => {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const user_id = decodedToken ? decodedToken.user_id : null;
        return user_id;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'date' || name === 'time') {
            const newDateTime =
                name === 'date'
                    ? `${value}T${formData.time || '00:00'}`
                    : `${formData.date || new Date().toISOString().split('T')[0]}T${value}`;

            setFormData({ ...formData, datetime: newDateTime });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const fetchVehicles = async () => {
        try {
            const response = await getAllForUser(getUserIdFromToken());
            setCars(response);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        }
    };

    const fetchAvailableEmployees = async () => {
        try {
            const response = await getAllAvailableEmployees();
            setEmployees(response);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        }
    };

    useEffect(() => {
        fetchVehicles();
        fetchAvailableEmployees();
    }, [])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Оформить заказ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="employee">
                        <Form.Label>Выберите сотрудника</Form.Label>
                        <Form.Control
                            as="select"
                            name="employee_id"
                            value={formData.employee}
                            onChange={handleInputChange}
                        >
                            <option value="">Выберите сотрудника</option>
                            {employees.map((employee) => (
                                <option key={employee.employee_id} value={employee.employee_id}>
                                    {employee.first_name + ' ' + employee.last_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="datetime">
                        <Form.Label>Выберите дату и время</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="datetime"
                            value={formData.datetime}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="car">
                        <Form.Label>Выберите автомобиль</Form.Label>
                        <Form.Control
                            as="select"
                            name="vehicle_id"
                            value={formData.car}
                            onChange={handleInputChange}
                        >
                            <option value="">Выберите автомобиль</option>
                            {cars.map((car) => (
                                <option key={car.id} value={car.id}>
                                    {car.make} {car.model}
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
                <Button variant="primary" onClick={() => handleOrderSubmit({ ...formData, user_id: getUserIdFromToken() })}>
                    Оформить заказ
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OrderModal;
