import { View, Text, Dimensions, Image, StyleSheet } from "react-native";
import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useRouter } from "expo-router";
import { image500 } from "./api/movieApp";

export default function TrendingContainer({ data }) {
  var { width, height } = Dimensions.get("window");

  const router = useRouter();

  const handleClick = (item) => {
    console.log(item);
    router.push({ pathname: "/movie", params: { item: JSON.stringify(item) } });
  };

  return (
    <View>
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>

      {/* Carousel */}
      <Carousel
        loop
        width={width}
        height={width}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={2000}
        renderItem={({ item }) => (
          <MovieCard
            item={item}
            width={width}
            height={height}
            handleClick={handleClick}
          />
        )}
      />
    </View>
  );
}

const MovieCard = ({ item, width, height, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View style={styles.imageContainer}>
        <Image
        className="rounded-3xl"
          style={{ width: width * 0.6, height: height * 0.6, borderRadius: 10 }}
          source={{ uri: image500(item.poster_path) }}
          resizeMode="cover" // This ensures the image covers the container
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
