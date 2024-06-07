import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'

import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons'
import { useColorScheme } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import SupportAndRate from '@/components/about/SupportAndRate'

export default function AboutPage() {
    const colorScheme = useColorScheme()
    const iconColor = colorScheme === 'dark' ? 'white' : 'black'

    return (
        <ScrollView  style={styles.scrollView}>
            <ThemedText style={styles.title}>About My App</ThemedText>
            <ThemedView style={styles.container}>
                
                <ThemedView style={styles.section}>
                    <View style={styles.icon_and_text}>
                        <FontAwesome5 name="dumbbell" size={24} color={iconColor} />
                        <ThemedText style={styles.sectionTitle}>Progressive Overloading</ThemedText>
                    </View>
                    <ThemedText style={styles.sectionText}>
                        Our app helps you track your workout progress by adding weights from one workout to another. This ensures that you are continually challenging your muscles and making progress.
                    </ThemedText>
                </ThemedView>

                <View style={styles.divider} />

                <View style={styles.section}>
                    <View style={styles.icon_and_text}>
                        <MaterialIcons name="fitness-center" size={24} color={iconColor} />
                        <ThemedText style={styles.sectionTitle}>Goal Setting</ThemedText>
                    </View>
                    <ThemedText style={styles.sectionText}>
                        Set your fitness goals and track your progress towards achieving them. Whether it's lifting a certain weight or reaching a bodyweight target, our app keeps you motivated.
                    </ThemedText>
                </View>

                <View style={styles.divider} />

                <View style={styles.section}>
                    <View style={styles.icon_and_text}>
                        <FontAwesome5 name="sticky-note" size={24} color={iconColor} />
                        <ThemedText style={styles.sectionTitle}>Sticky Notes</ThemedText>
                    </View>
                    <ThemedText style={styles.sectionText}>
                        Keep track of your fitness journey with our sticky notes feature. Jot down your thoughts, tips, or anything you want to remember about your workouts.
                    </ThemedText>
                </View>
            </ThemedView>

            <SupportAndRate />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        marginHorizontal: "auto"
    },
    container: {
        padding: 20,
        borderRadius: 10,
        margin: 20,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 50,
        textAlign: "center"
    },
    section: {
        marginBottom: 20
    },
    icon_and_text: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10
    },
    sectionText: {
        fontSize: 16,
        lineHeight: 22,
        textAlign: 'justify'
    },
    divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 20
    }
})
