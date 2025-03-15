import { View, Text, StyleSheet, Button } from "react-native";
import Svg, {Circle, Rect } from "react-native-svg";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring,
  useAnimatedProps,
} from "react-native-reanimated";
import React from "react";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatingStyled = () => {
  const translatedX = useSharedValue(0);
  const r = useSharedValue(10);

  function handleTranslate() {
    translatedX.value = withSpring(translatedX.value + 20);
  }

  function handlePressCircle() {
    r.value += 10;
  }

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(translatedX.value * 2) }],
    };
  });

  const animatedProps = useAnimatedProps(() => ({
    r: withTiming(r.value),
  }));


  return (
    <View style={styles.screen}>
      {/* <Animated.View style={[styles.box, {transform: [{translatedX}]}]} /> */}

      {/* using useAnimatedStyle */}
      <Animated.View style={[styles.box, animatedStyles]} />

      {/*  */}
      <Svg style={styles.svg}>
        <AnimatedCircle
          cx='50%'
          cy='50%'
          fill='#b58df1'
          animatedProps={animatedProps}
        />
      </Svg>

      <Button title='Click me' onPress={handleTranslate} />
      <Button title='Click Circle' onPress={handlePressCircle} />
    </View>
  );
};

export default AnimatingStyled;

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    height: 150,
    backgroundColor: "red",
    width: 200,
  },
  svg: {
    height: 250,
    width: '100%',
  },
});

// useAnimatedStyle lets you access the value stored in a shared value

//useAnimatedProps
// this are value that are passed to the component as the props
