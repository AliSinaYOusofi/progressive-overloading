import React from 'react'
import { ThemedText } from '../ThemedText'
import { notes } from './AddNotesPopup'
import { StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native'
import distanceFromNowInDays from '@/utils/returnDistanceInDays'

export default function MinimalNotesCard({id, title, content: body, created, updated} : notes) {
    const colorScheme = useColorScheme()

    const borderOfCards = { borderColor: colorScheme === "dark" ? "white" : "black", borderWidth: 1 }
    
    return (
        <View style={[styles.container, borderOfCards, { marginLeft: 10}]}>
            <TouchableOpacity style={{width: "auto", marginRight: 20, marginLeft: 10}}>
                <ThemedText style={styles.goalTitle}>{title}</ThemedText>
                <ThemedText style={styles.description}>{body}</ThemedText>
                
                <ThemedText style={styles.details}>Remaining days: </ThemedText>
                
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginVertical: 8,
        borderRadius: 10,
        width: "auto",
       
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
    details: {
        fontSize: 14,
        marginBottom: 4,
    },
    remindMe: {
        fontSize: 14,
        fontStyle: 'italic',
        marginTop: 4,
    },
});
