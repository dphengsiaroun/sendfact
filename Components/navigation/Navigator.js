
import Signin from '../screen/Signin';
import Signup from '../screen/Signup';
import Profile from '../screen/Profile';
import Camera from '../screen/Camera';
import Validation from '../screen/Validation';

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
