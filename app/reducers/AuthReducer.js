import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAIL,
    SIGNUP_USER,
    USER_LOGOUT
} from '../actions/types';

const initialAuthState = {
    email: '',
    password: '',
    user: null,
    isLoggedIn: false,
    error: '',
    loading: false,
};

export default function auth(state = initialAuthState, action) {
    switch (action.type) {
        case EMAIL_CHANGED:
            return Object.assign({}, state, {
                email: action.payload
            });
        case PASSWORD_CHANGED:
            return Object.assign({}, state, {
                password: action.payload
            });
        case LOGIN_USER:
            return Object.assign({}, state, {
                loading: true,
                error: ''
            });
        case LOGIN_USER_SUCCESS:
            return Object.assign({}, state, initialAuthState, {
                user: action.payload,
                isLoggedIn: true
            });
        case LOGIN_USER_FAIL:
            return Object.assign({}, state, {
                error: action.payload.message,
                password: '',
                loading: false
            });
        case USER_LOGOUT:
            return Object.assign({}, state, {
                user: '',
                isLoggedIn: false
            });
        case SIGNUP_USER:
            return Object.assign({}, state, {
                loading: true,
                error: ''
            });
        case SIGNUP_USER_SUCCESS:
            return Object.assign({}, state, initialAuthState, {
                user: action.payload,
                isLoggedIn: true
            });
        case SIGNUP_USER_FAIL:
            return Object.assign({}, state, {
                error: action.payload.message,
                password: '',
                loading: false
            });
        default:
            return state;
    };
};