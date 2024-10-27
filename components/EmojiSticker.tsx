import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  imageSize: number;
  stickerSource: string;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2);
      }
    });

  const imageStyle = useAnimatedStyle(() => ({
    width: withSpring(scaleImage.value),
    height: withSpring(scaleImage.value),
  }));

  const drag = Gesture.Pan().onChange((event) => {
    if (
      !(
        translateX.value + event.changeX < 0 ||
        translateX.value + event.changeX + scaleImage.value > 320
      )
    )
      translateX.value += event.changeX;
    if (
      !(
        translateY.value + event.changeY < 0 ||
        translateY.value + event.changeY + scaleImage.value > 440
      )
    )
      translateY.value += event.changeY;
  });

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -440 }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            // typescript brrr
            source={stickerSource as any}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
