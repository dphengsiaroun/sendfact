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

import SigninSignUpCss from './css/SigninSignUpCss';

export default class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			userIsConnected: false,
			errorMessage: null,
			loading: false,
		};
	}

	componentWillMount() {
		this.isAuthenticated().done();
	}

	isAuthenticated = async () => {
		const token = await AsyncStorage.getItem('currentUser');
		console.log('token', token);
		if (token) {
			this.setState({ userIsConnected: true });
			this.props.navigation.navigate('Profile');
			Alert.alert(
				'Connexion',
				'Vous êtes déjà connecté.',
			)
		}
	}

	renderButtonOrLoading() {
		if (this.state.loading) {
			return  <ActivityIndicator size="large" color="#efc848" />
		}
		return 	<Button block rounded style={SigninSignUpCss.btn} onPress={this.onSignUpPress.bind(this)}>
					<Text style={{color: 'white'}}>S'inscrire</Text>
				</Button>
	}


	onSignUpPress = () => {
		this.setState({ errorMessage: null, loading: true });
		const { email, password } = this.state;
   		Firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((response) => {
			console.log('response', response);
			if (this.state.errorMessage === null) {
				AsyncStorage.setItem('currentUser', response.user.l);
				this.setState({ errorMessage: null, loading: false })
				this.props.navigation.navigate('Camera');
			} 
		})
		.catch(error => {
			this.setState({ errorMessage: error.message, loading: false })
			console.log('error', error, this.state);
		});
	}

	render() {
		return (
			<React.Fragment>
			<Header style={{backgroundColor: '#efc848'}}>
				<Left>
					<Icon 
						name="angle-left"
						type='font-awesome'
						color="white"
						size={30}
						onPress={() => this.props.navigation.goBack()}/>
				</Left>
				<Body>
					<Title style={{color: 'white'}}>S'inscrire</Title>
				</Body>
				<Right>
					<Icon 
						name="menu"
						type='feather'
						color="white"
						onPress={() => this.props.navigation.navigate('DrawerOpen')}/>
				</Right>
			</Header>
			<KeyboardAvoidingView behavior='padding' style={SigninSignUpCss.wrapper}>
				<View style={SigninSignUpCss.container}>
					<Image style={SigninSignUpCss.avatar} source={require('../img/user-add.png')} />
					<Text style={SigninSignUpCss.header}>S'inscrire</Text>
					<Form>
						<Item style={SigninSignUpCss.item} floatingLabel>
							<Label style={{color: 'grey'}}>Email</Label>
							<Input style={{color: 'grey'}} onChangeText={(email) => this.setState({email})}/>
						</Item>
						<Item style={SigninSignUpCss.item2} floatingLabel last>
							<Label style={{color: 'grey'}}>Mot de passe</Label>
							<Input style={{color: 'grey'}} secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
						</Item>
						{this.state.errorMessage &&
						<Text style={{ color: 'red', marginBottom: 15}}>
							{this.state.errorMessage}
						</Text>}
						{this.renderButtonOrLoading()}
					</Form>
				</View>
			</KeyboardAvoidingView>
		</React.Fragment>
		);
	}
}
