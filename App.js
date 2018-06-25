import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import Navigator from './src/Navigation/Navigator';
import Firebase from 'firebase';
import { config } from './env/config'

export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			userIsConnected: false
		}
	}

	componentDidMount() {
		this.isAuthenticated().done();
	}

	componentWillMount() {
		Firebase.initializeApp(config);
	}

	isAuthenticated = async () => {
		const token = await AsyncStorage.getItem('currentUser');
		console.log('token', token);
		if (token) {
			// this.props.navigation.navigate('Camera');
			this.setState({ userIsConnected: true });
			Alert.alert(
				'Connexion',
				'Vous êtes bien connecté.',
			)
		}
	}

	render() {
		return (
			<Navigator />
		);
	}
}

