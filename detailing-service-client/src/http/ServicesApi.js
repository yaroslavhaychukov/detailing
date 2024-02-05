import { $authHost, $host } from ".";

export const getAllServices = async () => {
    const { data } = await $authHost.get('api/services/get')
    return data
}

export const getOneService = async (id) => {
    const { data } = await $host.get('api/services/get/' + id)
    return data
}

export const getReviewsService = async (id) => {
    const { data } = await $host.get('api/services/reviews/' + id)
    return data
}

export const deleteService = async (id) => {
    const { data } = await $authHost.delete('api/services/delete/' + id);
    return data;
};

export const updateService = async (id, updatedService) => {
    const { data } = await $authHost.put('api/services/update/' + id, updatedService);
    return data;
};

export const createService = async (service) => {
    const { data } = await $authHost.post('api/services/create', service)
    return data
}

export const deleteReview = async (id) => {
    const { data } = await $authHost.delete('api/services/reviews/' + id)
    return data
}

export const addReview = async (review) => {
    const { data } = await $authHost.post('api/services/reviews/', review);
    return data
}




export const submitApplication = async (applicationData) => {
    const { data } = await $host.post('api/applications/create', applicationData);
    return data;
};

export const cancelApplication = async (applicationData) => {
    const { data } = await $authHost.post('api/applications/cancel', applicationData);
    return data;
};

export const getOneReview = async (id) => {
    const { data } = await $host.get('api/feedbacks/one/' + id)
    return data
}

export const addFeedback = async (feedbackData) => {
    const { data } = await $authHost.post('api/feedbacks/', feedbackData);
    return data;
}