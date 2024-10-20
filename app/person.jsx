import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import MovieList from "../components/MovieList";
import { fetchMovieDetails, fetchPersonDetailsApi, fetchPersonMovieApi, image342 } from "./api/movieApp";

export default function Person() {
  var { height, width } = Dimensions.get("window");
  const [favourite, setFovourite] = useState(false);
  const { item } = useLocalSearchParams();

  const [personMovies, setPersonMovies] = useState([]);
  const [personDetails, setPersonDetails] = useState({});

  const router = useRouter();
  // Parse the string back into an object
  const movieData = item ? JSON.parse(item) : null;

  useEffect(() => {
    getPersonDetails(movieData?.id);
    getPersonMovies(movieData?.id)
  }, [movieData?.id]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetailsApi(id);
    if (data) setPersonDetails(data);
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovieApi(id);
    if (data && data.cast) setPersonMovies(data.cast);
  };

  return (
    <ScrollView
      className="flex-1 bg-neutral-900 pt-3"
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <SafeAreaView className="z-20 absolute w-full flex-row justify-between items-center px-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="rounded-xl p-1 bg-yellow-400"
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFovourite(!favourite)}>
          <HeartIcon size="40" color={favourite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      <View>
        <View
          className="flex-row justify-center"
          style={{
            shadowColor: "white",
            shadowRadius: 40,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 1,
          }}
        >
          <View
            className="items-center rounded-full h-72 w-72 border-2 border-neutral-400 overflow-hidden"
            style={{
              // iOS shadow properties
              shadowColor: Platform.OS === "ios" ? "gray" : "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
              // Android shadow using elevation
              elevation: Platform.OS === "android" ? 40 : 0,
            }}
          >
            <Image
              source={{ uri: image342(personDetails?.profile_path) }}
              style={{ height: height * 0.43, width: width * 0.74 }}
            />
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-3xl text-white font-bold text-center">
            {personDetails?.name}
          </Text>
          <Text className="text-base text-neutral-500 text-center">
            {personDetails?.place_of_birth}
          </Text>
        </View>

        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
          <View className="px-2 items-baseline border-r-2 border-r-neutral-400">
            <Text className="text-white font-semibold">Gender</Text>
            <Text className="text-neutral-300 text-sm">
              {personDetails?.gender === 1 ? "Female" : "Male"}
            </Text>
          </View>

          <View className="px-2 items-baseline border-r-2 border-r-neutral-400">
            <Text className="text-white font-semibold">Birthday</Text>
            <Text className="text-neutral-300 text-sm">
              {personDetails?.birthday}
            </Text>
          </View>

          <View className="px-2 items-baseline border-r-2 border-r-neutral-400">
            <Text className="text-white font-semibold">Known for</Text>
            <Text className="text-neutral-300 text-sm">
              {personDetails?.known_for_department}
            </Text>
          </View>

          <View className="px-2 items-baseline">
            <Text className="text-white font-semibold">Popularity</Text>
            <Text className="text-neutral-300 text-sm">
              {personDetails?.popularity?.toFixed(2)} %
            </Text>
          </View>
        </View>

        <View className="my-6 mx-4 space-y-2">
          <Text className="text-white text-lg">Biography</Text>
          <Text className="text-neutral-400 tracking-wide">
            {personDetails?.biography || "N/A"}
          </Text>
        </View>
        
        <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />
      </View>
    </ScrollView>
  );
}
