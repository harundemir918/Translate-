import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from 'react-native';
import {CustomButton, PickerButton} from './common';
import axios from 'axios';
import firebase from '../database/firebase';
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';

class TranslatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      output: '',
      sourceLang: 'tr',
      destinationLang: 'en',
      sourceTitle: 'Türkçe',
      destinationTitle: 'İngilizce',
      sourceVoice: 'tr_TR',
      destinationVoice: 'en_US',
      sourcePickerDisplayed: false,
      destinationPickerDisplayed: false
    }

    this.translate = this.translate.bind(this);
    this.setSourceLanguage = this.setSourceLanguage.bind(this);
    this.setDestinationLanguage = this.setDestinationLanguage.bind(this);
    Voice.onSpeechResults = (res) => {
      this.setState({
        input: JSON.stringify(res["value"][0])
      })
      this.translate();
      console.log(JSON.stringify(res["value"]))
    };
  }
  
  setSourceLanguage(sLang, sTitle, sVoice) {
    this.setState({
      sourceLang: sLang,
      sourceTitle: sTitle,
      sourceVoice: sVoice
    })
    console.log('Source Language: ' + this.state.sourceLang);
    this.toggleSourcePicker();
    
  }

  setDestinationLanguage(dLang, dTitle, dVoice) {
    this.setState({
      destinationLang: dLang,
      destinationTitle: dTitle,
      destinationVoice: dVoice
    })
    console.log('Destination Language: ' + this.state.destinationLang);
    this.toggleDestinationPicker();
    
  }

  toggleSourcePicker() {
    this.setState({
      sourcePickerDisplayed: !this.state.sourcePickerDisplayed
    })
  }

  toggleDestinationPicker() {
    this.setState({
      destinationPickerDisplayed: !this.state.destinationPickerDisplayed
    })
  }

  translate() {
    const key = '' // removed the key because of security stuff
    const translateText = this.state.input;
    const sourceLang = this.state.sourceLang;
    const destinationLang = this.state.destinationLang;
    axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + key 
    + '&text=' + translateText 
    + '&lang=' + sourceLang +'-' + destinationLang)
        .then(response => {
            const translateResult = response.data.text;
            this.setState({
                output: translateResult
            })
        });

        //Tts.voices().then(voices => console.log(voices));
  }
  sourceLangSpeak() {
    Tts.getInitStatus().then(() => {
      Tts.setDefaultLanguage(this.state.sourceVoice);
      Tts.speak(JSON.stringify(this.state.input));
    });
  }
  destinationLangSpeak() {
    Tts.getInitStatus().then(() => {
      Tts.setDefaultLanguage(this.state.destinationVoice);
      Tts.speak(JSON.stringify(this.state.output));
    });
  }
  listen() {
    Voice.start(this.state.sourceVoice);
  }
  showInfo() {
    Alert.alert(
      'Translate!',
      'Tasarım: Harun Demir\nKodlama: Harun Demir\n2020',
      [
        
      ],
      {cancelable: true},
    );
  }
  render() {
    const languages = [
      {
        title: 'Türkçe',
        value: 'tr',
        voice: 'tr_TR'
      },
      {
        title: 'İngilizce',
        value: 'en',
        voice: 'en_US'
      },
      {
        title: 'Almanca',
        value: 'de',
        voice: 'de_DE'
      },
      {
        title: 'Fransızca',
        value: 'fr',
        voice: 'fr_FR'
      },
      {
        title: 'İtalyanca',
        value: 'it',
        voice: 'it_IT'
      },
      {
        title: 'İspanyolca',
        value: 'es',
        voice: 'es_ES'
      },
      {
        title: 'Lehçe',
        value: 'pl',
        voice: 'pl_PL'
      },
      {
        title: 'Rusça',
        value: 'ru',
        voice: 'ru_RU'
      }
    ]
    
    return (
      <SafeAreaView style={styles.body}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View>
            <View style={styles.header}>
              <Image
                style={styles.logo}
                source={require('../../assets/images/translate.png')}
                resizeMode='contain' />
              <View style={styles.headerButtons}>
                <TouchableOpacity
                onPress={() => {
                  this.showInfo();}}>
                <Image
                  style={styles.info}
                  source={require('../../assets/images/info.png')}
                  resizeMode='contain'
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  firebase.auth().signOut();
                  this.props.navigation.navigate('Login');}}>
                <Image
                  style={styles.logout}
                  source={require('../../assets/images/logout.png')}
                  resizeMode='contain'
                />
              </TouchableOpacity>
              </View>
            </View>            
            <View style={styles.horizontalLine}></View>
            <View style={styles.outputViewStyle}>
              <TextInput
                style={styles.input}
                multiline={true}
                placeholder={'Kelime ya da metin giriniz'}
                placeholderTextColor={"#C97900"}
                onChangeText={(text) => {
                  this.setState({
                    input: text
                  })
                }}
                value={this.state.input} />
                <View style={styles.verticalLine}></View>
                <TouchableOpacity
                  style={{marginTop: 5}}
                  onPress={() => {
                    this.sourceLangSpeak()}}>
                  <Image
                    style={styles.speaker}
                    source={require('../../assets/images/speaker.png')}
                    resizeMode='contain'
                  />
              </TouchableOpacity>
            </View>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginStart: 10, marginEnd: 10}}>
              <PickerButton
                title={this.state.sourceTitle}
                onPress={() => this.toggleSourcePicker()}
              />
              <CustomButton
                title={'Çevir'}
                onPress={this.translate}
              />
              <PickerButton 
                title={this.state.destinationTitle}
                onPress={() => this.toggleDestinationPicker()}
              />
            </View>
            <View style={styles.outputViewStyle}>
              <ScrollView>
                <Text style={styles.textStyle} multiline={true}>{this.state.output}</Text>
              </ScrollView>
              <View style={styles.verticalLine}></View>
              <TouchableOpacity
                style={{marginTop: 5}}
                onPress={() => {
                  this.destinationLangSpeak()}}>
                <Image
                  style={styles.speaker}
                  source={require('../../assets/images/speaker.png')}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            </View>
            <View style={styles.micView}>
              <TouchableOpacity
                style={{marginTop: 5}}
                onPress={() => {
                  this.listen()}}>
                <Image
                  style={styles.mic}
                  source={require('../../assets/images/mic.png')}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            </View>            

            <Modal 
                animationType={'slide'} 
                visible={this.state.sourcePickerDisplayed} 
                transparent={true}>
                <View style={styles.pickerView}>
                    <Text style={styles.pickerHeader}>Lütfen bir dil seçin</Text>
                    {languages.map((value, index) => {
                        return <TouchableHighlight key={index} onPress={() => this.setSourceLanguage(value.value, value.title, value.voice)} style={styles.pickerItem}>
                            <Text style={{color: '#FFF'}}>{value.title}</Text>
                        </TouchableHighlight>
                    })}
                        
                    <TouchableHighlight onPress={() => this.toggleSourcePicker()} style={styles.pickerItem}>
                        <Text style={{color: '#A16100'}}>İptal</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
            <Modal 
                animationType={'slide'} 
                visible={this.state.destinationPickerDisplayed} 
                transparent={true}>
                <View style={styles.pickerView}>
                    <Text style={styles.pickerHeader}>Lütfen bir dil seçin</Text>
                    {languages.map((value, index) => {
                        return <TouchableHighlight key={index} onPress={() => this.setDestinationLanguage(value.value, value.title, value.voice)} style={styles.pickerItem}>
                            <Text style={{color: '#FFF'}}>{value.title}</Text>
                        </TouchableHighlight>
                    })}
                        
                    <TouchableHighlight onPress={() => this.toggleDestinationPicker()} style={styles.pickerItem}>
                        <Text style={{color: '#A16100'}}>İptal</Text>
                    </TouchableHighlight>
                </View>
            </Modal>    
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }  
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#000839',
  },
  body: {
    backgroundColor: '#000839',
    color: 'white',
    flex: 1
  },
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-around'
  },
  headerButtons: {
    width: 75,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  outputViewStyle: {
    width: '85%',
    height: 200,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#FFA41B',
    alignSelf: 'center',
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
  },
  textStyle: {
    height: 'auto',
    paddingTop: 20,
    paddingStart: 20,
    paddingEnd: 20,
    paddingBottom: 20,
    flex: 1,
    borderColor: '#FFA41B',
    color: '#FFA41B'
  },
  speaker: {
    width: 50,
    height: 40,
    alignSelf: 'flex-end',
    flex: 1
  },
  micView: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 20
  },
  mic: {
    width: 80,
    height: 80,
    alignSelf: 'center'
  },
  logo: {
    width: 150,
    height: 50,
    alignSelf: 'flex-start'
  },
  logout: {
    width: 32,
    height: 32
  },
  info: {
    width: 32,
    height: 32
  },
  horizontalLine: {
    borderBottomColor: '#FFA41B',
    borderBottomWidth: 1
  },
  verticalLine: {
    borderRightColor: '#FFA41B',
    borderRightWidth: 1
  },
  pickerView: {
    margin: 20, 
    backgroundColor: '#FFA41B',
    bottom: -20,
    left: -20,
    right: -20,
    position: 'absolute',
    borderRadius: 10
  },
  pickerHeader: {
      fontWeight: 'bold', 
      alignSelf: 'center'
  },
  pickerItem: {
      paddingTop: 4, 
      paddingBottom: 4, 
      alignItems: 'center'
  },
  input: {
      paddingStart: 20,
      paddingEnd: 20,
      paddingBottom: 20,
      color: '#FFA41B',
      textAlignVertical: 'top',
      flex: 1
  }
});

export default TranslatePage;
