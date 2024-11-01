import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { connect } from 'react-redux';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import AnimatedLoader from "react-native-animated-loader";
import Toast from 'react-native-simple-toast';

import api from '../api'
import styles from './Styles/AudioSearchStyle'
import RecognitionResponse from './RecognitionResponse';

var soundObject = new Audio.Sound();
var recording = new Audio.Recording();

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
        this.closePopUp = this.closePopUp.bind(this);
    }

    async componentWillUnmount() {
        this.props.updateFile(null);
        if ((await soundObject.getStatusAsync()).isLoaded) {
            await soundObject.stopAsync();
            await soundObject.unloadAsync();
        }
    }

    async stopRecording() {
        try {
            this.setState({ record: false })
            if ((await recording.getStatusAsync()).isRecording) {
                await recording.stopAndUnloadAsync();
            }
            const info = await FileSystem.getInfoAsync(recording.getURI());
            this.props.updateFile(info);
            if ((await soundObject.getStatusAsync()).isLoaded) {
                await soundObject.stopAsync();
                await soundObject.unloadAsync();
            }
            await soundObject.loadAsync(this.props.file);
        }
        catch (error) {
            console.log(error)
        }
    }
    async startRecording() {
        try {
            this.setState({ record: true })
            recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
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
                if (res["size"] < 10485760) {
                    this.props.updateFile(res);
                    await soundObject.loadAsync(this.props.file);
                }
                else {
                    Toast.show('Занадто великий розмір файлу!', Toast.LONG);
                }
            }
        }
        catch (err) {
            Toast.show('Сталася помилка. Спробуйте ще раз!', Toast.LONG);
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
        formData.append("file", { uri: file.uri, name: "record.mp3", type: 'multipart/form-data' });
        this.props.toggleSpinner();
        api.sendAudio(formData)
            .then((response) => {
                if (response.status === 200 && response.data.status === "success") {
                    let generalized = api.generalizeResponse(response.data)
                    this.props.updateSong(generalized.result && generalized.result.length > 0 ? generalized.result[0] : false)
                    this.props.toggleSpinner();
                    this.setState({ popUp: true })
                }
            })
            .catch((error) => {
                Toast.show('Здається, сталася помилка. Спробуйте ще раз!', Toast.LONG);
            });
    }
    closePopUp() {
        this.setState({ popUp: false })
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
                                <TouchableOpacity onPress={this.handleFile}>
                                    <Text style={styles.btnRed}>Завантажити</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.slide, { flex: 0.5 }]}>
                                <Text style={styles.paragraph}>Зроби аудіозапис:</Text>
                                <View>
                                    {
                                        this.state.record
                                        ? 
                                            <TouchableOpacity onPress={this.stopRecording} style={{ flex: 1 }}>
                                                <Text style={styles.btnStop}>Стоп</Text>
                                            </TouchableOpacity>
                                        :
                                            <TouchableOpacity onPress={this.togglePermission} style={{ flex: 1 }}>
                                                <Text style={styles.btnRed}>Почати запис</Text>
                                            </TouchableOpacity>
                                    }
                                </View>
                            </View>
                        </View>

                        <View style={[this.props.file === null && { width: 0, height: 0 }, { flex: 1, flexDirection: 'row' }]} >
                            {
                                this.props.file !== null ?
                                    this.state.playing ? 
                                            <TouchableOpacity onPress={this.onPause}
                                                style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', }}
                                            >
                                                <Image source={require('../assets/pause.png')} style={{ width: 20, height: 20 }} />
                                            </TouchableOpacity>
                                        :
                                            <TouchableOpacity onPress={this.onPlay}
                                                style={{ flex: 0.1,justifyContent: 'center', alignItems: 'center', }}
                                            >
                                                <Image source={require('../assets/play.png')} style={{ width: 20, height: 20 }} />
                                            </TouchableOpacity>
                                :  null
                            }
                            <Text style={{ fontSize: 20, textAlignVertical: 'center', flex: 0.8, textAlign: 'center' }}>
                                { this.props.file ? this.props.file.name ? this.props.file.name : "Голосовий запис" : null }
                            </Text>
                            <TouchableOpacity
                                onPress={async () => {
                                    this.props.updateFile(null);
                                    if ((await soundObject.getStatusAsync()).isLoaded) {
                                        await recording.stopAndUnloadAsync();
                                        await soundObject.unloadAsync();
                                    }
                                }}
                                style={{ flex: 0.1 }}
                            >
                                <Text style={{ color: '#ff6666', fontSize: 30, textAlignVertical: 'center' }}>
                                    &#10005;
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={this.sendAudio}>
                            <Text style={styles.btnBlue}>Надіслати</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

                <Modal animationType="fade" transparent={true} visible={this.state.popUp}>
                    <RecognitionResponse close={this.closePopUp} navigation={this.props.navigation} />
                </Modal>

                <AnimatedLoader
                    visible={this.props.spinner}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require('../Spinner.json')}
                    animationStyle={styles.spinner}
                    speed={1}
                />
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateFile: (file) => dispatch({ type: 'UPDATE_FILE', file: file }),
        updateSong: (song) => dispatch({ type: 'UPDATE_SONG', song: song }),
        toggleSpinner: () => dispatch({ type: 'TOGGLE_SPINNER' })
    }
}

function mapStateToProps(state) {
    return {
        file: state.file,
        spinner: state.spinner,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioSearch)