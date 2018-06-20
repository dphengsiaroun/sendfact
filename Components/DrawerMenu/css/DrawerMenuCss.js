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
    avatarContainer: {
        backgroundColor: 'hsla(46, 84%, 61%, 1)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // width: width / 2 + 92,
        paddingLeft: 20,
        paddingVertical: 20,
        paddingTop: 40
    },
    avatar: {
        width: 45,
        height: 45,
        marginRight: 5
    },
    avatarImage: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profile: {
        color: '#fff',
        fontSize: 23,
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 55
    },
    text: {
        color: '#222',
        fontSize: 17,
        marginLeft: 10
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
    iconWithText: {
        marginRight: 10,
        paddingLeft: 20
    },
    item: {
        paddingVertical: 15,
        paddingLeft: 20,
        marginTop: 5,
    },
    itemSelected: {
        borderLeftWidth: 7,
        borderColor: 'hsla(46, 84%, 61%, 1)'
    },
    noSelectedItems: {
        paddingVertical: 15,
        paddingLeft: 25,
        marginTop: 5,
    }
});

export default DrawerMenuCss;