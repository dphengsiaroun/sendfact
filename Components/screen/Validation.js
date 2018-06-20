import React, { Component } from 'react';
import { 
	StyleSheet, 
	ImageBackground, 
	View,
	Image,
	AsyncStorage
} from 'react-native';
import { 
	Button, 
	Container, 
	Content, 
	Text,
	Header,
	Left, 
	Right, 
	Body, 
	Title 
} from 'native-base';
import { Icon } from 'react-native-elements';

import ValidationCss from './css/ValidationCss';

export default class Validation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			userIsConnected: true,
		};
	}

	render() {
		console.log('profile', this.props.navigation);
		return (
			<React.Fragment>
			<Header style={{backgroundColor: '#efc848'}}>
				<Left/>
				<Body>
					<Title style={{color: 'white'}}>Validation</Title>
				</Body>
				<Right>
					<Icon 
						name="menu"
						type='feather'
						color="white"
						onPress={() => this.props.navigation.navigate('DrawerOpen')}/>
				</Right>
			</Header>
			<View style={ValidationCss.container}>
				<Image style={ValidationCss.avatar} source={require('../img/checked.png')} />				
				<Text style={ValidationCss.text}>Facture</Text>
				<Text style={ValidationCss.name}>Envoyée !</Text>
					<Button block info style={ValidationCss.btn} onPress={() => this.props.navigation.navigate('Camera')}>
						<Icon 
							name='camera'
							type="font-awesome"
							 color="white"/>
						<Text>Nouvelle facture</Text>
					</Button>
			</View>
			</React.Fragment>
		);
	}
}


