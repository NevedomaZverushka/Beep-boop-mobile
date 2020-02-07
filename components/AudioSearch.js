import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, ScrollView, Dimensions, PermissionsAndroid } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { connect } from 'react-redux';
import { Audio } from 'expo-av';

const soundObject = new Audio.Sound();

class AudioSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
        }
    }

    async handleFile() {
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: "audio/*",
            });
            if (res.type === "cancel") {
                this.props.updateFile(null);
            }
            else {
                this.props.updateFile(res);
                await soundObject.loadAsync(this.props.file);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async onPlay() {
        try {
            await soundObject.playAsync();
            this.setState({ playing: true })
        }
        catch (err) {
            console.log(err);
        }
    }
    async onPause() {
        try {
            await soundObject.pauseAsync();
            this.setState({ playing: false })
        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={{ flex: 1, flexDirection: 'column' }}>

                    <View style={styles.container}>
                        <Image source={require('../assets/audio.png')} style={styles.img} />
                        <Text style={styles.title}>Пошук за допомогою <Text style={styles.span}>запису</Text></Text>

                        <View style={[
                            this.props.file !== null && { width: 0, height: 0 },
                            { flex: 1, flexDirection: 'row', marginBottom: 10 }
                        ]}>
                            <View style={[styles.slide, { flex: 0.5 }]}>
                                <Text style={styles.paragraph}>Завантаж файл:</Text>
                                <TouchableWithoutFeedback onPress={this.handleFile.bind(this)}>
                                    <Text style={styles.btnRed}>Завантажити</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={[styles.slide, { flex: 0.5 }]}>
                                <Text style={styles.paragraph}>Зроби аудіозапис:</Text>
                                <TouchableWithoutFeedback onPress={() => alert('hello')}>
                                    <Text style={styles.btnRed}>Почати запис</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>

                        <View style={[this.props.file === null && { width: 0, height: 0 }, { flex: 1, flexDirection: 'row' }]} >
                            {
                                this.state.playing
                                ?
                                    <TouchableWithoutFeedback onPress={this.onPause.bind(this)} style={{ flex: 0.1 }}>
                                        <Text style={{ padding: 1, color: '#ff6666', fontSize: 20, fontWeight: 'bold', textAlignVertical: 'center' }}>
                                        &#124;  &#124;
                                        </Text>
                                    </TouchableWithoutFeedback>
                                :
                                    <TouchableWithoutFeedback onPress={this.onPlay.bind(this)} style={{ flex: 0.1 }}>
                                        <Text style={{ color: '#ff6666', fontSize: 39, textAlignVertical: 'center' }}>
                                            &#9655;
                                        </Text>
                                    </TouchableWithoutFeedback>
                            }
                            <Text style={{ fontSize: 20, textAlignVertical: 'center', flex: 0.8, textAlign: 'center' }}>
                                {this.props.file ? this.props.file.name : null}
                            </Text>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this.props.updateFile(null);
                                    soundObject.unloadAsync();
                                }}
                                style={{ flex: 0.1 }}
                            >
                                <Text style={{ color: '#ff6666', fontSize: 40, textAlignVertical: 'center' }}>
                                    &#10005;
                                </Text>
                            </TouchableWithoutFeedback>
                        </View>

                        <TouchableWithoutFeedback onPress={() => alert('hello')}>
                            <Text style={styles.btnBlue}>Надіслати</Text>
                        </TouchableWithoutFeedback>
                    </View>

                </ScrollView>
            </View>
        )
    }
}

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        width: screenWidth - 40,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    img: {
        width: screenWidth - 85,
        height: (screenWidth - 85) * 0.66,
        marginBottom: 10,
    },
    title: {
        color: '#5a78ed',
        fontSize: 25,
        textAlign: "center",
        fontWeight: 'bold',
        margin: 5,
    },
    span: {
        textTransform: 'uppercase',
        color: '#ff6666',
    },
    paragraph: {
        textAlign: 'center',
        margin: 10,
        color: 'black',
        fontSize: 18,
    },
    btnRed: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#ff6666',
        margin: 5,
        borderWidth: 2,
        borderColor: '#ff6666',
        padding: 9,
        textAlignVertical: 'center',
    },
    btnBlue: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#5a78ed',
        margin: 10,
        borderWidth: 2,
        borderColor: '#5a78ed',
        padding: 10,
    },
})

function mapDispatchToProps(dispatch) {
    return {
        updateFile: (file) => dispatch({ type: 'UPDATE_FILE', file: file }),
    }
}

function mapStateToProps(state) {
    return {
        file: state.file,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioSearch)