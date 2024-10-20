import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
// import TrendingContainer from './TrendingContainer';
export default function Home() {
  const [trending, setTrending] = useState([1,2,3,4])
  return (
    <View className="flex-1 bg-neutral-800">

        <SafeAreaView className="mb-3 mt-4">
            <StatusBar style='light' />
            <View className='flex-row justify-between'>
                <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                <Text className="text-white text-3xl font-bold">
                <Text className="text-yellow-500">M</Text>ovies
                </Text>
                <TouchableOpacity>
                    <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:5}}>
          {/* <TrendingContainer data={trending} /> */}
        </ScrollView>
     
    </View>
  )
}