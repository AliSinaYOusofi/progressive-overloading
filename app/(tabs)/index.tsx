import { Image, StyleSheet, ToastAndroid } from 'react-native';
import WorkoutTracker from '../../components/home/WorkoutTracker';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useEffect, useState } from 'react';
import { getRandomImage } from '@/utils/randomImageIndexGenerator';
import GoalSetting from '@/components/home/GoalSetting';
import MinimalNotesList from '@/components/Notes/MinimalNotesList';
import { progressive_overloading } from '@/db/sqlitedb';

export default function HomeScreen() {
  const [image, setImage] = useState({src: "", name: ""});

  useEffect( () => {
    const randomImage = getRandomImage()
    setImage(randomImage)
  }, [])

  const headerImage = <Image src={image.src} style={styles.headerImage} />

  useEffect( () => {
    const createTable = async () : Promise<void> => {
        try {
            await progressive_overloading.execAsync(`CREATE TABLE IF NOT EXISTS progressive_overloading (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              exercise_name TEXT,
              exercise_description TEXT,
              sets INTEGER,
              reps INTEGER,
              weight INTEGER,
              weight_type TEXT,
              future_sets INTEGER,
              future_reps INTEGER,
              future_weight INTEGER,
              created TIMESTAMP,
              updated TIMESTAMP,
              acheived INTEGER
            );`)

            console.log("progressive overloading created")
        } 
        
        catch (error) {
          console.error("error creating table", error)
          ToastAndroid.show("failed to create table", ToastAndroid.LONG)
        }
    }
    
    const createGoalTable = async () : Promise<void> => {
      try {

        await progressive_overloading.execAsync(`CREATE TABLE IF NOT EXISTS goals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            goal_title TEXT,
            description TEXT,
            complete_in TEXT,
            time_to_complete TIMESTAMP,
            created TIMESTAMP,
            updated TIMESTAMP,
            acheived INTEGER
        )`)
        console.log("goals table created")
      } catch (error) {
        console.error("error creating goals table", error)
        ToastAndroid.show("error creating goals table", ToastAndroid.LONG)
      }
    }
    const createNotesTable = async () : Promise<void> => {
      try {
          await progressive_overloading.execAsync(`CREATE TABLE IF NOT EXISTS notes (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT,
              content TEXT,
              created TIMESTAMP,
              updated TIMESTAMP
          )`)
          console.log("notes table created")
      } catch (error) {
        console.error("error creating goals table", error)
        ToastAndroid.show("error creating notes table", ToastAndroid.LONG)
      }
    }

    createNotesTable()
    createGoalTable()
    createTable()
  }, [])

  return (
    <ParallaxScrollView 
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={headerImage}>
      <WorkoutTracker />
      <GoalSetting />
      <MinimalNotesList />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  headerImage: {
    width: '100%',
    height: "100%",
  },
});
