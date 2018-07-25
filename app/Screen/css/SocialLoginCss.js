import { StyleSheet } from 'react-native';

const SocialLoginCss = StyleSheet.create({
	header: { 
		backgroundColor: '#338F2F'
	},
	imgHeader: {
		width: 35,
		height: 35,
		marginLeft: 5
	},
	textHeader: {
		position: 'absolute',
		left: 50,
		top: 6,
		color: 'white',
		fontWeight: 'bold',
		fontSize: 17,
		fontFamily: 'ArialRoundedMTBold'
	},
	container: {
		flex: 1,
		justifyContent: 'center',
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
		borderRadius: 30
	},
});

export default SocialLoginCss;