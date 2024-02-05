import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Form } from 'react-bootstrap';
import { GetAllAppointments, changeStatus } from '../http/appointmentsApi';

const statusOptions = ["Pending", "Confirmed", "Cancelled"];

const getStatusVariant = (status) => {
    switch (status) {
        case "Pending":
            return "warning";
        case "Confirmed":
            return "success";
        case "Cancelled":
            return "danger";
        default:
            return "secondary";
    }
};

const AppointmentsManagement = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        try {
            GetAllAppointments().then((data) => {
                setAppointments(data);
            });
        } catch (e) {
            console.log(e);
        }
    }, []);

    const handleChangeStatus = async (appointmentId, newStatus) => {
        try {
            await changeStatus(appointmentId, { status: newStatus });
            GetAllAppointments().then((data) => {
                setAppointments(data);
            });
        } catch (error) {
            console.error('Error updating appointment status:', error.message);
        }
    };

    return (
        <Container className="mt-4">
            <h1>Записи</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ФИО</th>
                        <th>Email</th>
                        <th>Цена</th>
                        <th>Статус</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments
                        .filter((appointment) => appointment.status !== "Completed")
                        .map((appointment) => (
                            <tr key={appointment.id}>
                                <td>{appointment.id}</td>
                                <td>{appointment.User.username}</td>
                                <td>{appointment.User.email}</td>
                                <td>${appointment.Service.price.toFixed(2)}</td>
                                <td>
                                    <Form.Control
                                        as="select"
                                        value={appointment.status}
                                        onChange={(e) => handleChangeStatus(appointment.id, e.target.value)}
                                        className={`form-select text-white bg-${getStatusVariant(appointment.status)}`}
                                    >
                                        {statusOptions.map((option) => (
                                            <option
                                                key={option}
                                                value={option}
                                                className={`bg-${getStatusVariant(option)} text-white`}
                                            >
                                                {option}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleChangeStatus(appointment.id, "Completed")}
                                        className="ms-2"
                                    >
                                        Завершить
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    {appointments
                        .filter((appointment) => appointment.status !== "Completed")
                        .length === 0 && (
                            <tr>
                                <td colSpan="6">Нет завершенных записей</td>
                            </tr>
                        )}
                </tbody>
            </Table>

        </Container>
    );
};

export default AppointmentsManagement;
