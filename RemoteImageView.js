import React, {Component} from 'react';
import {
    Image,
    ImageBackground,
    StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image'

/**
 * 示例

 <RemoteImageView
    style={{width:200,height:200}}
     uri={'https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/space/pic/item/c2cec3fdfc039245371f353f8c94a4c27d1e255c.jpg'}
     placeholder={require('../../../images/mq_bg.png')}//静态图片, 在remote图片未加载出来时的占位图片(默认背景图)
 />

 */
export default class RemoteImageView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loadSuccess: false,
        };
    }

    /**
     * 图片加载成功
     * @private
     */
    _onLoad = () => {
        this.setState({
            loadSuccess: true,
        })
    };

    _onLoadStart = () => {
        alert('_onLoadStart');
    };

    _onLoadEnd = () => {
        alert('_onLoadEnd');
    };


    render() {

        // 解构
        const {
            hidden,
            style,
            uri,
            placeholder,
        } = this.props;

        if (hidden)
            return null;

        let imgUrl=' ';
        if (Object.prototype.toString.call(uri) === '[object String]'
            && uri.length > 0){
            imgUrl=''+uri;
        }

        return (

            <ImageBackground
                style={style}
            >

                <FastImage
                    style={[style, styles.absoluteStyles]}
                    source={{uri:imgUrl}}
                    resizeMethod={'resize'}
                    onLoad={this._onLoad}
                />

                {
                    this.state.loadSuccess
                    ?
                        null
                        :
                        <Image
                            style={[style,styles.absoluteStyles]}
                            source={placeholder}
                            resizeMode={'contain'}
                        />
                }

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    absoluteStyles:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        marginTop:0,
        marginLeft:0,
        marginBottom:0,
        marginRight:0,
        paddingTop:0,
        paddingLeft:0,
        paddingBottom:0,
        paddingRight:0
    },
});