import { Router } from 'express';
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  rateRecipe,
  toggleFavorite,
  getCategories
} from '../controllers/recipeController.js';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/', getAllRecipes);
router.get('/categories', getCategories);
router.get('/:id', getRecipeById);

// Authenticated user routes
router.post('/:id/rate', isAuthenticated, rateRecipe);
router.post('/:id/favorite', isAuthenticated, toggleFavorite);

// Admin only routes
router.post('/', isAdmin, createRecipe);
router.put('/:id', isAdmin, updateRecipe);
router.delete('/:id', isAdmin, deleteRecipe);

export default router;
