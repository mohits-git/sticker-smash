import { StyleSheet } from "react-native";
import { Image, ImageSource } from "expo-image";

type Props = {
  imgSource: string | ImageSource | number;
};

export default function ImageViewer({ imgSource }: Props) {
  return <Image source={imgSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
