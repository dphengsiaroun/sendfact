import { StyleSheet } from 'react-native';

const SocialLoginCss = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		// paddingVertical: 130,
		// marginHorizontal: 10,
		// marginVertical: 10,
	},
	header: {
		fontSize: 24,
		// marginBottom: 60,
		color: '#222',
		fontWeight: 'bold'
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