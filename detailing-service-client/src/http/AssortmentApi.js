import { $authHost, $host } from ".";

export const getAllAssortment = async () => {
    const { data } = await $authHost.get('api/assortments/')
    return data
}

export const deleteAssortment = async (id) => {
    const { data } = await $authHost.delete('api/assortments/' + id)
    return data
}

export const editAssortment = async (id, assortment) => {
    const { data } = await $authHost.put('api/assortments/' + id, assortment)
    return data
}