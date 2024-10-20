import {
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from "./api/movieApp";

export default function MovieScreen() {
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [favourite, setFovourite] = useState(false);
  const router = useRouter();
  const [movieDatas, setMovieDatas] = useState({});
  const { width, height } = Dimensions.get("window");

  // Parse the string back into an object
  const { item } = useLocalSearchParams();
  const movieData = item ? JSON.parse(item) : null;

  useEffect(() => {
    getMovieDetails(movieData?.id);
    getMovieCreditDetails(movieData?.id)
    getSimilarMovieDetails(movieData?.id)
  }, [movieData?.id]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovieDatas(data);
  };

  const getMovieCreditDetails = async(id) =>{
    const data = await fetchMovieCredits(id)
    if(data && data?.cast) setCast(data?.cast)
  }

  const getSimilarMovieDetails = async(id) =>{
    const data = await fetchSimilarMovies(id)
    if(data && data?.results) setSimilarMovies(data?.results)
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <View className="w-full my-8">
        <SafeAreaView className="z-20 absolute w-full flex-row justify-between items-center px-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="rounded-xl p-1 bg-yellow-400"
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setFovourite(!favourite)}>
            <HeartIcon size="30" color={favourite ? "yellow" : "white"} />
          </TouchableOpacity>
        </SafeAreaView>

        <View>
          <Image
            source={{ uri: image500(movieDatas?.poster_path) }}
            style={{ width, height: height * 0.55 }}
          />

          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>

      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movieDatas?.title}
        </Text>

        {/* {status, release, runtime} */}

        <Text className="text-neutral-400 font-semibold text-base text-center">
          {movieDatas?.status} · {movieDatas?.release_date?.split("-")[0]} ·{" "}
          {movieDatas?.runtime} min
        </Text>

        <View className="flex-row justify-center mx-4 space-x-2">
          {movieDatas?.genres?.map((genre, index) => {
            let showDot = index + 1 != movieDatas.genres.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center"
              >
                {genre?.name} {showDot ? "·" : null}
              </Text>
            );
          })}
        </View>

        <Text className="text-neutral-400 mx-4 tracking-wide">
          {
            movieDatas?.overview
          }
        </Text>
      </View>

      <Cast cast={cast} />

      <MovieList title='Similar Movies' hideSeeAll={true} data={similarMovies} />
    </ScrollView>
  );
}
