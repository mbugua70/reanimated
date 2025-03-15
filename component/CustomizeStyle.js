// built in animation functions
// 1. withTiming
// 2. withSpring
// 3. withDecay

// to customize the function animation you can do this by passing the config object as the second parameter to either withTiming, withSpring

//withTiming
// config parameter of withTiming comes with two properties: duration and easing.
// withTiming(sv.value, {
//   duration: 300,
//   easing: Easing.inOut(Easing.quad),
// });

// Simple enough, the duration parameter defines how long in milliseconds the animation should take to reach the assigned toValue. The duration by default is set to 300 milliseconds.

// The easing parameter lets you fine-tune the animation over the specified time. For example, you can make the animation start slowly then pickup some speed and slow it down again towards the end. This value defaults to Easing.inOut(Easing.quad).

// withSpring - it's a physics based animation function.
// makes it look like the object you are animating is connected to the real spring
// it has three property

// 1. mass -
// 2. damping - friction
// 3. stiffness - tension

// 1. mass
// The mass of a spring influences how hard is it to make an object move and to bring it to a stop.
//  Mass adds a feeling of inertia to the object you're trying to move. You can see in the playground that the spring with greater mass moves more "sluggish" compared to the default configuration.

// 2. stiffness
// affect how bouncy the spring is


import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
  withSpring
} from "react-native-reanimated";

const duration = 2000;

const CustomizeStyle = ({ width }) => {
  const defaultAnime = useSharedValue(width / 2 - 160);
  const linear = useSharedValue(width / 2 - 160);
  const springElement = useSharedValue(width / 2 - 160);

  const animatedDefault = useAnimatedStyle(() => ({
    transform: [{ translateX: defaultAnime.value }],
  }));

  const animatedChanged = useAnimatedStyle(() => ({
    transform: [{ translateX: linear.value }],
  }));

  const sprinDefault = useAnimatedStyle(() => ({
    transform: [{ translateX: springElement.value }],
  }));

  useEffect(() => {
    linear.value = withRepeat(
      withTiming(-linear.value, {
        duration,
        // easing: Easing.bounce,
        easing: Easing.steps(12, true),
      }),
      -1,
      true
    );

    defaultAnime.value = withRepeat(
      withTiming(-defaultAnime.value, {
        duration,
      }),
      -1,
      true
    );

    springElement.value = withRepeat(
        withSpring(-springElement.value, {
            mass: 1,
            damping: 30
        }),
        -1,
        true
    )
  }, []);
  return (
    <View>
      <Animated.View style={[styles.box, animatedDefault]}>
        <Text style={styles.text}>inout</Text>
      </Animated.View>

      <Animated.View style={[styles.box, animatedChanged]}>
        <Text style={styles.text}>linear</Text>
      </Animated.View>

      {/* spring test */}
      <Animated.View style={[styles.box, sprinDefault]}>
        <Text style={styles.text}>spring</Text>
      </Animated.View>
    </View>
  );
};

export default CustomizeStyle;

const styles = StyleSheet.create({
  box: {
    height: 80,
    width: 80,
    margin: 20,
    borderWidth: 1,
    borderColor: "#b58df1",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#b58df1",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
