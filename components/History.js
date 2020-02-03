import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Dimensions, SafeAreaView } from 'react-native';

 export default function History() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ImageBackground source={require('../assets/background.png')} style={styles.container}>
                <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
                    <Text>aa</Text>
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
})