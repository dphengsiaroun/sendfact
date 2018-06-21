import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Container, Content } from 'native-base'
import Navigator from './Components/Navigation/Navigator';
import firebase from 'firebase';
import { 
	API_KEY,
	AUTH_DOMAIN, 
	DATABASE_URL, 
	PROJECT_ID, 
	STORAGE_BUCKET, 
	MESSAGING_SENDER_ID 
} from './env/config'

export default class App extends React.Component {

	constructor() {
		super();
	}

	componentWillMount() {
		var config = {
			apiKey: API_KEY,
			authDomain: AUTH_DOMAIN,
			databaseURL: DATABASE_URL,
			projectId: PROJECT_ID,
			storageBucket: STORAGE_BUCKET,
			messagingSenderId: MESSAGING_SENDER_ID
			};
		firebase.initializeApp(config);
	}

	render() {
		console.log('this.state App.js', this.state);
		return (
			<Navigator />
		);
	}
}

