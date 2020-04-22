import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TextInput} from 'react-native';
import {CustomButtonLarge} from './common/'
import firebase from '../database/firebase';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordAgain: ''
        }
    }

    registerUser() {
        const {email, password, passwordAgain} = this.state;

        if (!email || !password || !passwordAgain) {
            alert("Lütfen boş alan bırakmayınız.");
        } else {
            if (password == passwordAgain) {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    this.setState({
                        email: '',
                        password: '',
                        passwordAgain: ''
                    });
            
                    this.props.navigation.navigate('Login');
                    alert('Kayıt başarılı. Şimdi giriş yapabilirsiniz.');
                })
                .catch((error) => {
                    this.setState({
                        email: '',
                        password: '',
                        passwordAgain: ''
                    });
                    alert('Bir hata oluştu. Lütfen tekrar deneyiniz.');
                });
            } else {
                this.setState({
                    password: '',
                    passwordAgain: ''
                });
                alert("Şifreler aynı değil. Lütfen tekrar deneyiniz.")
            }
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
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={'Şifre (Tekrar)'}
                        placeholderTextColor={"#C97900"}
                        secureTextEntry
                        onChangeText={(text) => {
                            this.setState({
                                passwordAgain: text
                            })
                        }}
                    />
                </View>                
                <CustomButtonLarge
                    title={'Kayıt Ol'}
                    width={300}
                    height={'30%'}
                    onPress={this.registerUser.bind(this)}
                />
                <Text style={styles.textStyle}>
                    Hesabınız var mı? <Text style={{fontWeight: 'bold'}} onPress={() => this.props.navigation.navigate('Login')}>Giriş yapın.</Text>
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

export default RegisterPage;