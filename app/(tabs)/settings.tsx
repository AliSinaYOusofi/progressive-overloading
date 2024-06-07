import { ThemedText } from '@/components/ThemedText'
import AboutPage from '@/components/about/About'
import ChangeTheme from '@/components/settings/ChangeTheme'
import ClearTablesData from '@/components/settings/ClearData'
import React from 'react'
import { ScrollView } from 'react-native'

export default function settings() {
    return (
        <ScrollView>
            <ChangeTheme />
            <ClearTablesData />
        </ScrollView>
    )
}
