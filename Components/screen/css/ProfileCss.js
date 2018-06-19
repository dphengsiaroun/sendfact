import { StyleSheet } from 'react-native';

const ProfileCss = StyleSheet.create({
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
	},
    name: {
		color: '#222',
		fontSize: 25,
		marginBottom: 30
	},
	btn: {
		backgroundColor: '#2488ff',
		margin: 10
	},
	btnDanger: {
		backgroundColor: '#d9534f',
		margin: 10
	},
	btnWarning: {
		backgroundColor: '#EFAD57',
		margin: 10
	}
	
});

export default ProfileCss;