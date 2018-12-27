/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import codePush from "react-native-code-push";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

import {observer} from "mobx-react";
import Mmm from './Mmm'
import RemoteImageView from "./RemoteImageView";

@observer
export default class App extends Component<Props> {

    componentDidMount() {
        Mmm.clearData();
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{Mmm.textImages}</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions}>{instructions}</Text>
                <RemoteImageView
                    style={{width:200,height:200}}
                    uri={'https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/space/pic/item/c2cec3fdfc039245371f353f8c94a4c27d1e255c.jpg'}
                    placeholder={require('./btn_normal.png')}//静态图片, 在remote图片未加载出来时的占位图片(默认背景图)
                />
            </View>
        );
    }
}
App = codePush(App);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
});
