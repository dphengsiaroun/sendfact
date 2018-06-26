
import Signin from '../Screen/Signin';
import Signup from '../Screen/Signup';
import Profile from '../Screen/Profile';
import Camera from '../Screen/Camera';
import Validation from '../Screen/Validation';
import ImagePreview from '../Screen/ImagePreview';

import DrawerMenu from '../DrawerMenu/DrawerMenu';
import { DrawerNavigator, StackNavigator } from 'react-navigation';

const AppNavigator = StackNavigator({
	Signin: { screen: Signin },
	Signup: { screen: Signup },
	Profile: { screen: Profile },
	Validation: { screen: Validation },
	ImagePreview: { screen: ImagePreview },
	Camera: {screen: Camera }
}, {
		headerMode: 'none',
		initialRouteName: 'Camera',
  });

const Navigator = DrawerNavigator({
	Home: { screen: AppNavigator },
}, {
	// initialRouteName: 'Camera',
	contentComponent: DrawerMenu,
	drawerOpenRoute: 'DrawerOpen',
	drawerCloseRoute: 'DrawerClose',
	drawerToggleRoute: 'DrawerToggle',
	navigationOptions: { header: false }
});

export default Navigator;
