import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    history: {
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
        fontWeight: 'bold',
        fontSize: 20,
        margin: 5,
    },
    emptyHistory: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
        margin: 15,
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
})

export default styles