import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [nameStorage, setNameStorage] = useState('');

  useEffect(() => {
    getDataStorage();
  }, []);
  const setData = async () => {
    try {
      await AsyncStorage.setItem('name', inputText);
      setNameStorage(inputText);
    } catch (error) {
      console.log(error);
    }
  };
  const getDataStorage = async () => {
    try {
      const name = await AsyncStorage.getItem('name');
      setNameStorage(name);
    } catch (error) {
      console.log(error);
    }
  };
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('name');
      setNameStorage('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {nameStorage ? <Text> Hola: {nameStorage}</Text> : null}
      <TextInput
        placeholder="Escribe tu nombre"
        style={styles.input}
        onChangeText={txt => setInputText(txt)}
      />
      <Button title="Save" color="#333" onPress={() => setData()} />
      {nameStorage ? (
        <TouchableHighlight
          onPress={() => removeData()}
          style={styles.btnRemove}>
          <Text style={styles.txtRemove}>Eliminar Nombre </Text>
        </TouchableHighlight>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#666',
    borderBottomWidth: 1,
    width: 300,
    height: 40,
  },
  btnRemove: {
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10,
  },
  txtRemove: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 300,
  },
});

export default App;
