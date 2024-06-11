import React from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../ThemedText';
import { formatDistanceToNowStrict } from 'date-fns';

type Notes = {
    id: number;
    title: string;
    content: string;
    created: string;
    updated: string;
}

type Props = {
    note: Notes;
    toggleModal: (toggle: boolean) => void;
}

export default function NotesDetailsPopup({ note, toggleModal }: Props) {
    const { id, title, content, created, updated } = note;

    const colorScheme = useColorScheme();
    const textColor = colorScheme === 'dark' ? '#fff' : '#000';
    const cardBackground = colorScheme === 'dark' ? '#1c1c1c' : '#f9f9f9';
    const modalBackground = colorScheme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.7)';
    
    return (
        <View style={[styles.modalContainer, { backgroundColor: modalBackground }]}>
           
            <View style={[styles.modalContent, { backgroundColor: cardBackground }]}>
                
                <TouchableOpacity onPress={() => toggleModal(false)} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color={textColor} />
                </TouchableOpacity>
                
                <ScrollView contentContainerStyle={styles.scrollView}>
                
                    <ThemedText style={[styles.modalTitle, { color: textColor }]}>
                        {title}
                    </ThemedText>
                    <View style={styles.modalDivider} />
                    
                    <ThemedText style={[styles.modalText, { color: textColor }]}>
                        {content}
                    </ThemedText>
                    <View style={styles.modalDivider} />
                    
                    <ThemedText style={[styles.modalText, { color: textColor }]}>
                        Created: {created.split('T')[0]} {formatDistanceToNowStrict(new Date(created))} ago
                    </ThemedText>
                    
                    <ThemedText style={[styles.modalText, { color: textColor }]}>
                        Updated: {updated.split('T')[0]} {formatDistanceToNowStrict(new Date(updated))} ago
                    </ThemedText>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    modalContent: {
        width: Dimensions.get('window').width - 40,
        padding: 20,
        borderRadius: 10,
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    scrollView: {
        paddingVertical: 20,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    modalDivider: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10,
    },
});
