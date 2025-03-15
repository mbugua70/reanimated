import 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring,
} from "react-native-reanimated";
import { View, Button, StyleSheet, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AnimatingStyled from "./component/animatingStyled";
import CustomizeStyle from "./component/CustomizeStyle";
import Modifiers from "./component/Modifiers";
import Gestures from './component/Gestures';

export default function AnimatedStyleUpdateExample(props) {
  const width = useSharedValue(100);

  function handlePress() {
    // width.value = width.value + 40
    width.value = withSpring(width.value + 30);
  }

  return (
    <>
      <GestureHandlerRootView>
        <ScrollView contentContainerStyle={styles.screen}>
          <View
            style={[
              {
                marginVertical: 20,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              },
              styles.container,
            ]}>
            {/* <Animated.View style={{ width, backgroundColor: 'red', height: 150 }} /> */}
            <Animated.View
              style={Object.assign(Object.assign({}, styles.box), { width })}
            />
            <Button onPress={handlePress} title='toggle' />
          </View>
          <View style={styles.container}>
            <AnimatingStyled />
          </View>
          <View style={styles.container}>
            <CustomizeStyle width={200} />
          </View>
          <View style={styles.container}>
            <Modifiers />
          </View>
          <View>
             <Gestures />
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    paddingBottom: 150,
  },
  box: {
    borderRadius: 12,
    backgroundColor: "green",
    height: 150,
  },

  container: {
    width: "100%",
  },
});
// shared value is a deriving factor in react animation, act like react state which is used to keep sync automatically between the javascript and the native features.

// useSharedValue - it's used to create shared value

// to mutate the useSharedValue in the example above we just mutate the .value property

// animated component are used to define animatable element

// Animating style and props

// passing the shared value as an inline to the element.

// with the passed inline styling above we  <Animated.View style={Object.assign(Object.assign({},styles.box), {width})} /> it does not allow to access the value stored the in the element
