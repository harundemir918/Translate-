import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TextInput} from 'react-native';
import {CustomButtonLarge} from './common/'
import firebase from '../database/firebase';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    userLogin() {
        const {email, password} = this.state;

        if (!email || !password) {
            alert("Lütfen boş alan bırakmayınız.");
        } else {
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                this.setState({
                    email: '',
                    password: ''
                });
        
                this.props.navigation.navigate('Translate');
            })
            .catch((error) => {
                this.setState({
                    password: ''
                });

                alert('Email ya da şifre yanlış.', 'Hata');
            });            
        }
    }

    render() {
        return (
            <View style={styles.body}>
                <Image
                style={styles.logo}
                source={require('../../assets/images/translate.png')}
                resizeMode='contain' />
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Email'}
                        placeholderTextColor={"#C97900"}
                        keyboardType={'email-address'}
                        onChangeText={(text) => {
                            this.setState({
                                email: text
                            })
                        }}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={'Şifre'}
                        placeholderTextColor={"#C97900"}
                        secureTextEntry
                        onChangeText={(text) => {
                            this.setState({
                                password: text
                            })
                        }}
                        value={this.state.password}
                    />
                </View>                
                <CustomButtonLarge
                    title={'Giriş Yap'}
                    onPress={this.userLogin.bind(this)}
                />
                <Text style={styles.textStyle}>
                    Hesabınız yok mu? <Text style={{fontWeight: 'bold'}} onPress={() => this.props.navigation.navigate('Register')}>Kayıt olun.</Text>
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 50,
        marginTop: 100,
        alignSelf: 'center'
    },
    body: {
        backgroundColor: '#000839',
        color: 'white',
        flex: 1
    },
    input: {
        width: 300,
        height: 50,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#FFA41B',
        color: '#FFA41B',
        alignSelf: 'center',
        marginTop: 20,
        paddingStart: 20
    },
    inputView: {
        marginTop: 100
    },
    textStyle: {
        color: '#FFA41B',
        alignSelf: 'center',
        marginTop: 20
    }
})

export default LoginPage;