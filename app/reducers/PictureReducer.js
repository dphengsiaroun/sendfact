import {
    SET_IMAGE_PATH,
    COMMENT_CHANGED,
    SAVE_TO_FIREBASE,
    SAVE_TO_FIREBASE_SUCCESS,
    SAVE_TO_FIREBASE_FAIL
} from '../actions/types';
import {
    Camera
} from 'expo';

const initialPictureState = {
    type: Camera.Constants.Type.back,
    flash: 'off',
    path: '',
    comment: '',
    permissionsGranted: false,
    error: '',
    loading: false,
    completed: false
};

export default function image(state = initialPictureState, action) {
    switch (action.type) {
        case COMMENT_CHANGED:
            return Object.assign({}, state, {
                comment: action.payload
            });
        case SET_IMAGE_PATH:
            return Object.assign({}, state, {
                error: '',
                path: action.payload
            });
        case SAVE_TO_FIREBASE:
            return Object.assign({}, state, {
                loading: true,
                error: ''
            });
        case SAVE_TO_FIREBASE_SUCCESS:
            return Object.assign({}, state, initialPictureState, {
                completed: true,
            });
        case SAVE_TO_FIREBASE_FAIL:
            return Object.assign({}, state, {
                error: action.payload.message,
                loading: false
            });
        default:
            return state;
    };
};