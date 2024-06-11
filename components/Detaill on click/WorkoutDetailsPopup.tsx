import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../ThemedText';
import { ThemedView} from '../ThemedView'
import { formatDistanceToNowStrict } from 'date-fns';

type props = {
    id: number; 
    exercise_name: string; 
    sets: number;
    reps: number;
    weight: number;
    weight_type: string; 
    future_sets: number;
    future_reps: number; 
    future_weight: number;
    created: string;
    updated: string;
    achevied: boolean;
    toggleModal: (toggle: boolean) => void;
}

export default function WorkoutDetailsPopup({
    id,
    exercise_name,
    sets,
    reps,
    weight,
    weight_type,
    future_sets,
    future_reps,
    future_weight,
    created,
    updated,
    achevied,
    toggleModal,
    } : props) {

        const colorScheme = useColorScheme();
  
        const textColor = colorScheme === 'dark' ? '#fff' : '#000';
        const cardBackground = colorScheme === 'dark' ? '#1c1c1c' : '#f9f9f9';
        const borderOfCards = { borderColor: "#ddd", borderWidth: 1, borderRadius: 8}
        const modalBackground = colorScheme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.7)';

        return (
            <View style={[styles.modalContainer, {backgroundColor: modalBackground}]}>
                
                <View style={[styles.modalContent, {backgroundColor: cardBackground}]}>
                
                    <TouchableOpacity onPress={() => toggleModal(false)} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color={textColor} />
                    </TouchableOpacity>
                
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <ThemedText style={[styles.modalTitle, { color: textColor }]}>
                            {exercise_name}
                        </ThemedText>
                        <View style={styles.modalDivider} />
                        <ThemedText style={[styles.modalText, { color: textColor }]}>
                            Sets: {sets}
                        </ThemedText>
                        <ThemedText style={[styles.modalText, { color: textColor }]}>
                            Reps: {reps}
                        </ThemedText>
                        <ThemedText style={[styles.modalText, { color: textColor }]}>
                            Weight: {weight} {weight_type}
                        </ThemedText>
                        <ThemedText style={[styles.modalText, { color: textColor }]}>
                            Future Sets: {future_sets}
                        </ThemedText>
                        <ThemedText style={[styles.modalText, { color: textColor }]}>
                            Future Reps: {future_reps}
                        </ThemedText>
                        <ThemedText style={[styles.modalText, { color: textColor }]}>
                            Future Weight: {future_weight} {weight_type}
                        </ThemedText>
                        <View style={styles.modalDivider} />
                        <ThemedText style={[styles.modalText, { color: textColor }]}>
                            Created: {created.split("T")[0]} {formatDistanceToNowStrict(new Date(created))} ago
                        </ThemedText>
                        <ThemedText style={[styles.modalText, { color: textColor }]}>
                            Updated: {updated.split("T")[0]} {formatDistanceToNowStrict(new Date(updated))} ago
                        </ThemedText>
                        <ThemedText style={[styles.modalText, { color: textColor }]}>
                            Achieved: {achevied ? 'Yes' : 'No'}
                        </ThemedText>
                    </ScrollView>
                </View>
            </View> 
        )
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
  
  