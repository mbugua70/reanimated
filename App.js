import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring,
} from "react-native-reanimated";
import { View, Button, StyleSheet, ScrollView } from "react-native";
import AnimatingStyled from "./component/animatingStyled";
import CustomizeStyle from "./component/CustomizeStyle";

export default function AnimatedStyleUpdateExample(props) {
  const width = useSharedValue(100);

  function handlePress() {
    // width.value = width.value + 40
    width.value = withSpring(width.value + 30);
  }

  return (
    <>
      <ScrollView>
        <View
          style={{
            marginVertical: 20,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}>
          {/* <Animated.View style={{ width, backgroundColor: 'red', height: 150 }} /> */}
          <Animated.View
            style={Object.assign(Object.assign({}, styles.box), { width })}
          />
          <Button onPress={handlePress} title='toggle' />
        </View>
        <View>
          <AnimatingStyled />
        </View>
        <View>
          <CustomizeStyle width={200} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 12,
    backgroundColor: "green",
    height: 150,
  },
});
// shared value is a deriving factor in react animation, act like react state which is used to keep sync automatically between the javascript and the native features.

// useSharedValue - it's used to create shared value

// to mutate the useSharedValue in the example above we just mutate the .value property

// animated component are used to define animatable element

// Animating style and props

// passing the shared value as an inline to the element.

// with the passed inline styling above we  <Animated.View style={Object.assign(Object.assign({},styles.box), {width})} /> it does not allow to access the value stored the in the element
