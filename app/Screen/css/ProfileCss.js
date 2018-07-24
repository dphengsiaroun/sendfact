import {
	StyleSheet
} from 'react-native';

const ProfileCss = StyleSheet.create({
	header: {
		backgroundColor: '#338F2F'
	},
	titleHeader: {
		color: 'white',
		fontFamily: 'ArialRoundedMTBold'
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
		width: 90,
		height: 90,
		marginBottom: 10
	},
	text: {
		fontWeight: 'bold',
		fontSize: 30,
		color: '#222',
		fontFamily: 'ArialRoundedMTBold'
	},
	name: {
		color: '#222',
		fontSize: 20,
		marginBottom: 30,
		fontFamily: 'ArialRoundedMTBold'
	},
	btn: {
		backgroundColor: '#338F2F',
		margin: 5
	},
	textBtn: {
		color: 'white',
		fontFamily: 'ArialRoundedMTBold'
	},
	btnDanger: {
		backgroundColor: '#d9534f',
		margin: 5
	},
	btnWarning: {
		backgroundColor: '#fcc324',
		margin: 5
	}

});

export default ProfileCss;