import React, { Component } from 'react';
import { 
	View, 
	Text,
	Image,
	KeyboardAvoidingView,
	ActivityIndicator
} from 'react-native';
import { 
	Button, 
	Form, 
	Item, 
	Input, 
	Label, 
	Left, 
	Header, 
	Body, 
	Title, 
	Right 
} from 'native-base';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
// import { emailChanged, passwordChanged, loginUser } from '../actions';

import SigninSignUpCss from './css/SigninSignUpCss';
import ValidationCss from './css/ValidationCss';

class Activation extends Component {


	render() {
		console.log('SIGNIN: this.props', this.props);
		return (
			<React.Fragment>
			<Header style={{backgroundColor: '#338F2F'}}>
				<Left/>
				<Body>
					<Title style={{color: 'white', fontFamily: 'ArialRoundedMTBold'}}>Activation</Title>
				</Body>
				<Right>
					<Icon 
						name="menu"
						type='feather'
						color="white"
						onPress={() => this.props.navigation.openDrawer()}/>
				</Right>
			</Header>
				<View style={SigninSignUpCss.container}>
					<Text>Vérifier vos emails pour activer votre compte.</Text>
					<Button block rounded style={ValidationCss.btn} onPress={() => this.props.navigation.navigate('Home')}>
						<Icon 
							name="check"
							type="font-awesome"
							 color="white"/>
						<Text>C'est fait !</Text>
					</Button>
				</View>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading, isLoggedIn } = auth;
	return { email, password, error, loading, isLoggedIn };
};

export default connect(mapStateToProps, { })(Activation);
