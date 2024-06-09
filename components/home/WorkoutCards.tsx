import React from 'react';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { Dimensions, StyleSheet, useColorScheme, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

export type Exercise = {
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
};

export default function WorkoutCards({
  exercise_name, 
  sets, 
  reps, 
  weight, 
  weight_type, 
  future_sets, 
  future_reps, 
  future_weight, 
  created
}: Exercise) {
    
  const colorScheme = useColorScheme();
  
  const textColor = colorScheme === 'dark' ? '#fff' : '#000';
  const borderOfCards = { borderColor: "#ddd", borderWidth: 1, borderRadius: 8 };

  return (
    <TouchableOpacity>
      <ThemedView style={[styles.card, borderOfCards]}>
        <ThemedText style={[styles.exercise_name, { color: textColor }]}>
          {exercise_name}
        </ThemedText>
        <View style={styles.divider} />
        <ThemedView style={[styles.details_container, styles.row]}>
          <ThemedText style={[styles.details_title, { color: textColor }]}>
            Current :
          </ThemedText>
          <ThemedText style={[styles.details, { color: textColor }]}>
            {sets} sets
          </ThemedText>
          <ThemedText style={[styles.details, { color: textColor }]}>
            {reps} reps
          </ThemedText>
          <ThemedText style={[styles.details, { color: textColor }]}>
            {weight} {weight_type}
          </ThemedText>
        </ThemedView>
        <ThemedView style={[styles.details_container, styles.row]}>
          <ThemedText style={[styles.details_title, { color: textColor }]}>
            Future :
          </ThemedText>
          <ThemedText style={[styles.details, { color: textColor }]}>
            {future_sets} sets
          </ThemedText>
          <ThemedText style={[styles.details, { color: textColor }]}>
            {future_reps} reps
          </ThemedText>
          <ThemedText style={[styles.details, { color: textColor }]}>
            {future_weight} {weight_type}
          </ThemedText>
        </ThemedView>
        <View style={styles.divider} />
        
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    padding: 16,
    borderRadius: 10,
    
    minWidth: Dimensions.get('window').width - 100,
    maxWidth: Dimensions.get('window').width - 100,
    minHeight: Dimensions.get('window').height - 600,
    maxHeight: Dimensions.get('window').height - 600,
  },
  exercise_name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details_container: {
    marginBottom: 10,
  },
  details_title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  details: {
    fontSize: 16,
    marginRight: 10,
  },
  created: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
});
