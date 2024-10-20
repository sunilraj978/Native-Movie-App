import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import TrendingContainer from "./trendingContainer";
import MovieList from "../components/MovieList";
import { useRouter } from "expo-router";
import LoadingScreen from "../components/LoadingScreen";
import { fetchTopRatedMovie, fetchTrendingMovie, fetchUpcomingMovie } from "./api/movieApp";
export default function Index() {
  const router = useRouter();
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [toprated, setTopRated] = useState([]);

  const [loadingScreen, setLoadingScreen] = useState(true);

  useEffect(()=>{

    const getTrendingMovies = async() =>{
        const response = await fetchTrendingMovie()
        if(response && response.results) setTrending(response.results)
        setLoadingScreen(false)
    }

    const getUpcomingMovies = async() =>{
        const response = await fetchUpcomingMovie()
        if(response && response.results) setUpcoming(response.results)
    }

    const getTopRatedMovies = async() =>{
        const response = await fetchTopRatedMovie()
        if(response && response.results) setTopRated(response.results)
    }

    getTrendingMovies()
    getUpcomingMovies()
    getTopRatedMovies()
  },[])

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className="mb-3 mt-4">
        <StatusBar style="light" />
        <View className="flex-row justify-between">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text className="text-yellow-500">M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => router.push("/search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 5 }}
        >
          {
            trending?.length>0 && (
                <TrendingContainer data={trending} />
            )
          }

          {/* Upcoming Movie row */}
          <MovieList title="Upcoming" data={upcoming} />

          {/* TopRated Movie row */}
          <MovieList title="Top Rated" data={toprated} />
        </ScrollView>
      )}
    </View>
  );
}
