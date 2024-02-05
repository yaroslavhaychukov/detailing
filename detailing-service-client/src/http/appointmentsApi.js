import { $authHost } from "./index";

export const fetchPendingAppointments = async () => {
    const { data } = await $authHost.get("api/appointment/fetchPending/");
    return data;
};

export const AssignAppointment = async (info) => {
    const { data } = await $authHost.post("api/serviceAssign/assign/", info);
    return data;
};

export const GetAllAppointments = async () => {
    const { data } = await $authHost.get("api/appointment/");
    return data;
};

export const changeStatus = async (id, status) => {
    const { data } = await $authHost.put("api/appointment/updateById/" + id, status);
    return data;
};