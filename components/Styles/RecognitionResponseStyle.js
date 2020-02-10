import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    backContainer: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: '100%',
        height: '100%'
    },
    container: {
        padding: 20,
        backgroundColor: 'white',
        width: screenWidth * 0.9,
        height: screenHeight * 0.45,
        marginLeft: screenWidth * 0.05,
        marginRight: screenWidth * 0.05,
        marginBottom: screenHeight * 0.275,
        marginTop: screenHeight * 0.275,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#5a78ed',
        fontSize: 25,
        textAlign: "center",
        fontWeight: 'bold',
        margin: 5,
    },
    paragraph: {
        textAlign: 'center',
        color: 'black',
        fontSize: 15,
        margin: 10,
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