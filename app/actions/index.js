import {
    StackActions,
    NavigationActions
} from 'react-navigation';
import Firebase from 'firebase'
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAIL,
    SIGNUP_USER,
    USER_LOG_OUT
} from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({
    email,
    password
}) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_USER
        });

        Firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                loginUserSuccess(dispatch, user);
                console.log('user', user);
            })
            .catch(error => {
                loginUserFail(dispatch, error);
                console.log('error', error.message);
            });
    };
};

const loginUserFail = (dispatch, error) => {
    dispatch({
        type: LOGIN_USER_FAIL,
        payload: error
    });
}

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({
            routeName: 'Home'
        })],
    });
    dispatch(resetAction);
};

export const userLogout = () => {
    return (dispatch) => {
        dispatch({
            type: USER_LOG_OUT
        });
        Firebase.auth().signOut()
    };
}


export const signupUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({
            type: SIGNUP_USER
        });
        Firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                signupUserSuccess(dispatch, user);
                console.log('user', user);
            })
            .catch(error => {
                signupUserFail(dispatch, error);
                console.log('error', error.message);
            });
    };
};

const signupUserFail = (dispatch, error) => {
    dispatch({
        type: SIGNUP_USER_FAIL,
        payload: error
    });
}

const signupUserSuccess = (dispatch, user) => {
    dispatch({
        type: SIGNUP_USER_SUCCESS,
        payload: user
    });
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({
            routeName: 'Home'
        })],
    });
    dispatch(resetAction);
};
