	import React from 'react';
	import { StyleSheet, View } from 'react-native';

	import { Container, Content } from 'native-base'

	import Camera from './Components/Camera'

	export default class App extends React.Component {

	constructor() {
		super();
	}

	render() {
		return (
		<Container>
				<View style={{ flex: 1 }}>
					<Camera></Camera>
				</View>
		</Container>
		);
	}
	}

