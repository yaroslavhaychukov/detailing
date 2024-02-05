import React, { useEffect, useState } from "react";
import { Badge, Table, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { getUserAppointments } from "../http/UserApi";
import { jwtDecode } from "jwt-decode";
import generatePDF_user from "../utils/generatePdf_user";

const getStatusVariant = (status) => {
    switch (status) {
        case "Pending":
            return "warning";
        case "Confirmed":
            return "success";
        case "Completed":
            return "primary";
        case "Cancelled":
            return "danger";
        default:
            return "secondary";
    }
};

const UserAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    const getUserIdFromToken = () => {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const user_id = decodedToken ? decodedToken.user_id : null;
        return user_id;
    };


    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await getUserAppointments(getUserIdFromToken());
                setAppointments(response);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, []);

    const generateReport = (appointments) => {
        generatePDF_user(appointments)
    };

    return (
        <div>

            <h5>Мои записи</h5>
            <Button variant="primary" className="mb-3" onClick={() => generateReport(appointments)}>
                Сделать отчет
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Статус</th>
                        <th>Название</th>
                        <th>Работник</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length === 0 ? (
                        <tr>
                            <td colSpan="4">Нет доступных записей</td>
                        </tr>
                    ) : (
                        appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td>{new Date(appointment.date).toLocaleString()}</td>
                                <td>
                                    <Badge variant={getStatusVariant(appointment.status)}>
                                        {appointment.status}
                                    </Badge>
                                </td>
                                <td>{appointment.Service.name}</td>
                                <td>{appointment.Employee.first_name + ' ' + appointment.Employee.last_name}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>

        </div>
    );
};

export default observer(UserAppointments);
