import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { createVehicle, deleteVehicle, getAllForUser, editUserVehicle } from "../http/UserApi";
import { jwtDecode } from "jwt-decode";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newVehicle, setNewVehicle] = useState({ make: "", model: "", year: "" });
    const [editingVehicleId, setEditingVehicleId] = useState(null);

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await getAllForUser(getUserIdFromToken());
            setVehicles(response);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        }
    };

    const addVehicle = async () => {
        try {
            const user_id = getUserIdFromToken();
            const vehicleWithUserId = { ...newVehicle, user_id };
            await createVehicle(vehicleWithUserId);
            fetchVehicles();
            setNewVehicle({ make: '', model: '', year: '' });
            setShowModal(false);

            toast.success('Vehicle added successfully!');
        } catch (error) {
            console.error('Error adding vehicle:', error);

            toast.error('Failed to add vehicle. Please try again.');
        }
    };

    const removeVehicle = async (id) => {
        try {
            await deleteVehicle(id)
            fetchVehicles();
        } catch (error) {
            console.error("Error removing vehicle:", error);
        }
    };

    const getUserIdFromToken = () => {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const user_id = decodedToken ? decodedToken.user_id : null;
        return user_id;
    };


    const editVehicle = (vehicle) => {
        setEditingVehicleId(vehicle.id);
        setNewVehicle({ make: vehicle.make, model: vehicle.model, year: vehicle.year });
        setShowModal(true);
    };

    const saveEditedVehicle = async () => {
        try {
            await editUserVehicle(editingVehicleId, { ...newVehicle, id: editingVehicleId });
            fetchVehicles();
            setEditingVehicleId(null);
            setNewVehicle({ make: "", model: "", year: "" });
            setShowModal(false);
        } catch (error) {
            console.error("Error editing vehicle:", error);
        }
    };

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Марка</th>
                        <th>Модель</th>
                        <th>Год</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.length === 0 ? (
                        <tr>
                            <td colSpan="4">Нет доступных транспортных средств</td>
                        </tr>
                    ) : (
                        vehicles.map((vehicle) => (
                            <tr key={vehicle.id}>
                                <td>{vehicle.make}</td>
                                <td>{vehicle.model}</td>
                                <td>{vehicle.year}</td>
                                <td>
                                    <Button variant="danger" size="sm" onClick={() => removeVehicle(vehicle.id)}>
                                        Удалить
                                    </Button>{" "}
                                    <Button variant="info" size="sm" onClick={() => editVehicle(vehicle)}>
                                        Редактировать
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>


            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingVehicleId ? "Редактировать машину" : "Добавить новую машину"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="make">
                            <Form.Label>Марка</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите марку"
                                value={newVehicle.make}
                                onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="model">
                            <Form.Label>Модель</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите модель"
                                value={newVehicle.model}
                                onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="year">
                            <Form.Label>Год</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Введите год"
                                value={newVehicle.year}
                                onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={editingVehicleId ? saveEditedVehicle : addVehicle}>
                        {editingVehicleId ? "Сохранить изменения" : "Добавить"}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Button variant="primary" onClick={() => setShowModal(true)}>
                Добавить новую машину
            </Button>

            <ToastContainer />
        </div>
    );
};

export default observer(UserVehicles);
