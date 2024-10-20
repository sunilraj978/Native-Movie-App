import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { image185 } from "../app/api/movieApp";

export default function Cast({ cast }) {
  const router = useRouter();
  let personName = "Win disel";
  let charName = "John";
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                onPress={() =>{
                    router.push({ pathname: "/person", params: { item: JSON.stringify(person) } });
                }}
                key={index}
                className="mr-4 items-center"
              >
                <View className="rounded-full h-20 w-20 items-center border border-neutral-500 overflow-hidden">
                  <Image
                    className="h-24 w-20"
                    source={{uri:image185(person?.profile_path)}}
                  />
                  
                </View>

                <Text className="text-white text-xs mt-1">
                  {person?.character.length > 10
                    ? person?.character.slice(0, 10) + "...."
                    : person?.character}
                </Text>

                <Text className="text-neutral-400 text-xs mt-1">
                  {person?.original_name.length > 10
                    ? person?.original_name.slice(0, 10) + "...."
                    : person?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
