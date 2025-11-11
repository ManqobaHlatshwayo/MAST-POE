import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';

/*
Code Attribution
Author: React Team
Title: useEffect Hook
Date Published: 2024
Link/URL: https://react.dev/reference/react/useEffect
Date accessed: 2025-01-20
*/

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.3);

  useEffect(() => {
    // Fade in and scale animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after 3 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

/*
Code Attribution
Author: React Native Community
Title: Animated API
Date Published: 2024
Link/URL: https://reactnative.dev/docs/animated
Date accessed: 2025-01-20
*/

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.chefIcon}>👨‍🍳</Text>
        </View>
        <Text style={styles.title}>ChefCast</Text>
        <Text style={styles.subtitle}>Menu Management Made Easy</Text>
        <View style={styles.divider} />
        <Text style={styles.tagline}>By Chef Christoffel</Text>
      </Animated.View>
    </View>
  );
};

/*
Code Attribution
Author: Unsplash
Title: Free Stock Photos
Date Published: 2024
Link/URL: https://unsplash.com/
Date accessed: 2025-01-20
Note: Images used in INITIAL_DISHES array
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  chefIcon: {
    fontSize: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFE5D9',
    marginBottom: 20,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  tagline: {
    fontSize: 16,
    color: '#fff',
    fontStyle: 'italic',
  },
});

export default SplashScreen;