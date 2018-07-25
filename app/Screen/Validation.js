import React, { Component } from 'react';
import { 
	View,
} from 'react-native';
import { 
	Button,
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

	render() {
		console.log('profile', this.props.navigation);
		return (
			<React.Fragment>
			<Header style={{backgroundColor: '#338F2F'}}>
				<Left/>
				<Body>
					<Title style={{color: 'white', fontFamily: 'ArialRoundedMTBold'}}>Validation</Title>
				</Body>
				<Right>
					<Icon 
						name="menu"
						type='feather'
						color="white"
						onPress={() => this.props.navigation.openDrawer()}/>
				</Right>
			</Header>
			<View style={ValidationCss.container}>
					<Icon 
						name="md-checkmark-circle-outline"
						type='ionicon'
						color="#3DA937"
						size={90}
						onPress={() => this.props.navigation.openDrawer()}/>
				{/* <Image style={ValidationCss.avatar} source={require('../img/checked.png')} />				 */}
				<Text style={ValidationCss.text}>Facture</Text>
				<Text style={ValidationCss.name}>envoyée !</Text>
					<Button block style={ValidationCss.btn} onPress={() => this.props.navigation.navigate('Home')}>
						<Icon 
							name='camera'
							type="font-awesome"
							 color="white"/>
						<Text style={{color: 'white'}}>Nouvelle facture</Text>
					</Button>
			</View>
			</React.Fragment>
		);
	}
}


