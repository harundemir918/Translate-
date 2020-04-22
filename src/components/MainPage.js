import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {CustomButtonLarge} from './common/'

class MainPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.body}>
                <Image
                style={styles.logo}
                source={require('../../assets/images/translate.png')}
                resizeMode='contain' />
                <View style={styles.buttonStyle}>
                    <CustomButtonLarge
                        title={'Giriş Yap'}
                        onPress={() => this.props.navigation.navigate('Login')}
                    />
                    <CustomButtonLarge
                        title={'Kayıt Ol'}
                        onPress={() => this.props.navigation.navigate('Register')}
                    />
                </View>            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 250,
        height: 50,
        marginTop: 150,
        alignSelf: 'center'
    },
    body: {
        backgroundColor: '#000839',
        color: 'white',
        flex: 1
    },
    buttonStyle: {
        marginTop: 250
    }
})

export default MainPage;