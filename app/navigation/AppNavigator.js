import { connect } from 'react-redux';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import Signin from '../Screen/Signin';
import Signup from '../Screen/Signup';
import Profile from '../Screen/Profile';
import Camera from '../Screen/Camera';
import Validation from '../Screen/Validation';
import ImagePreview from '../Screen/ImagePreview';
import DrawerMenu from '../DrawerMenu/DrawerMenu';

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

const MyNavigator = createStackNavigator({
	Home: { screen: Camera },
	Signin: { screen: Signin },
	Signup: { screen: Signup },
	Profile: { screen: Profile },
	Validation: { screen: Validation },
	ImagePreview: { screen: ImagePreview },
}, {
		headerMode: 'none',
		initialRouteName: 'Home',
  });

const RootNavigator = createDrawerNavigator({
    Home: {screen: MyNavigator },
  }, {
    initialRouteName: 'Home',
    contentComponent: DrawerMenu,
    drawerOpenRoute: 'openDrawer',
    drawerCloseRoute: 'closeDrawer',
    drawerToggleRoute: 'toggleDrawer',
    drawerWidth: 276,
    navigationOptions: { header: false }
  });

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator, middleware };