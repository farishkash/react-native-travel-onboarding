import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
  Text,
} from 'react-native';

import { images } from '../constants';
import DescriptionText from '../components/DescriptionText';
import TitleText from '../components/TitleText';

const { width, height } = Dimensions.get('window');
const { travel01, travel02, travel03, logo } = images;

const scrollX = new Animated.Value(0);

const OnboardScreen = () => {
  const onboardInfo = [
    {
      title: 'Design Your Vacation',
      description:
        'Our smart planning AI will guide you to create the ultimate dream vacation',
      img: travel01,
    },
    {
      title: 'Travel the world',
      description:
        'Our smart planning AI will handle travel arrangements while optimizing costs',
      img: travel02,
    },
    {
      title: 'Arrive back home',
      description:
        'Our smart planning AI will make sure you get home quickly and securely',
      img: travel03,
    },
  ];
  React.useEffect(() => {
    scrollX.addListener(({ value }) => {
      // if (Math.floor(value / width) === onboardInfo.length - 1) {
      // }
    });

    return () => scrollX.removeListener();
  }, []);
  // function renderOnboardbutton() {
  //   return (
  //     <View>
  //       <TitleText>Let's Go!</TitleText>
  //     </View>
  //   );
  // }
  function renderBoarding() {
    return (
      <View>
        <View style={styles.logoContainer}>
          <Image
            source={logo}
            resizeMode="contain"
            style={{
              width: height > 700 ? width * 0.95 : width * 0.75,
              height: height > 700 ? height * 0.95 : width * 0.75,
              marginTop: height > 700 ? 90 : 25,
            }}
          />
        </View>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEnabled
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        >
          {onboardInfo.map((item, index) => {
            return (
              <View key={index} style={styles.mainContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    source={item.img}
                    resizeMode="contain"
                    style={{
                      width: width,
                      height: height,
                      marginBottom: height > 700 ? 50 : 25,
                    }}
                  />
                </View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: height > 700 ? '7.5%' : '5.5%',
                    textAlign: 'center',
                    left: 40,
                    right: 40,
                  }}
                >
                  <TitleText
                    style={{
                      textAlign: 'center',
                      fontSize: height > 700 ? 30 : 24,
                    }}
                  >
                    {item.title}
                  </TitleText>
                  <DescriptionText
                    style={{ textAlign: 'center', fontSize: 14, marginTop: 5 }}
                  >
                    {item.description}
                  </DescriptionText>
                </View>
              </View>
            );
          })}
        </Animated.ScrollView>
      </View>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, width);
    return (
      <View style={styles.dotsContainer}>
        {onboardInfo.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });
          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [10, 24, 10],
            extrapolate: 'clamp',
          });
          const dotHeight = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [5, 10, 5],
            extrapolate: 'clamp',
          });

          const dotColor = dotPosition.interpolate({
            inputRange: [0, 1, 2],
            outputRange: ['#2F2F41', '#585A89', '#D6D3FF'],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              opacity={opacity}
              style={[
                styles.dots,
                {
                  width: dotWidth,
                  height: dotHeight,
                  backgroundColor: dotColor,
                },
              ]}
              key={`dot-${index}`}
            />
          );
        })}
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.onboardContainer}>
      <View style={styles.renderBoardContainer}>{renderBoarding()}</View>
      <View style={styles.renderDotsContainer}>{renderDots()}</View>
      {/* <View style={styles.renderDotsContainer}>{renderOnboardbutton()}</View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  onboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDFDFD',
  },
  renderBoardContainer: {
    flex: 1,
    marginVertical: 30,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    width: width,
    height: height * 0.75,
  },
  dots: {
    borderRadius: 12,
    marginHorizontal: 6,
    marginVertical: 15,
  },
  dotsContainer: {
    flexDirection: 'row',
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderDotsContainer: {
    position: 'absolute',
    bottom: height > 700 ? '30%' : '25%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDFDFD',
    fontFamily: 'Roboto-Bold',
    margin: 0,
    height: height * 25,
  },
  logoContainer: {
    marginTop: height > 700 ? 35 : 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height > 700 ? 50 : 0,
  },
});
export default OnboardScreen;
