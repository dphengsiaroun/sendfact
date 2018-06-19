
import Signin from '../Screen/Signin';
import Signup from '../Screen/Signup';
import Profile from '../Screen/Profile';
import Camera from '../Screen/Camera';
import Validation from '../Screen/Validation';

import DrawerMenu from '../DrawerMenu/DrawerMenu';
import { DrawerNavigator } from 'react-navigation';

const Navigator = DrawerNavigator({
	Signin: { screen: Signin },
	Signup: { screen: Signup },
	Profile: { screen: Profile },
	Validation: { screen: Validation },
	Camera: {screen: Camera }
}, {
	initialRouteName: 'Camera',
	contentComponent: DrawerMenu,
	drawerOpenRoute: 'DrawerOpen',
	drawerCloseRoute: 'DrawerClose',
	drawerToggleRoute: 'DrawerToggle',
	navigationOptions: { header: false }
});

export default Navigator;
