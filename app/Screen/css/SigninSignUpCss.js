import { StyleSheet } from 'react-native';

const SigninSignUpCss = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		paddingLeft: 40,
		paddingRight: 40,
	},
	avatar: {
		width: 70,
		height: 70,
		marginBottom: 10
	},
	header: {
		fontSize: 20,
		// marginBottom: 60,
		color: '#222',
		fontWeight: 'bold',
		fontFamily: 'ArialRoundedMTBold'
	},
	item: {
		width: 230,
	},
	item2: {
		width: 230,
		marginBottom: 10,
	},
	textInput: {
		alignSelf: 'stretch',
		padding: 16,
		marginBottom: 20,
		backgroundColor: '#222',
		borderRadius: 30,
		fontFamily: 'ArialRoundedMTBold'
	},
	btn: {	
		backgroundColor: '#338F2F'
	},
	btnOutline: {
		marginTop: 10,
		borderColor: '#338F2F'
	}
});

export default SigninSignUpCss;