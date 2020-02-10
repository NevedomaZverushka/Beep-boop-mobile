import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
var styles = StyleSheet.create({
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
    btnStop: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#ff6666',
        margin: 5,
        borderWidth: 2,
        borderColor: '#ff6666',
        padding: 9,
        textAlignVertical: 'center',
        opacity: 1
    },
    spinner: {
        width: 70,
        height: 70,
    }
})

export default styles