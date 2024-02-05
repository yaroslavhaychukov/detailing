import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";

export const registration = async (username, email, password) => {
    const { data } = await $host.post("api/users/signup", { username, email, password })
    localStorage.setItem('token', data.token)
    localStorage.setItem('isAuth', true)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const { data } = await $host.post("api/users/login", { email, password })
    localStorage.setItem('token', data.token)
    localStorage.setItem('isAuth', true)
    return jwtDecode(data.token)
}

// VEHICLE

export const createVehicle = async (vehicle) => {
    const { data } = await $authHost.post('api/vehicles/create', vehicle)
    return data
}

export const getAllForUser = async (id) => {
    const { data } = await $authHost.get('api/vehicles/getAllForUser/' + id)
    return data
}

export const deleteVehicle = async (id) => {
    const { data } = await $authHost.delete('api/vehicles/' + id)
    return data
}

export const editUserVehicle = async (id, vehicle) => {
    const { data } = await $authHost.put('api/vehicles/' + id, vehicle)
    return data
}



export const makeOrder = async (order) => {
    const { data } = await $authHost.post('api/appointment/create', order);
    return data;
};

export const getUserAppointments = async (id) => {
    const { data } = await $authHost.get('api/users/appointments/' + id)
    return data
}

export const setFavoriteService = async (id) => {
    const { data } = await $authHost.post('api/users/toggle/' + id)
    return data
}

export const getUserInfo = async (id) => {
    const { data } = await $authHost.get('api/users/userInfo/' + id)
    return data
}