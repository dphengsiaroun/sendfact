import React, { Component } from 'react';
import { 
	View, 
	Text,
	Image,
	ScrollView,
	ActivityIndicator
} from 'react-native';
import { 
	Button, 
	Left, 
	Header, 
	Body, 
	Title, 
	Right 
} from 'native-base';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
// import { emailChanged, passwordChanged, loginUser } from '../actions';

import SocialLoginCss from './css/SocialLoginCss';

class SocialLogin extends Component {


	render() {
		console.log('SIGNIN: this.props', this.props);
		return (
			<React.Fragment>
			<Header style={SocialLoginCss.header}>
				<Left>
					<Image
						source={require('../../assets/logo.png')}
						style={SocialLoginCss.imgHeader}/>
					<Text 
						style={SocialLoginCss.textHeader}>SENDFACT</Text>
				</Left>
				<Right>
					<Icon
						name="menu"
						type='feather'
						color="#fff"
						onPress={() => this.props.navigation.openDrawer()}/> 
				</Right>
			</Header>
			<ScrollView style={{flex: 1, backgroundColor: '#3DA937'}}>
				<View style={SocialLoginCss.container}>
					<View 
						style={SocialLoginCss.headerCard}>
						<Text 
							style={SocialLoginCss.textHeaderCard}>S'identifier avec Google ou Facebook</Text>
					</View>
					<View style={SocialLoginCss.blocIconSocial}>
						<Icon 
							reverse
							// raised
							name="google"
							type="font-awesome"
							color="#D44A35"
							size={30}
							onPress={() => this.props.navigation.navigate('Profile')}
							/>
						<Icon
							reverse
							name="facebook"
							type="font-awesome"
							color="#3C599B"
							size={30}
							onPress={() => this.props.navigation.navigate('Profile')}
							/>
					</View>
					{/* <Text 
						style={{
							paddingVertical: 30,
							color: '#828282',
							backgroundColor: 'white',
							textAlign: 'center',
							marginHorizontal: 10,
							fontSize: 16,
							fontFamily: 'ArialRoundedMTBold'
						}}>ou</Text> */}
					<View 
						style={SocialLoginCss.headerCard}>
						<Text 
							style={SocialLoginCss.textHeaderCard}>S'identifier manuellement</Text>
					</View>
					<View style={SocialLoginCss.footerCard}>
						<Button 
							block
							style={SocialLoginCss.btnSigninFooterCard} 
							onPress={() => this.props.navigation.navigate('Signin')}>
								<Text 
									style={SocialLoginCss.textBtnSigninFooterCard}>Connexion manuelle</Text>
						</Button>
						<Button 
							block
							transparent
							style={SocialLoginCss.btnSignupFooterCard} 
							onPress={() => this.props.navigation.navigate('Signup')}>
								<Text 
									style={SocialLoginCss.textBtnSignupFooterCard}>Inscription manuelle</Text>
						</Button>
					</View>
				</View>
			</ScrollView>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading, isLoggedIn } = auth;
	return { email, password, error, loading, isLoggedIn };
};

export default connect(mapStateToProps, { })(SocialLogin);
