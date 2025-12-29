import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User.js';
import { Recipe } from './models/Recipe.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    const forceReseed = process.argv.includes('--force');

    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/savta-rina';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Clear existing data if --force flag is used
    if (forceReseed) {
      console.log('Force flag detected - clearing existing data...');
      await Recipe.deleteMany({});
      await User.deleteMany({});
      console.log('Existing data cleared');
    }

    // Create admin user
    const existingAdmin = await User.findOne({ email: 'admin@rina.com' });
    if (!existingAdmin) {
      const admin = new User({
        email: 'admin@rina.com',
        fullName: 'System Admin',
        password: 'IAmAdmin19296157#',
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user created: admin@rina.com');
    } else {
      console.log('Admin user already exists');
    }

    // Create sample recipes
    const existingRecipes = await Recipe.countDocuments();
    if (existingRecipes === 0) {
      const sampleRecipes = [
        {
          title: "Grandma's Chocolate Cake",
          category: 'Desserts',
          ingredients: ['2 cups flour', '1 cup sugar', '3/4 cup cocoa powder', '2 eggs', '1 cup oil', '1 cup boiling water'],
          instructions: ['Mix the dry ingredients', 'Add eggs and oil', 'Add boiling water and mix well', 'Bake at 180°C for 35 minutes'],
          prepTime: 50,
          difficulty: 2,
          imageUrl: '',
          isYemeni: false,
          kosherType: 'Parve'
        },
        {
          title: 'Chicken Soup with Dumplings',
          category: 'Soups',
          ingredients: ['1 whole chicken', '3 carrots', '2 onions', 'celery', 'parsley', 'salt and pepper'],
          instructions: ['Cook the chicken in water', 'Add vegetables', 'Simmer for 2 hours', 'Add dumplings'],
          prepTime: 150,
          difficulty: 3,
          imageUrl: '',
          isYemeni: false,
          kosherType: 'Meat'
        },
        {
          title: 'Homemade Hummus',
          category: 'Appetizers',
          ingredients: ['2 cups dried chickpeas', 'tahini', 'lemon', 'garlic', 'cumin', 'olive oil'],
          instructions: ['Soak chickpeas overnight', 'Cook until soft', 'Blend with other ingredients', 'Serve with olive oil'],
          prepTime: 30,
          difficulty: 2,
          imageUrl: '',
          isYemeni: false,
          kosherType: 'Parve'
        },
        {
          title: 'Crispy Schnitzel',
          category: 'Main Courses',
          ingredients: ['chicken breast', 'flour', 'eggs', 'breadcrumbs', 'oil for frying'],
          instructions: ['Cut breast into slices', 'Coat in flour, egg, and breadcrumbs', 'Fry in hot oil'],
          prepTime: 30,
          difficulty: 1,
          imageUrl: '',
          isYemeni: false,
          kosherType: 'Meat'
        },
        {
          title: 'Fresh Garden Salad',
          category: 'Salads',
          ingredients: ['tomatoes', 'cucumbers', 'onion', 'parsley', 'lemon', 'olive oil'],
          instructions: ['Dice vegetables into small cubes', 'Mix together', 'Season with lemon and oil'],
          prepTime: 15,
          difficulty: 1,
          imageUrl: '',
          isYemeni: false,
          kosherType: 'Parve'
        },
        // New categories
        {
          title: 'Roasted Potatoes',
          category: 'Side Dishes',
          ingredients: ['potatoes', 'olive oil', 'garlic', 'rosemary', 'salt', 'pepper'],
          instructions: ['Cut potatoes into cubes', 'Toss with oil and seasonings', 'Roast at 200°C for 40 minutes'],
          prepTime: 50,
          difficulty: 1,
          imageUrl: '',
          isYemeni: false,
          kosherType: 'Parve'
        },
        {
          title: 'Homemade Challah',
          category: 'Baked goods',
          ingredients: ['4 cups flour', '1/4 cup sugar', '2 tsp yeast', '2 eggs', '1/3 cup oil', 'warm water'],
          instructions: ['Mix yeast with warm water', 'Add flour, sugar, eggs, and oil', 'Knead until smooth', 'Let rise, braid, and bake at 180°C'],
          prepTime: 120,
          difficulty: 3,
          imageUrl: '',
          isYemeni: false,
          kosherType: 'Parve'
        },
        {
          title: 'Quinoa Veggie Bowl',
          category: 'Healthy & Tasty',
          ingredients: ['quinoa', 'chickpeas', 'avocado', 'cherry tomatoes', 'cucumber', 'lemon tahini dressing'],
          instructions: ['Cook quinoa', 'Chop vegetables', 'Arrange in bowl with chickpeas', 'Drizzle with dressing'],
          prepTime: 25,
          difficulty: 1,
          imageUrl: '',
          isYemeni: false,
          kosherType: 'Parve'
        },
        // Yemeni recipes
        {
          title: 'Yemeni Jachnun',
          category: 'Baked goods',
          ingredients: ['4 cups flour', '1 tbsp sugar', '1 tsp salt', 'butter', 'water'],
          instructions: ['Make dough with flour, sugar, salt, and water', 'Roll thin and brush with butter', 'Roll up and bake overnight at low heat'],
          prepTime: 480,
          difficulty: 4,
          imageUrl: '',
          isYemeni: true,
          kosherType: 'Parve'
        },
        {
          title: 'Yemeni Soup (Marak)',
          category: 'Soups',
          ingredients: ['lamb or chicken', 'potatoes', 'tomatoes', 'hawaij spice', 'cumin', 'turmeric'],
          instructions: ['Brown meat with spices', 'Add water and vegetables', 'Simmer for 2-3 hours'],
          prepTime: 180,
          difficulty: 2,
          imageUrl: '',
          isYemeni: true,
          kosherType: 'Meat'
        },
        {
          title: 'Yemeni Zhug',
          category: 'Side Dishes',
          ingredients: ['fresh cilantro', 'green chilies', 'garlic', 'cumin', 'cardamom', 'olive oil'],
          instructions: ['Blend all ingredients together', 'Adjust spice level to taste', 'Store in refrigerator'],
          prepTime: 10,
          difficulty: 1,
          imageUrl: '',
          isYemeni: true,
          kosherType: 'Parve'
        }
      ];

      await Recipe.insertMany(sampleRecipes);
      console.log('Sample recipes created');
    } else {
      console.log('Recipes already exist');
    }

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
