import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView
} from 'react-native';
import socketIOClient from 'socket.io-client';

const host = "http://10.0.2.2:3000"

const ChatScreen = ({ navigation ,route }) => {
  const [text, onChangeText] = React.useState("");
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState('');
  const [id, setId] = useState();
  

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host)

    socketRef.current.on('getId', data => {
      setId(data)
    })
    socketRef.current.on('sendDataServer', dataGot => {
      setMess(oldMsgs => [...oldMsgs, dataGot.data])
    })

    return () => {
      socketRef.current.disconnect();
    }
  }, []);

  const sendMessage = () => {
    if (message !== '') {
      const msg = {
        content: message,
        id: id
      }
      socketRef.current.emit('sendDataClient', msg)

      setMessage('')
    }
  }

  const renderMess = mess.map((m, index) =>
    <Text key={index} style={m.id === id ? styles.inputText : styles.inputText2}>
      {m.content}
    </Text>
  )
  const scrollViewRef = useRef();

  return (
    <View style={styles.container}>
      <Text style={{color: 'red'}}>{route.params.name}</Text>
      <View style={styles.circle}></View>
      <ScrollView style={styles.wrapMess}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={false}
      >{renderMess}</ScrollView>


      <View style={styles.container2}>
        <TextInput
          style={styles.input}
          onChangeText={setMessage}
          value={message}
          placeholder="your messages"
        />
        <Button
          title="Send"
          onPress={sendMessage}
          style={styles.buttonnew}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  container2: {
    width: '97%',
    flexDirection: 'row'
  },
  input: {
    backgroundColor: "#fff",
    width: '90%'
  },
  inputText: {
    margin: 5,
    color: '#fff',
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 10,
    alignSelf: 'flex-end'
  },
  inputText2: {
    color: '#fff',
    padding: 10,
    backgroundColor: "#868686",
    borderRadius: 10,
    alignSelf: 'flex-start'
  },
  wrapMess: {
    width: "100%",
    paddingBottom: 10,
  },
  buttonnew: {
    borderRadius: 20,
  },
  circle: {
    padding: 5,
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
    backgroundColor: '#fff',
    position: 'absolute',
    left: -120,
    top: -20
  },

})
export default ChatScreen;