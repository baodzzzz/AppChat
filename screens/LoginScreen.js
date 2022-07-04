import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { Component, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const LoginScreen = ({ navigation, route }) => {

    const [name, setName] = useState('');
    const onClick = () => {
        console.log('[name]',name)
        navigation.navigate('Chat', { name: name })
    }

    return (
        <View style={styles.container}>
            <View style={styles.circle}></View>
            {/* <View style={{ marginTop: 60 }}>
                    <Image source={require("../assets/chat.jpg")}
                        style={{ width: 100, height: 100, alignSelf: 'center' }} />
                </View> */}
            <View style={{ marginHorizontal: 32 }}>
                <Text style={styles.header}>Username</Text>
                <TextInput style={styles.inputText} placeholder='Enter Name'
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <View style={{ alignItems: 'flex-end', marginTop: 64 }}>
                    <TouchableOpacity style={styles.continue} onPress={() => onClick()}>
                        <Icon name='md-arrow-forward' size={30} color='#fff'></Icon>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F5F7',
    },
    circle: {
        width: 500,
        height: 500,
        borderRadius: 500 / 2,
        backgroundColor: '#fff',
        position: 'absolute',
        left: -120,
        top: -20
    },
    header: {
        fontWeight: '800',
        fontSize: 30,
        color: '#514E5A',
        marginTop: 32
    },
    inputText: {
        marginTop: 32,
        height: 50,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#BAB7C3',
        borderRadius: 30,
        paddingHorizontal: 16,
        color: '#514E5A',
        fontWeight: '600'
    },
    continue: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        backgroundColor: '#9075E3',
        alignItems: 'center',
        justifyContent: 'center'
    }
});