import {
    CREATE_USER,
    GET_USER,
    EDIT_USER,
    DELETE_USER,
    ADD_USER_CONTACT,
    REMOVE_USER_CONTACT
} from '../actions/types/UserTypes';

import _ from 'lodash';

const INITIAL_STATE = {
    loggedIn: false,
    user: null
}


//THIS IS AN AWKWARD CASE OF A REDUCER AND STATE BECAUSE IT IS 
//AUTHENTICATION
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_USER:
            return state;
        case GET_USER: //WOULD BE OUR LOGIN METHOD IM GUESSING
            return { loggedIn: true, user: action.payload }
        case DELETE_USER:
            return { loggedIn: false, user: null }
        case EDIT_USER:
            return { ...state, user: action.payload }
        case ADD_USER_CONTACT:
            return { ...state, user: action.payload }
        case REMOVE_USER_CONTACT:
            return { ...state, user: action.payload }
        default:
            return state
    }
}


//NORMAL EXAMPLE FOR OTHER DATA IS BELOW
/*
import {
    CREATE_TAG,
    GET_TAG,
    EDIT_TAG,
    DELETE_TAG,
    RETRIEVE_TAGS
} from '../actions/types/Tag_Types'

import _ from 'lodash';


export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_TAG:
            return { ...state, [action.payload._id]: action.payload };
        case GET_TAG:
            return { ...state, [action.payload._id]: action.payload };
        case DELETE_TAG:
            return _.omit(state, action.payload._id);
        case EDIT_TAG:
            return { ...state, [action.payload._id]: action.payload };
        case RETRIEVE_TAGS:
            console.log("RETRIEVE TAGS", { ..._.mapKeys(action.payload, '_id') })
            return  _.mapKeys(action.payload, '_id');
        default:
            return state
    }
}
*/