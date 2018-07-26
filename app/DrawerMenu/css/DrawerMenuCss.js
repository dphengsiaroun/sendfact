import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';

const {width, height} = Dimensions.get('window');

const DrawerMenuCss = StyleSheet.create({
    menu: {
        flex: 1,
        width: 276,
        height: height,
        backgroundColor: '#f9f9f9'
    },
    container: {
        backgroundColor: '#338F2F',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // width: width / 2 + 92,
        paddingLeft: 20,
        paddingVertical: 20,
        paddingTop: 40
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 5
    },
    iconImage: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 55,
        fontFamily: 'ArialRoundedMTBold'
    },
    text: {
        color: '#8996A0',
        fontSize: 16,
        marginLeft: 15,
        fontFamily: 'ArialRoundedMTBold'
    },
    textWithIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderColor: '#efefef',
        borderBottomWidth: 1,        
    },
    withIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scrollContainer: {
        // width: width / 2 + 92,
    },
    rightIcon: {
        paddingRight: 20,
    },
    iconSignout: {
        marginRight: 10,
        paddingLeft: 20
    },
    item: {
        paddingVertical: 15,
        paddingLeft: 20,
        marginTop: 5,
    },
});

export default DrawerMenuCss;