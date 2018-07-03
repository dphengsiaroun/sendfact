import React, { Component } from 'react';
import { 
	StyleSheet, 
	ImageBackground, 
	View,
	Image,
	Alert,
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
import { connect } from 'react-redux';


import ProfileCss from './css/ProfileCss';
import Firebase from 'firebase';

class Profile extends Component {

	render() {
		const { user } = this.props;
		console.log('PROFILE: user', user.user.email);
		const username = user.user.email;
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
					<Title style={{color: 'white'}}>Profil</Title>
				</Body>
				<Right>
					<Icon 
						name="menu"
						type='feather'
						color="white"
						onPress={() => this.props.navigation.openDrawer()}/>
				</Right>
			</Header>
			<View style={ProfileCss.container}>
				<Image style={ProfileCss.avatar} source={require('../img/user.png')} />				
				<Text style={ProfileCss.text}>Welcome</Text>
				<Text style={ProfileCss.name}>{username}</Text>
					<Button block rounded info style={ProfileCss.btn} onPress={() => this.props.navigation.navigate('Home')}>
						<Icon 
							name='camera'
							type="font-awesome" 
							color="white"/>
						<Text>Go to camera</Text>
					</Button>
					{/* <Button block style={ProfileCss.btnWarning} onPress={() => this.props.navigation.navigate('Signin')}>
						<Icon 
							name='cog' 
							type="font-awesome" 
							color="white"/>
						<Text>Edit my profile</Text>
					</Button>
					<Button block style={ProfileCss.btnDanger} onPress={() => this.props.navigation.navigate('Signin')}>
						<Icon 
							name='trash'
							type="font-awesome"
							color="white" />
						<Text>Delete my account</Text>
					</Button> */}
			</View>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	const { user, isLoggedIn } = auth;
	return { user, isLoggedIn };
};

export default connect(mapStateToProps)(Profile);


