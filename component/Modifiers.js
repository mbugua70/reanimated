import Animated, {
  useSharedValue,
  withTiming,
  withRepeat,
  useAnimatedStyle,
  withSequence,
} from "react-native-reanimated";
import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";

const Modifiers = () => {
  const offset = useSharedValue(0);

  const OFFSET = 40;
  const TIME = 250;

  function handlePress() {
    // offset.value = withRepeat(withTiming(OFFSET),5, true);
    offset.value = withSequence(
        // start from -OFFSET
        withTiming(-OFFSET, {duration: TIME / 2}),
        // SHAKE BTN OFFSET -OFFSET AND OFFSET
        withRepeat(withTiming(OFFSET, {duration: TIME}), 5, true),
        // going back to 0 after the animation
        withRepeat(withTiming(0, {duration: TIME / 2}))

    )

  }

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <View>
      {/* MODIFIER  */}
      <Text>Modifier</Text>
      <Animated.View style={[style, styles.box]} />
      <Button onPress={handlePress} title='Click me' />
    </View>
  );
};

export default Modifiers;

const styles = StyleSheet.create({

  box: {
    width: 100,
    height: 100,
    margin: 50,
    borderRadius: 15,
    backgroundColor: "#b58df1",
  },
});

// Animation modifiers
// the three animation modifier are withRepeat, withDelay, withSequence

// withRepeat animation
//let's you repeat the animation
// this is by passing a number to the second parameter of the the withRepeat.
// to repeat continuously we pass non number like 0 or negative -1
// to make an animation go back and fourth we can pass the boolean true as the third parameter.


//withSequence
// help running animation in sequence
// start your animation on the left and let it finish or reset it back to the position where it started/
// let you chain animation together.


// withDelay
// used to delay animation
// takes duration as the first argument and then the animation to delay
//example

// const handlePress = () => {
//     offset.value = withDelay(
//       DELAY,
//       withSequence(
//         // start from -OFFSET
//         withTiming(-OFFSET, { duration: TIME / 2 }),
//         // shake between -OFFSET and OFFSET 5 times
//         withRepeat(withTiming(OFFSET, { duration: TIME }), 5, true),
//         // go back to 0 at the end
//         withTiming(0, { duration: TIME / 2 })
//       )
//     );
//   };
