import { StyleSheet } from 'react-native';

const ValidationCss = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		paddingLeft: 40,
		paddingRight: 40,
	},
	avatar: {
		width: 80,
		height: 80,
		marginBottom: 30
	},
    text: {
		fontWeight: 'bold',
		fontSize: 30,
		color: '#222',
		marginTop: 20
	},
    name: {
		color: '#222',
		fontWeight: 'bold',
		fontSize: 30,
		marginBottom: 40
	},
	btn: {
		backgroundColor: '#2488ff',
		margin: 10
	},
	
});

export default ValidationCss;