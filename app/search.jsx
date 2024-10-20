import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import {debounce} from 'lodash'
import {fetchSearchMovies, image185} from '../app/api/movieApp'

export default function Search() {
  let movieName = "Avengers End Game";
  const router = useRouter();
  const [results, setResults] = useState([]);
  const { width, height } = Dimensions.get("window");

  const handleSearch = value =>{
    if(value && value.length>2){
      fetchSearchMovies({
        query:value,
        include_adults:'false',
        language:'en-US',
        page:'1'
      }).then((data)=>{
        if(data && data?.results) setResults(data?.results)
      })
    }else{
      setResults([])
    }
  }

  const handleTextChange = useCallback(debounce(handleSearch, 400),[])

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
        onChangeText={handleTextChange}
          placeholder="Search movie"
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => router.back()}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>



      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="space-y-3"
      >
        <Text className="text-white font-semibold ml-1">
          Results ({results.length})
        </Text>
        <View className="flex-row justify-around flex-wrap">
          {results.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() =>
                  router.push({ pathname: "/movie", params: {item:JSON.stringify(item)} })
                }
              >
                <View className="mb-4" style={{ marginBottom: 15 }}>
                  <Image
                    className="rounded-3xl p-2"
                    source={{uri:image185(item?.poster_path)}}
                    style={{
                      width: width * 0.44,
                      height: height * 0.38,
                    }}
                  />
                  <Text className="text-neutral-300 ml-1">
                    {item?.title?.length > 20
                      ? item?.title.slice(0, 20) + "..."
                      : item?.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
