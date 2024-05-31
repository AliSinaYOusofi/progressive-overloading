import { Image, StyleSheet, Platform } from 'react-native';
import WorkoutTracker from '../../components/home/WorkoutTracker';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { getRandomImage } from '@/utils/randomImageIndexGenerator';
import GoalSetting from '@/components/home/GoalSetting';

export default function HomeScreen() {
  const [image, setImage] = useState({src: "", name: ""});

  useEffect( () => {
    const randomImage = getRandomImage()
    setImage(randomImage)
  }, [])

  const headerImage = <Image src={image.src} style={styles.headerImage} />

  return (
    <ParallaxScrollView 
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={headerImage}>
      <WorkoutTracker />
      <GoalSetting />
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
