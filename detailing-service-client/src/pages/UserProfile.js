import React from "react";
import { Container, Tabs, Tab } from "react-bootstrap";

import { observer } from "mobx-react-lite";
import UserInfo from "../components/UserInfo";
import UserVehicles from "./UserVehicles";
import UserAppointments from "../components/UserAppointments";

const UserProfile = () => {

    return (
        <Container>
            <h4>Профиль пользователя</h4>
            <Tabs defaultActiveKey="userInfo" id="user-tabs">

                <Tab eventKey="userInfo" title="Личная информация">
                    <UserInfo />
                </Tab>

                <Tab eventKey="userVehicles" title="Мои автомобили">
                    <UserVehicles />
                </Tab>

                <Tab eventKey="userAppointments" title="Мои записи на детейлинг">
                    <UserAppointments />
                </Tab>

            </Tabs>
        </Container>
    )
}

export default observer(UserProfile);