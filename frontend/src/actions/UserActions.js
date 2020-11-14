import {
    CREATE_USER,
    GET_USER,
    EDIT_USER,
    DELETE_USER,
    ADD_USER_CONTACT,
    REMOVE_USER_CONTACT,
} from './types/UserTypes';

import api from '../api/api';

export const createUser = (formValues) => async (dispatch) => {

    const response = await api.post(`/users/create`, formValues );

    const { success, result, error } = response.data;

    if (!success) {
        alert(error);
    } else {
        dispatch({ type: CREATE_USER, payload: result });
    }
}
