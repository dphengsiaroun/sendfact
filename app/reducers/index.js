import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import NavReducer from './NavReducer';
import PictureReducer from './PictureReducer';

export default combineReducers({
    auth: AuthReducer,
    nav: NavReducer,
    image: PictureReducer
});