import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import AddDishScreen from './screens/AddDishScreen';
import FilterScreen from './screens/FilterScreen';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
  image?: string;
}

type Screen = 'splash' | 'home' | 'addDish' | 'filter';

const INITIAL_DISHES: MenuItem[] = [
  {
    id: '1',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon butter sauce',
    course: 'Dinner',
    price: 185,
    image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800',
  },
  {
    id: '2',
    name: 'French Toast',
    description: 'Served with berries, maple syrup and whipped cream',
    course: 'Breakfast',
    price: 85,
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800',
  },
];

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_DISHES);

  const handleSplashFinish = () => setCurrentScreen('home');
  const goHome = () => setCurrentScreen('home');
  const goToAddDish = () => setCurrentScreen('addDish');
  const goToFilter = () => setCurrentScreen('filter');

  const addMenuItem = (
    name: string,
    description: string,
    course: string,
    price: number,
    imageUrl?: string
  ) => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name,
      description,
      course,
      price,
      image: imageUrl,
    };
    setMenuItems((prev) => [...prev, newItem]);
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  switch (currentScreen) {
    case 'splash':
      return <SplashScreen onFinish={handleSplashFinish} />;

    case 'addDish':
      return <AddDishScreen onAddDish={addMenuItem} onCancel={goHome} />;

    case 'filter':
      return (
        <FilterScreen
          items={menuItems}
          onBack={goHome}
          onDeleteItem={deleteMenuItem}
        />
      );

    case 'home':
    default:
      return (
        <View style={styles.container}>
          <HomeScreen
            menuItems={menuItems}
            onAddPress={goToAddDish}
            onDeleteItem={deleteMenuItem}
            onFilterPress={goToFilter}
          />
        </View>
      );
  }
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;
