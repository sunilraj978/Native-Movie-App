import * as Progress from 'react-native-progress';
import { View, Text } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';


const {width, height} = Dimensions.get('window')

export default function LoadingScreen() {
  return (
    <View style={{height, width}} className="absolute flex-row justify-center items-center">
        {/* <Progress.Circle thickness={12} size={160} color='yellow'  /> */}
        <Progress.CircleSnail thickness={12} size={160} color={['red', 'yellow', 'white']} />
    </View>
  )
}