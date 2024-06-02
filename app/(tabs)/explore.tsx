import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ToastAndroid } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome6 } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import WorkoutCard from '@/components/cards/Workout';
import NoWorkoutsAdded from '@/components/cards/NoWorkoutsAdded';
import AcheviedWorkouts from '@/components/home/AcheviedWorkouts';
import { progressive_overloading } from '@/db/sqlitedb';
import { useAppContext } from '@/context/ContextProvider';

type Workout = {
  id: number;
  exercise_name: string;
  exercise_description: string;
  sets: number;
  reps: number;
  weight: number;
  weight_type: string;
  created: string;
  weightType: string;
  future_sets: number;
  future_reps: number;
  future_weight: number;
  achevied: number;
};

export default function TabTwoScreen() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [view, setView] = useState<'progress' | 'achieved'>('progress');
  const { refreshDatabaseFetch } = useAppContext();

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const result: Workout[] = await progressive_overloading.getAllAsync("SELECT * FROM progressive_overloading");
        setWorkouts(result);
      } catch (error) {
        console.error("Error fetching progressive_overloading workouts", error);
        ToastAndroid.show("Error fetching workouts", ToastAndroid.SHORT);
      }
    };

    fetchWorkout();
  }, [refreshDatabaseFetch]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<FontAwesome6 size={310} name="dumbbell" style={styles.headerImage} />}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, view === 'progress' && styles.selectedButton]}
          onPress={() => setView('progress')}
        >
          <Text style={styles.buttonText}>Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, view === 'achieved' && styles.selectedButton]}
          onPress={() => setView('achieved')}
        >
          <Text style={styles.buttonText}>Achieved</Text>
        </TouchableOpacity>
      </View>
      {view === 'progress' ? (
        workouts.length > 0 ? (
          workouts.map((workout, index) => <WorkoutCard key={index} workout={workout} />)
        ) : (
          <NoWorkoutsAdded />
        )
      ) : (
        <AcheviedWorkouts />
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  selectedButton: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
