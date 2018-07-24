import {
    Alert
} from 'react-native';
import {
    StackActions,
    DrawerActions,
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
    USER_LOGOUT,
    SET_IMAGE_PATH,
    COMMENT_CHANGED,
    SET_COMMENT,
    SAVE_TO_FIREBASE,
    SAVE_TO_FIREBASE_FAIL,
    SAVE_TO_FIREBASE_SUCCESS
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

// LOGIN ACTIONS

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

// LOGOUT ACTIONS

export const userLogout = () => {
    return (dispatch) => {
        dispatch({
            type: USER_LOGOUT
        });
        Firebase.auth().signOut();
        dispatch(DrawerActions.closeDrawer());
    };
}

// SIGNUP ACTIONS

export const signupUser = ({
    email,
    password
}) => {
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

// SET IMAGE ACTIONS

export const setImagePath = (path) => {
    return (dispatch) => {
        dispatch({
            type: SET_IMAGE_PATH,
            payload: path
        });
    }
}

// SET COMMENT ACTIONS

export const commentChanged = (text) => {
    return {
        type: COMMENT_CHANGED,
        payload: text
    };
};

export const setComment = (comment) => {
    return (dispatch) => {
        dispatch({
            type: SET_COMMENT,
            payload: comment
        });
    };
};

// SAVE DATA TO FIREBASE

export const saveToFirebase = (path, comment, user) => {
    return (dispatch) => {
        dispatch({
            type: SAVE_TO_FIREBASE
        });
        var timestamp = new Date().getTime();
        Firebase.database().ref('/factures/').push({
                user: user,
                imagePath: path,
                comment: comment,
                date: timestamp,
            }).then(completed => {
                saveToFirebaseSuccess(dispatch, completed);
                // console.log('user', user);
            })
            .catch(error => {
                saveToFirebaseFail(dispatch, error);
                console.log('error', error.message);
            });
    };
};

const saveToFirebaseFail = (dispatch, error) => {
    dispatch({
        type: SAVE_TO_FIREBASE_FAIL,
        payload: error
    });
}

const saveToFirebaseSuccess = (dispatch, completed) => {
    dispatch({
        type: SAVE_TO_FIREBASE_SUCCESS,
        payload: completed
    });
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({
            routeName: 'Validation'
        })],
    });
    dispatch(resetAction);
};