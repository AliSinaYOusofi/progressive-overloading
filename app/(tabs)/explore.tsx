import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ToastAndroid, useColorScheme } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import WorkoutCard from '@/components/cards/Workout';
import NoWorkoutsAdded from '@/components/cards/NoWorkoutsAdded';
import AcheviedWorkouts from '@/components/home/AcheviedWorkouts';
import { progressive_overloading } from '@/db/sqlitedb';
import { useAppContext } from '@/context/ContextProvider';
import { ThemedText } from '@/components/ThemedText';
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-1665900038997295/9829014595';
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
  const colorScheme = useColorScheme();
  const bannerRef = useRef(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const result: Workout[] = await progressive_overloading.getAllAsync("SELECT * FROM progressive_overloading WHERE acheived = 0");
        setWorkouts(result.reverse());
      } catch (error) {
        console.error("Error fetching progressive_overloading workouts", error);
        // ToastAndroid.show("Error fetching workouts", ToastAndroid.SHORT);
      }
    };

    fetchWorkout();
  }, [refreshDatabaseFetch]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<FontAwesome6 size={310} name="dumbbell" style={styles.headerImage} />}
    >
      <BannerAd ref={bannerRef} unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
      <ThemedText style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, marginHorizontal: 10, marginTop: 10 }}>
        1. Progressive overloading
      </ThemedText>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            view === 'progress' && {
              backgroundColor: colorScheme === 'dark' ? 'white' : 'black',
            },
          ]}
          onPress={() => setView('progress')}
        >
          <Text
            style={[
              styles.buttonText,
              view === 'progress' && { color: colorScheme === 'dark' ? 'black' : 'white' },
            ]}
          >
            In Progress
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            view === 'achieved' && {
              backgroundColor: colorScheme === 'dark' ? 'white' : 'black',
            },
          ]}
          onPress={() => setView('achieved')}
        >
          <Text
            style={[
              styles.buttonText,
              view === 'achieved' && { color: colorScheme === 'dark' ? 'black' : 'white' },
            ]}
          >
            Achieved
          </Text>
        </TouchableOpacity>
      </View>
      {view === 'progress' ? (
          <>
              <ThemedText style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, marginHorizontal: 10, marginTop: 10 }}>
                  In Progress ({workouts.length})
              </ThemedText>
              {workouts.length > 0 ? (
                  workouts.map((workout, index) => <WorkoutCard key={index} workout={workout} />)
              ) : (
                  <NoWorkoutsAdded />
              )}
          </>
        ) : (
          <>
        
        <AcheviedWorkouts />
            </>
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
    backgroundColor: 'gray',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', // default text color for buttons
  },
});
