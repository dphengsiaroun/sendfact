import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAIL,
    SIGNUP_USER
} from '../actions/types';

const initialAuthState = { 
    email: '',
    password: '',
    user: null,
    isLoggedIn: false,
    error: '',
    loading: false,
};

export default (state = initialAuthState, action) => {
    switch (action.type) {
        case EMAIL_CHANGED: 
            return {...state, email: action.payload};
        case PASSWORD_CHANGED: 
            return {...state, password: action.payload};
        case LOGIN_USER: 
            return {...state, loading: true, error: ''};
        case LOGIN_USER_SUCCESS: 
            return {...state, ...initialAuthState, user: action.payload, isLoggedIn: true};
        case LOGIN_USER_FAIL: 
            return {...state, error: action.payload.message, password: '', loading: false, userLoggedIn: true };
        case SIGNUP_USER: 
            return {...state, loading: true, error: ''};
        case SIGNUP_USER_SUCCESS: 
            return {...state, ...initialAuthState, user: action.payload, isLoggedIn: true};
        case SIGNUP_USER_FAIL: 
            return {...state, error: action.payload.message, password: '', loading: false, userLoggedIn: true };
        default:
            return state;
    };
};