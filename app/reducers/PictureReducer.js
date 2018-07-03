import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT
} from '../actions/types';
import { Camera } from 'expo';

const initialPictureState = {
    type: Camera.Constants.Type.back,
    flash: 'off',
    path: null,
    permissionsGranted: false,
};