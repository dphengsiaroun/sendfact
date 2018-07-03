import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TextInput,
    Modal
} from "react-native";

import { Camera, Permissions, FileSystem } from 'expo';

import ImageViewer from 'react-native-image-zoom-viewer';

import { Container, Content, Header, Item, Left, Right, Title, Body, Form, Textarea, Input, Label, Button } from 'native-base';
import { Icon } from 'react-native-elements';

class ImagePreview extends Component {

   constructor(props) {
        super(props);
        this.state = {
            ModalVisibleStatus: false,
            comment: '' 
        };
        console.log('props', this.props)
   }

    newComment() {
        console.log('New comment');
        this.setState({ModalVisibleStatus: !this.state.ModalVisibleStatus});   
    }

    addComment() {
        console.log('Add comment');
        this.setState({ModalVisibleStatus: !this.state.ModalVisibleStatus});        
    }

    renderViewModal() {
        return (
            <Modal
                style={{ backgroundColor: '#000'}}
                visible={this.state.ModalVisibleStatus}
                transparent={false}
                onRequestClose={ () =>  this.ShowModalFunction() }>
                <View style={{ backgroundColor: '#fff'}}>
                    <Header style={{ backgroundColor: 'hsla(46, 84%, 61%, 1)'}}>
                        <Left>
                            <Button transparent
                                onPress={() => this.setState({ ModalVisibleStatus: !this.state.ModalVisibleStatus })}>
                                <Icon 
                                    name="angle-left"
                                    type='font-awesome'
                                    color="white"
                                    size={30}/>
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{color: 'white', fontSize: 15}}>Commentaire</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <Form style={{paddingHorizontal: 20, paddingTop: 30, paddingBottom: 25}}>
                        <Label 
                        style={{
                            fontSize: 14, 
                            color: '#8996A0',
                            marginBottom: 15
                        }}>Ecrivez votre commentaire</Label>
                        <TextInput
                            multiline = {true}
                            style={{
                                minHeight: 40, 
                                width: '100%', 
                                fontSize: 18, 
                                fontWeight: '600',
                                paddingBottom: 10,
                                marginBottom: 30,
                                borderWidth: 1,
                                borderTopWidth: 0,
                                borderLeftWidth: 0,
                                borderRightWidth: 0,
                                borderBottomColor: '#efefef',
                                color: '#000'}}/>
                        <Button
                            rounded
                            block
                            style={{
                                paddingHorizontal: 5
                            }}
                            onPress={() => this.addComment()}>
                            <Text 
                            style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>Ajouter</Text>
                        </Button>
                    </Form>
                </View>
            </Modal>
        );
    }

    render() {
        const { navigation } = this.props;
        const imagePath = navigation.state.params.imagePath;
        console.log('navigation', navigation.state.params.imagePath);
        console.log('this.props', this.props, this.state);
        const images = [ { url: imagePath} ];

        return (
            <View style={{ flex: 1 }}>
                <Container>
                    <Header style={{ backgroundColor: 'hsla(46, 84%, 61%, 1)'}}>
                        <Left>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={{
                                width: 35,
                                height: 35,
                                marginLeft: 5
                            }}
                        />
                        <Text 
                            style={{
                                position: 'absolute',
                                left: 50,
                                top: 6,
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 17
                            }}>SendFact</Text>
                        </Left>
                        <Right>
                        <Icon
                            name="menu"
                            type="feather"
                            color="white"
                            onPress={() => this.props.navigation.openDrawer()}/> 
                        </Right>
                    </Header>
                    <ImageViewer style={{height: 400, marginHorizontal: 10, marginTop: 10, marginBottom: 90}} renderIndicator={() => null} imageUrls={images}/>
                    {this.renderViewModal()}
                    <View style={{ 
                            flexDirection: 'row', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            paddingVertical: 20, 
                            paddingHorizontal: 10,
                            position: 'absolute', 
                            backgroundColor: 'white',
                            left: 0, 
                            bottom: 0, 
                            right: 0, 
                            zIndex: 100, 
                        }}>
                            <Button transparent onPress={() => this.props.navigation.navigate('Camera')}>                    
                                <Icon
                                    raised
                                    name="chevron-left"
                                    type='feather'
                                    color="#828282"
                                    size={25}
                                />
                            </Button>                        
                            <Button transparent onPress={() => this.newComment()}>
                                <Icon
                                    raised
                                    name="pencil"
                                    type="font-awesome"
                                    color="#828282"
                                    size={25}
                                /> 
                            </Button>                        
                            <Button transparent onPress={() => this.props.navigation.navigate("Validation")}>
                                <Icon
                                    reverse
                                    raised
                                    name="paper-plane"
                                    type="entypo"
                                    color="#1766FB"
                                    size={25}
                                />
                            </Button>
                    </View>
                </Container>
            </View>
        );
    }
}

export default ImagePreview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});