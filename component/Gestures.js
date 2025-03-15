import { View, Text, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  withDecay,
} from "react-native-reanimated";
import React from "react";

const SIZE = 120;
const BOUNDARY_OFFSET = 50;

const Gestures = () => {
  const isPressed = useSharedValue(false);
  const isPanPressed = useSharedValue(false);
  const offset = useSharedValue(0);
  const offsetDecay = useSharedValue(0);
  const width = useSharedValue(0);

  const onLayout = (event) => {
    width.value = event.nativeEvent.layout.width;
  };

  const tap = Gesture.Tap()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  const pan = Gesture.Pan()
    .onBegin(() => {
      isPanPressed.value = true;
    })
    .onChange((event) => {
      offset.value = event.translationX;
    })
    .onFinalize(() => {
      offset.value = withSpring(0);
      isPanPressed.value = false;
    });

  const panDecay = Gesture.Pan()
    .onChange((event) => {
      offsetDecay.value = event.changeX;
    })
    .onFinalize((event) => {
      offsetDecay.value = withDecay({
        velocity: event.velocityX,
        rubberBandEffect: true,
        clamp: [
          -(width.value / 2) + SIZE / 2 + BOUNDARY_OFFSET,
          width.value / 2 - SIZE / 2 - BOUNDARY_OFFSET,
        ],
      });
    });

  const animateStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(isPressed.value ? 1.2 : 1) }],
    backgroundColor: isPressed.value ? "green" : "red",
  }));

  const animateStylePan = useAnimatedStyle(() => ({
    transform: [
      { scale: withTiming(isPanPressed.value ? 1.2 : 1) },
      { translateX: offset.value },
    ],
    backgroundColor: isPanPressed.value ? "brown" : "red",
  }));

  const animatedStylesDecay = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetDecay.value }],
  }));

  return (
    <View>
      <View>
        <GestureDetector gesture={tap}>
          <Animated.View style={[styles.box, animateStyle]} />
        </GestureDetector>
      </View>
      <View>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box, animateStylePan]} />
        </GestureDetector>
      </View>
      <View onLayout={onLayout}>
        <GestureDetector gesture={panDecay}>
          <Animated.View style={[styles.box, animatedStylesDecay]} />
        </GestureDetector>
      </View>
    </View>
  );
};

export default Gestures;

const styles = StyleSheet.create({
  box: {
    width: SIZE,
    height: SIZE,
    borderWidth: 1,
    borderColor: "#b58df1",
    backgroundColor: "red",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

// react reanimated with gestures
// 1. Tap
// can be accessed through Gesture.Tap()
// you can dfn the behavior of the gesture by chaining them with methods like onBegin, onStart, onEnd, onFinalize

// 2. Pan
//dragging the comp, the comp will return to it's starting position when released

// withDecay
// let you retain some velocity of the gesture and animate deceleration
// That means when you release a grabbed object with some velocity you can slowly bring it to stop


// Animation function
// this are function that let you create animations


// Animation modifiers
// this are function which let customize animation
// they are also called higher-order animation

// withDelay lets you add a delay before the animation starts
// withRepeat lets you repeat an animation certain number of times
// withSequence lets you chain animation one after the other
// withClamp lets you limit the animation boundaries to a specified range

//Animation object
// An animation object is a value returned from animation functions and modifiers which holds the current state of the animation including its start and end conditions, as well as a onFrame function.

// worklet
//Worklets are short-running JavaScript functions that can be run on the UI thread. They can also be run on a JavaScript thread just as you would run a function in your code.


// you can create your own worklet by using worklet directive on top of the function

// to workletize
// To convert a JavaScript function into a serializable object which can be copied and run over on UI thread.

//UI thread
// are responsible for handling userinterface, also called main Thread.