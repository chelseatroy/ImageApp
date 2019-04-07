import { StyleSheet } from 'react-native';

export const mainScreenStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        margin: 5
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        color: '#228B22',
        padding: 3,
    },
    description: {
        alignItems: 'center',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    searchBar: {
        backgroundColor: '#FFFFFF',
        padding: 6,
        borderColor: '#228B22',
        borderWidth: 2,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 5
    }
});
