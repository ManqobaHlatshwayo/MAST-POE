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
    description: 'Fresh Atlantic salmon with lemon butter sauce and herbs',
    course: 'Dinner',
    price: 185.0,
    image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800',
  },
  {
    id: '2',
    name: 'Eggs Benedict',
    description: 'Poached eggs on English muffin with hollandaise sauce',
    course: 'Breakfast',
    price: 95.0,
    image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=800',
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Romaine with parmesan, croutons and Caesar dressing',
    course: 'Lunch',
    price: 75.0,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800',
  },
  {
    id: '4',
    name: 'Chocolate Lava Cake',
    description: 'Warm cake with molten center, vanilla ice cream',
    course: 'Dessert',
    price: 65.0,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800',
  },
  {
    id: '5',
    name: 'French Toast',
    description: 'Maple syrup, berries and whipped cream',
    course: 'Breakfast',
    price: 85.0,
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800',
  },
  {
    id: '6',
    name: 'Beef Steak',
    description: 'Ribeye with garlic butter and roasted vegetables',
    course: 'Dinner',
    price: 225.0,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800',
  },
];

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_DISHES);

  const handleSplashFinish = () => setCurrentScreen('home');
  const navigateToAddDish = () => setCurrentScreen('addDish');
  const navigateToHome = () => setCurrentScreen('home');
  const navigateToFilter = () => setCurrentScreen('filter');

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
    setMenuItems(prev => [...prev, newItem]);
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const computeAverages = (items: MenuItem[]): Record<string, number> => {
    const sums: Record<string, { total: number; count: number }> = {};
    items.forEach(item => {
      const course = item.course || 'Unknown';
      if (!sums[course]) sums[course] = { total: 0, count: 0 };
      sums[course].total += item.price;
      sums[course].count += 1;
    });
    const result: Record<string, number> = {};
    Object.keys(sums).forEach(course => {
      result[course] = sums[course].total / sums[course].count;
    });
    return result;
  };

  const averages = computeAverages(menuItems);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onFinish={handleSplashFinish} />;
      case 'home':
        return (
          <HomeScreen
            menuItems={menuItems}
            averages={averages}
            onAddPress={navigateToAddDish}
            onDeleteItem={deleteMenuItem}
            onFilterPress={navigateToFilter}
          />
        );
      case 'addDish':
        return <AddDishScreen onAddDish={addMenuItem} onCancel={navigateToHome} />;
      case 'filter':
        return (
          <FilterScreen
            items={menuItems}
            onBack={navigateToHome}
            onDeleteItem={deleteMenuItem}
          />
        );
      default:
        return (
          <HomeScreen
            menuItems={menuItems}
            averages={averages}
            onAddPress={navigateToAddDish}
            onDeleteItem={deleteMenuItem}
            onFilterPress={navigateToFilter}
          />
        );
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
};

const styles = StyleSheet.create({ container: { flex: 1 } });

export default App;
