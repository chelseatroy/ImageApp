import { StyleSheet } from 'react-native';

export const imageCollectionStyles = StyleSheet.create({
    collectionItemContainer: {
        flex: 1,
        marginVertical: 20,
        backgroundColor: '#FFFFFF',
    },
    item: {
        borderRadius: 10,
        backgroundColor: '#32CD3270',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 4,
        padding: 5,
    },
    itemText: {
        fontSize: 16,
        color: '#228B22',
    },
    emptyResultsText: {
        fontSize: 16,
        color: '#228B22',
        alignItems: 'center',
    },
    hidden: {
        backgroundColor: 'transparent',
    },
    activityIndicator: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    image: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFFFFF',
    }
});

