import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Modal,
  TouchableHighlight
} from 'react-native';
import {CustomButton, CustomInput, PickerButton} from './common';
import axios from 'axios';

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
      sourcePickerDisplayed: false,
      destinationPickerDisplayed: false
    }

    this.translate = this.translate.bind(this);
    this.setSourceLanguage = this.setSourceLanguage.bind(this);
    this.setDestinationLanguage = this.setDestinationLanguage.bind(this);
  }
  
  setSourceLanguage(sLang, sTitle) {
    this.setState({
      sourceLang: sLang,
      sourceTitle: sTitle
    })
    console.log('Source Language: ' + this.state.sourceLang);
    this.toggleSourcePicker();
    
  }

  setDestinationLanguage(dLang, dTitle) {
    this.setState({
      destinationLang: dLang,
      destinationTitle: dTitle
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
    const key = 'trnsl.1.1.20200419T174241Z.6c57a84c93149a5a.132d34d5799d0891cd5bf09232cc6f56eb234fa2'
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
            console.log(response);
            console.log(this.state.sourceLang, this.state.destinationLang);
        });
  }
  
  render() {
    const languages = [
      {
        title: 'Türkçe',
        value: 'tr'
      },
      {
        title: 'İngilizce',
        value: 'en'
      },
      {
        title: 'Almanca',
        value: 'de'
      },
      {
        title: 'Fransızca',
        value: 'fr'
      },
      {
        title: 'İtalyanca',
        value: 'it'
      },
      {
        title: 'İspanyolca',
        value: 'es'
      },
      {
        title: 'Lehçe',
        value: 'pl'
      },
      {
        title: 'Rusça',
        value: 'ru'
      }
    ]
    
    return (
      <SafeAreaView style={styles.body}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View>
            <View style={{margin: 0}}>
              <Image
                style={styles.logo}
                source={require('../../assets/images/translate.png')}
                resizeMode='contain' />
            </View>            
            <View style={styles.horizontalLine}></View>
            <CustomInput
              placeholder={'Kelime ya da metin giriniz'}
              width={'85%'}
              height={200}
              multiline={true}
              onChangeText={(text) => {
                this.setState({
                  input: text
                })
              }}
            />
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
            
            <Text style={styles.textStyle}>{this.state.output}</Text>

            <Modal 
                animationType={'slide'} 
                visible={this.state.sourcePickerDisplayed} 
                transparent={true} 
                onRequestClose={() => console.log('Close was requested.')}>
                <View style={styles.pickerView}>
                    <Text style={styles.pickerHeader}>Lütfen bir dil seçin</Text>
                    {languages.map((value, index) => {
                        return <TouchableHighlight key={index} onPress={() => this.setSourceLanguage(value.value, value.title)} style={styles.pickerItem}>
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
                transparent={true} 
                onRequestClose={() => console.log('Close was requested.')}>
                <View style={styles.pickerView}>
                    <Text style={styles.pickerHeader}>Lütfen bir dil seçin</Text>
                    {languages.map((value, index) => {
                        return <TouchableHighlight key={index} onPress={() => this.setDestinationLanguage(value.value, value.title)} style={styles.pickerItem}>
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
  textStyle: {
    width: '85%',
    height: 200,
    borderWidth: 3,
    borderRadius: 10,
    paddingTop: 20,
    paddingStart: 20,
    paddingEnd: 20,
    paddingBottom: 20,
    borderColor: '#FFA41B',
    color: '#FFA41B',
    alignSelf: 'center',
    marginTop: 20
  },
  logo: {
    width: 150,
    height: 50,
    flex: 1,
    alignSelf: 'center'
  },
  horizontalLine: {
    borderBottomColor: '#FFA41B',
    borderBottomWidth: 1
  },
  pickerView: {
    margin: 20, 
    backgroundColor: '#FFA41B',
    bottom: 20,
    left: 20,
    right: 20,
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
  }
});

export default TranslatePage;
