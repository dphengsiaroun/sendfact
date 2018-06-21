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
import ImageZoom from 'react-native-image-pan-zoom';

import { Container, Content, Header, Item, Left, Right, Title, Body, Form, Textarea, Input, Label, Button } from 'native-base';
import { Icon } from 'react-native-elements';
import { relative } from "path";

class ImagePreview extends Component {

   constructor(props) {
        super(props);
        this.state = {
            ModalVisibleStatus: false,
            note: '' 
        };
        console.log('props', this.props)
   }

    addText() {
        console.log('Add Text');
        this.setState({ModalVisibleStatus: true});   
    }

    renderViewModal() {
        return (
            <Modal
                style={{ backgroundColor: '#000'}}
                visible={this.state.ModalVisibleStatus}
                transparent={true}
                onRequestClose={ () =>  this.ShowModalFunction() }>
                <View style={{ backgroundColor: '#fff', position:'absolute', bottom: 0, left: 0, right: 0}}>
                    {/* <Header style={{ backgroundColor: 'hsla(46, 84%, 61%, 1)'}}>
                        <Left>
                            <Button transparent
                                onPress={() => this.setState({ ModalVisibleStatus: false })}>
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
                    </Header> */}
                    <Button transparent
                        style={{
                            position: 'absolute',

                        }}
                        onPress={() => this.setState({ ModalVisibleStatus: false })}>
                        <Icon 
                            name="angle-left"
                            type='font-awesome'
                            color="black"
                            size={30}/>
                    </Button>
                    <Form style={{padding: 20}}>
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
                            onPress={() => console.log('hello')}>
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
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}/> 
                        </Right>
                    </Header>
                    {/* <ImageZoom 
                        cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height}
                       imageWidth={300}
                       imageHeight={400}
                       style={{position: 'absolute', top: 10}}
                    >
                        <Image style={{width:300, height:400}}
                            source={images}/>
                    </ImageZoom> */}
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
                            <Button transparent onPress={() => this.addText()}>
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