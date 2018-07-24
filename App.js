import React from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import Firebase from 'firebase';
import { config } from './env/config'
import { AppNavigator } from './app/navigation/AppNavigator';
import configStore from './app/store/configStore.js';
const store = configStore();

Firebase.initializeApp(config);

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class App extends React.Component {

	render() {
		return (
			<Provider store={store}>
				<AppNavigator />
			</Provider>
		);
	}
}

