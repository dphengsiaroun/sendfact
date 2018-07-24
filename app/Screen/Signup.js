import React, { Component } from 'react';
import { 
	ActivityIndicator,
	View, 
	Text,
	Image,
	KeyboardAvoidingView,
	AsyncStorage,
	Alert
} from 'react-native';
import {
	Button, 
	Form, 
	Item, 
	Input, 
	Label, 
	Header, 
	Left, 
	Right, 
	Body, 
	Title 
} from 'native-base';
import { Icon } from 'react-native-elements';
import Firebase from 'firebase';

import { connect } from 'react-redux';
import { emailChanged, passwordChanged, signupUser } from '../actions';

import SigninSignUpCss from './css/SigninSignUpCss';

class Signup extends Component {

	onEmailChange(text) {
		this.props.emailChanged(text);
	}

	onPasswordChange(text) {
		this.props.passwordChanged(text);
	}

	onButtonPress() {
		const { email, password } = this.props;
		this.props.signupUser({ email, password });
	}

	renderError() {
		if (this.props.error) {
			return (
				<View style={{padding: 10, marginBottom: 10, borderRadius: 5}}>
					<Text style={{color: 'red', textAlign: 'center', fontSize: 15}}>
						{this.props.error}
					</Text>
				</View>
			)
		}
	}

	renderButton() {
		if (this.props.loading) {
			return <ActivityIndicator size="large" color="#338F2F" />
		}

		return (
			<Button block rounded style={SigninSignUpCss.btn} onPress={this.onButtonPress.bind(this)}>
				<Text style={{color: '#fff'}}>Connexion</Text>
			</Button>
		);
	}

	render() {
		console.log('SIGNUP: this.props', this.props);
		return (
			<React.Fragment>
			<Header style={{backgroundColor: '#338F2F'}}>
				<Left>
					<Icon 
						name="angle-left"
						type='font-awesome'
						color="white"
						size={30}
						onPress={() => this.props.navigation.goBack()}/>
				</Left>
				<Body>
					<Title style={{color: 'white', fontFamily: 'ArialRoundedMTBold'}}>S'inscrire</Title>
				</Body>
				<Right>
					<Icon 
						name="menu"
						type='feather'
						color="white"
						onPress={() => this.props.navigation.openDrawer()}/>
				</Right>
			</Header>
			<KeyboardAvoidingView behavior='padding' style={SigninSignUpCss.wrapper}>
				<View style={SigninSignUpCss.container}>
					<Image style={SigninSignUpCss.avatar} source={require('../img/user-add.png')} />
					<Text style={SigninSignUpCss.header}>S'inscrire</Text>
					<Form>
						<Item style={SigninSignUpCss.item} floatingLabel>
							<Label style={{color: 'grey'}}>Email</Label>
							<Input 
								style={{color: 'grey'}} 
								onChangeText={this.onEmailChange.bind(this)} 
								value={this.props.email}/>
						</Item>
						<Item style={SigninSignUpCss.item2} floatingLabel last>
							<Label style={{color: 'grey'}}>Mot de passe</Label>
							<Input 
								style={{color: 'grey'}} 
								secureTextEntry={true} 
								onChangeText={this.onPasswordChange.bind(this)} 
								value={this.props.password}/>
						</Item>
						{this.renderError()}
						{this.renderButton()}
					</Form>
				</View>
			</KeyboardAvoidingView>
		</React.Fragment>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading, isLoggedIn } = auth;
	return { email, password, error, loading, isLoggedIn };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, signupUser })(Signup);