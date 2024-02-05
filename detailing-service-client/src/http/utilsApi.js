import { $authHost, $host } from ".";

export const getAllServiceCategories = async () => {
    const { data } = await $host.get('api/utils/service-categories')
    return data
}

export const createCategory = async (name) => {
    const { data } = await $authHost.post('api/utils/service-categories/create', name)
    return data
}

export const deleteCategory = async (id) => {
    const { data } = await $authHost.delete('api/utils/service-categories/delete/' + id)
    return data
}