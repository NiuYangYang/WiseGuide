/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import codePush from "react-native-code-push";
import QRCode from 'react-native-qrcode';
import SyanImagePicker from 'react-native-syan-image-picker';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const options = {
    imageCount: 4,             // 最大选择图片数目，默认6
    isCamera: true,            // 是否允许用户在内部拍照，默认true
    isCrop: false,             // 是否允许裁剪，默认false
    // CropW: ~~(SCREEN_WIDTH * 0.6),    // 裁剪宽度，默认屏幕宽度60%
    // CropH: ~~(SCREEN_HEIGHT * 0.6),    // 裁剪高度，默认屏幕宽度60%
    isGif: false,              // 是否允许选择GIF，默认false，暂无回调GIF数据
    showCropCircle: false,     // 是否显示圆形裁剪区域，默认false
    // circleCropRadius: SCREEN_WIDTH/2,  // 圆形裁剪半径，默认屏幕宽度一半
    showCropFrame: true,       // 是否显示裁剪区域，默认true
    showCropGrid: false,       // 是否隐藏裁剪区域网格，默认false
    quality: 90                // 压缩质量
};

type Props = {};

import {observer} from "mobx-react";
import Mmm from './Mmm'
import RemoteImageView from "./RemoteImageView";
import LinearGradient from 'react-native-linear-gradient'

@observer
export default class App extends Component<Props> {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            viewAppear: false,
            image: '1',
        };
    }

    componentDidMount() {
        Mmm.clearData();

        setTimeout( () => {
            this.setState({
                viewAppear: true,
            })
        }, 255)
    }

    _camera = () => {
        let _this = this;
        SyanImagePicker.openCamera(options,(err, photos) =>{
            if (!err) {
                console.log(photos)
                if(photos.length) {
                    _this.setState({image: photos[0].uri})
                }
            }
        })
    }

    _pickerHandle = () => {
        let _this = this;
        SyanImagePicker.asyncShowImagePicker(options)
            .then(photos => {
                // 选择成功
                console.log(photos)
                if(photos.length) {
                    _this.setState({image: photos[0].uri})
                }
            })
            .catch(err => {
                // 取消选择，err.message为"取消"
            })
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.welcome}>{Mmm.textImages}</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions}>{instructions}</Text>
                <RemoteImageView
                    style={{width:200,height:200}}
                    uri={'https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/space/pic/item/c2cec3fdfc039245371f353f8c94a4c27d1e255c.jpg?m=2'}
                    placeholder={require('./btn_normal.png')}//静态图片, 在remote图片未加载出来时的占位图片(默认背景图)
                />
                <Image source={{uri: this.state.image}} style={{width: 200, height: 200}}/>
                <TouchableOpacity style={{height: 50}} onPress={this._pickerHandle}>
                    <Text>选择图片</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height: 50}} onPress={this._camera}>
                    <Text>拍照</Text>
                </TouchableOpacity>
                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                    <Text style={styles.buttonText}>
                        Sign in with Facebook
                    </Text>
                </LinearGradient>
                <QRCode value={'二维码'} bgColor='#000' fgColor='#fff' size={165}/>
            </ScrollView>
        );
    }
}
App = codePush(App);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});
