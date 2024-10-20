import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Dimensions } from "react-native";
import { image185 } from "../app/api/movieApp";

export default function MovieList({ title, data, hideSeeAll }) {
  const { width, height } = Dimensions.get("window");
  const router = useRouter();

  let movieName = "ANT MAN AND THE WASP";

  return (
    <View className="mb-5 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text className="text-yellow-500">See All</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data?.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => router.push({ pathname: "/movie", params: { item: JSON.stringify(item) }})}
            >
              <View>
                <Image
                  source={{uri:image185(item.poster_path)}}
                  className="rounded-3xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
                <Text className="text-neutral-300 ml-1">
                  {item?.title.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
