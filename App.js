import React from 'react';
import { StyleSheet, View, AsyncStorage, Alert } from 'react-native';
import { Container, Content } from 'native-base'
import Navigator from './src/Navigation/Navigator';
import firebase from 'firebase';
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
		firebase.initializeApp(config);
	}

	isAuthenticated = async () => {
		const token = await AsyncStorage.getItem('isAlreadyConnected');
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
		console.log('this.state App.js', this.state);
		return (
			<Navigator />
		);
	}
}

