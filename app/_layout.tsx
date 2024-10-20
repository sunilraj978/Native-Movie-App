import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" />

      <Stack.Screen name="movie" />

      <Stack.Screen name="person" />

      <Stack.Screen name="search" />

    </Stack>
  );
}
