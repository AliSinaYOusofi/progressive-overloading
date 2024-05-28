import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, ToastAndroid } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';

import { useEffect, useState } from 'react';
import { progressive_overloading } from '@/db/sqlitedb';

import WorkoutCard from '@/components/cards/Workout';

type Workout = {
  id: number;
  exercise_name: string;
  exercise_description: string;
  sets: number;
  reps: number;
  weight: number;
  weight_type: string;
  date: string;
};

export default function TabTwoScreen() {
  const [ workouts, setWorkouts] = useState<Workout[]>([])

  useEffect( () => {
    const fetchWorkout = async ()  => {
      try {
          const result: Workout[] = await progressive_overloading.getAllAsync("SELECT * FROM progressive_overloading")
          setWorkouts(result)
      } catch (error) {
          console.error("error fetching progressive_overloading workouts", error)
          ToastAndroid.show("Error fetching workouts", ToastAndroid.SHORT)
      }
  }

  fetchWorkout()
  }, [])
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      {
        workouts.map( (workout, index) => (
          <WorkoutCard key={index} workout={workout} />
        ))
      }
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
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
