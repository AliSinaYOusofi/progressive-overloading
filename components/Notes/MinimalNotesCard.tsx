import React from 'react';
import { ThemedText } from '../ThemedText';
import { notes } from './AddNotesPopup';
import { Dimensions, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native';
import { formatDistanceToNowStrict } from 'date-fns';

export default function MinimalNotesCard({ id, title, content: body, created, updated }: notes) {

    const borderOfCards = { borderColor: "#ddd", borderWidth: 1, borderRadius: 8 };

    return (
        
            <TouchableOpacity style={[styles.container, borderOfCards]}>
                <ThemedText style={styles.goalTitle}>{title}</ThemedText>
                <View style={styles.justForBorder} />
                <ThemedText numberOfLines={3} style={styles.description}>{body}</ThemedText>
                <ThemedText style={styles.date_text}> Created : {created.split("T")[0]} ({formatDistanceToNowStrict(new Date(created))}) ago</ThemedText>
            </TouchableOpacity>
        
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginVertical: 8,
        borderRadius: 10,
        alignSelf: 'center',
        minWidth: Dimensions.get('window').width - 100,
        maxWidth: Dimensions.get('window').width - 100,
        minHeight: Dimensions.get('window').height - 600,
        maxHeight: Dimensions.get('window').height - 600,
        columnGap: 5,
        marginRight: 4,
        overflow: "scroll",
        position: "relative"
    },
    
    goalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    justForBorder: {
        borderColor: "#ddd",
        borderWidth: 0.3,
        marginBottom: 10,
    },

    date_text: {
        fontSize: 14,
        color: "gray",
        position: "absolute",
        bottom: 5,
        left: 16
    }
});
