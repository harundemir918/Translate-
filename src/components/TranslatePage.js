import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image
} from 'react-native';
import {CustomButton, CustomInput} from './components/common/'
import axios from 'axios';

class Translate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      output: ''
    }

    this.translate = this.translate.bind(this);
  }
  

  translate() {
    const key = 'trnsl.1.1.20200419T174241Z.6c57a84c93149a5a.132d34d5799d0891cd5bf09232cc6f56eb234fa2'
    const translateText = this.state.input;
    const sourceLang = 'de';
    const destinationLang = 'tr';
    axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + key 
    + '&text=' + translateText 
    + '&lang=' + sourceLang +'-' + destinationLang)
        .then(response => {
            const translateResult = response.data.text;
            this.setState({
                output: translateResult
            })
            console.log(response);
        });
  }
  
  render() {
    return (
      <SafeAreaView style={styles.body}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View>
            <View style={{margin: 0}}>
              <Image
                style={styles.logo}
                source={require('../assets/images/translate.png')}
                resizeMode='contain' />
            </View>            
            <View style={styles.horizontalLine}></View>
            <CustomInput
              placeholder={'Kelime ya da metin giriniz'}
              width={300}
              height={200}
              multiline={true}
              onChangeText={(text) => {
                this.setState({
                  input: text
                })
              }}
            />
            <CustomButton
              title={'Çevir'}
              onPress={this.translate}
              />
            <Text style={styles.textStyle}>{this.state.output}</Text>
            
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
    width: 300,
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
  }
});

export default Translate;
