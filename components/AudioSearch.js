import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, ScrollView, Dimensions, Animated } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { connect } from 'react-redux';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';

import api from '../api'
import styles from './Styles/AudioSearchStyle'

var soundObject = new Audio.Sound();
const recording = new Audio.Recording();

class AudioSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            record: false,
            popUp: false,
        }

        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.togglePermission = this.togglePermission.bind(this);
        this.onPause = this.onPause.bind(this);
        this.onPlay = this.onPlay.bind(this);
        this.sendAudio = this.sendAudio.bind(this);
    }

    async componentWillUnmount() {
        this.props.updateFile(null);
        await soundObject.pauseAsync();
        await soundObject.unloadAsync();
        await recording.stopAndUnloadAsync();
    }

    async stopRecording() {
        try {
            this.setState({ record: false })
            await recording.pauseAsync();
            const info = await FileSystem.getInfoAsync(recording.getURI());
            await recording.stopAndUnloadAsync();
            this.props.updateFile(info);
            await soundObject.loadAsync(this.props.file);
        }
        catch (error) {
            console.log(error)
        }
    }
    async startRecording() {
        try {
            this.setState({ record: true })
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setInterval(function() {
                console.log('here')
                if (styles.btnStop.opacity == 1) {
                    styles.btnStop.opacity = 0.5
                }
                else {
                    styles.btnStop.opacity = 1
                }
            }, 2000)
            setTimeout(function() {
                this.stopRecording();
            }.bind(this), 20000);
        }
        catch (error) {
            console.log(error)
        }
    }
    async togglePermission() {
        const { status } = await Permissions.getAsync(Permissions.AUDIO_RECORDING)
        if (status === 'granted') {
            this.startRecording();
        }
        else {
            const { askStatus } = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
            if (askStatus === 'granted') {
                this.startRecording();
            }
            else {
                return;
            }
        }
    }
    async handleFile() {
        try {
            const res = await DocumentPicker.getDocumentAsync({ type: "audio/*", });
            if (res.type === "cancel") {
                this.props.updateFile(null);
            }
            else {
                if (res["size"] > 10485760) {
                    this.props.updateFile(res);
                    await soundObject.loadAsync(this.props.file);
                }
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
            var status = await soundObject.getStatusAsync();
            while(status.isPlaying != false) {
                status = await soundObject.getStatusAsync();
            }
            this.onPause();
            await soundObject.setPositionAsync(0);
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
    sendAudio() {
        if (!this.props.file) {
            return;
        }
        var file = this.props.file
        var formData = new FormData();
        formData.append("file", file);
        api.sendAudio(formData)
            .then((response) => {
                if (response.status === 200 && response.data.status === "success") {
                    let generalized = api.generalizeResponse(response.data)
                    this.props.updateSong(generalized.result && generalized.result.length > 0 ? generalized.result[0] : false)
                    this.props.toggleSpinner();
                }
            })
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
                                <TouchableWithoutFeedback onPress={this.handleFile}>
                                    <Text style={styles.btnRed}>Завантажити</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={[styles.slide, { flex: 0.5 }]}>
                                <Text style={styles.paragraph}>Зроби аудіозапис:</Text>
                                <View>
                                    {
                                        this.state.record
                                        ? 
                                            <TouchableWithoutFeedback onPress={this.stopRecording} style={{ flex: 1 }}>
                                                <Text style={styles.btnStop}>Стоп</Text>
                                            </TouchableWithoutFeedback>
                                        :
                                            <TouchableWithoutFeedback onPress={this.togglePermission} style={{ flex: 1 }}>
                                                <Text style={styles.btnRed}>Почати запис</Text>
                                            </TouchableWithoutFeedback>
                                    }
                                </View>
                            </View>
                        </View>

                        <View style={[this.props.file === null && { width: 0, height: 0 }, { flex: 1, flexDirection: 'row' }]} >
                            {
                                this.state.playing
                                ?
                                    <TouchableWithoutFeedback onPress={this.onPause} style={{ flex: 0.1 }}>
                                        <Text style={{ padding: 1, color: '#ff6666', fontSize: 20, fontWeight: 'bold', textAlignVertical: 'center' }}>
                                        &#124;  &#124;
                                        </Text>
                                    </TouchableWithoutFeedback>
                                :
                                    <TouchableWithoutFeedback onPress={this.onPlay} style={{ flex: 0.1 }}>
                                        <Text style={{ color: '#ff6666', fontSize: 39, textAlignVertical: 'center' }}>
                                            &#9655;
                                        </Text>
                                    </TouchableWithoutFeedback>
                            }
                            <Text style={{ fontSize: 20, textAlignVertical: 'center', flex: 0.8, textAlign: 'center' }}>
                                { this.props.file ? this.props.file.name ? this.props.file.name : "Голосовий запис" : null }
                            </Text>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this.props.updateFile(null);
                                    soundObject.unloadAsync();
                                    recording.stopAndUnloadAsync();
                                }}
                                style={{ flex: 0.1 }}
                            >
                                <Text style={{ color: '#ff6666', fontSize: 40, textAlignVertical: 'center' }}>
                                    &#10005;
                                </Text>
                            </TouchableWithoutFeedback>
                        </View>

                        <TouchableWithoutFeedback onPress={this.sendAudio}>
                            <Text style={styles.btnBlue}>Надіслати</Text>
                        </TouchableWithoutFeedback>
                    </View>

                </ScrollView>
            </View>
        )
    }
}

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


// TODO blicking