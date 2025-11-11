import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import AddDishScreen from './screens/AddDishScreen';
import FilterScreen from './screens/FilterScreen';

/*
Code Attribution
Author: React Native Team
Title: Using useState for State Management
Source: React Native Documentation
URL: https://reactnative.dev/docs/state
Date Accessed: 2025-01-20

Code Attribution
Author: React Navigation Community
Title: Basic Navigation Pattern (Switching Screens)
Source: React Navigation Concepts
URL: https://reactnavigation.org/docs/getting-started
Date Accessed: 2025-01-20
*/

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
  // Breakfast (3)
  {
    id: '1',
    name: 'French Toast',
    description: 'Served with berries, maple syrup and whipped cream',
    course: 'Breakfast',
    price: 85,
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'Omelette Deluxe',
    description: 'Egg omelette with spinach, feta cheese, and tomatoes',
    course: 'Breakfast',
    price: 70,
    image: 'https://images.unsplash.com/photo-1677844592730-ce9c936d8f1a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870',
  },
  {
    id: '3',
    name: 'Pancake Stack',
    description: 'Fluffy pancakes topped with syrup and butter',
    course: 'Breakfast',
    price: 78,
    image: 'https://images.unsplash.com/photo-1612182062633-9ff3b3598e96?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=719',
  },

  // Lunch (3)
  {
    id: '4',
    name: 'Caesar Chicken Wrap',
    description: 'Grilled chicken, crispy lettuce, and parmesan in a soft wrap',
    course: 'Lunch',
    price: 95,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    name: 'Beef Burger',
    description: 'Juicy grilled beef patty with cheese and chips',
    course: 'Lunch',
    price: 120,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '6',
    name: 'Greek Salad',
    description: 'Fresh tomatoes, cucumber, olives, and feta',
    course: 'Lunch',
    price: 85,
    image: 'https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=679',
  },

  // Dinner (3)
  {
    id: '7',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon butter sauce',
    course: 'Dinner',
    price: 185,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870',
  },
  {
    id: '8',
    name: 'Steak & Mash',
    description: 'Sirloin steak with creamy mashed potatoes',
    course: 'Dinner',
    price: 210,
    image: 'https://media.istockphoto.com/id/1349299883/photo/traditional-steak-and-mashed-potatoes.jpg?s=1024x1024&w=is&k=20&c=mqUa1HpoddzdFJO1B4TuPAG_TiXTTKAwZ7ijs5oKYSk=',
  },
  {
    id: '9',
    name: 'Roast Chicken Plate',
    description: 'Herb-roasted chicken with mixed vegetables',
    course: 'Dinner',
    price: 140,
    image: 'https://images.unsplash.com/photo-1615557960916-5f4791effe9d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774',
  },

  // Dessert (3)
  {
    id: '10',
    name: 'Chocolate Brownie',
    description: 'Rich chocolate brownie with chocolate ice cream',
    course: 'Dessert',
    price: 65,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
  },
  {
    id: '11',
    name: 'Cheesecake Slice',
    description: 'Creamy vanilla cheesecake with blueberry topping',
    course: 'Dessert',
    price: 75,
    image: 'https://plus.unsplash.com/premium_photo-1723662171860-0988459c1ef4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870',
  },
  {
    id: '12',
    name: 'Ice Cream Sundae',
    description: 'Vanilla ice cream topped with chocolate and nuts',
    course: 'Dessert',
    price: 55,
    image: 'https://images.unsplash.com/photo-1657225953401-5f95007fc8e0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=869',
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

  // === Required Loops for PoE ===

  // while loop → count total items
  let totalItems = 0;
  let i = 0;
  while (i < menuItems.length) {
    totalItems++;
    i++;
  }

  // for loop → group menu items by course
  const grouped: { [course: string]: MenuItem[] } = {};
  for (let j = 0; j < menuItems.length; j++) {
    const item = menuItems[j];
    if (!grouped[item.course]) {
      grouped[item.course] = [];
    }
    grouped[item.course].push(item);
  }

  // for...in loop → calculate average price per course
  const averagePrices: { [course: string]: number } = {};
  for (const course in grouped) {
    const dishes = grouped[course];
    let sum = 0;
    for (let k = 0; k < dishes.length; k++) {
      sum += dishes[k].price;
    }
    averagePrices[course] = sum / dishes.length;
  }

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
            totalItems={totalItems}
            averagePrices={averagePrices}
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
