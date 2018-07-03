import React, { Component } from 'react';
import { 
	StyleSheet, 
	Alert,
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
import { emailChanged, passwordChanged, loginUser } from '../actions';

import SigninSignUpCss from './css/SigninSignUpCss';

class Signin extends Component {
	onEmailChange(text) {
		this.props.emailChanged(text);
	}

	onPasswordChange(text) {
		this.props.passwordChanged(text);
	}

	onButtonPress() {
		const { email, password } = this.props;
		this.props.loginUser({ email, password });
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
			return <ActivityIndicator size="large" color="#efc848" />
		}

		return (
			<Button block rounded style={SigninSignUpCss.btn} onPress={this.onButtonPress.bind(this)}>
				<Text style={{color: '#fff'}}>Connexion</Text>
			</Button>
		);
	}

	render() {
		console.log('SIGNIN: this.state, this.props', this.state, this.props);
		return (
			<React.Fragment>
			<Header style={{backgroundColor: '#efc848'}}>
				<Left/>
				<Body>
					<Title style={{color: 'white'}}>Connexion</Title>
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
					<Image style={SigninSignUpCss.avatar} source={require('../img/user.png')} />
					<Text style={SigninSignUpCss.header}>Connexion</Text>
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
						<Button transparent style={SigninSignUpCss.btnOutline} onPress={() => this.props.navigation.navigate('Signup')}>
							<Text style={{color: '#2488ff'}}>Pas encore de compte ? S'inscrire.</Text>
						</Button>
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

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(Signin);
