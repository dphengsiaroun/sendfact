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
	headerCard: {
		paddingVertical: 10, 
		backgroundColor: '#338F2F',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		marginHorizontal: 10,
		marginTop: 40
	},
	textHeaderCard: {
		fontSize: 15, 
		paddingLeft: 10, 
		color: 'white',
		fontFamily: 'ArialRoundedMTBold'
	},
	blocIconSocial: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: 'white',
		marginHorizontal: 10,
		paddingVertical: 20,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	footerCard: {
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		backgroundColor: 'white',
		paddingBottom: 20,
		paddingVertical: 20,
		marginHorizontal: 10
	},
	btnSigninFooterCard: {
		padding: 10,
		marginHorizontal: 15,
		marginVertical: 5,
		backgroundColor: '#338F2F'
	},
	textBtnSigninFooterCard: {
		color: '#fff', 
		fontSize: 16, 
		textAlign: 'center', 
		alignContent: 'center',
		fontFamily: 'ArialRoundedMTBold'
	},
	btnSignupFooterCard: {
		padding: 10,
		marginHorizontal: 15,
		marginVertical: 5,
		borderWidth: 1,
		borderColor: '#338F2F'
	},
	textBtnSignupFooterCard: {
		color: '#338F2F', 
		fontSize: 16, 
		textAlign: 'center', 
		alignContent: 'center',
		fontFamily: 'ArialRoundedMTBold'
	},
});

export default SocialLoginCss;