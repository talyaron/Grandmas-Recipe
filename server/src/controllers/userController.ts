import { Request, Response } from 'express';
import { User } from '../models/User.js';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('email fullName role createdAt');
    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Error loading users' });
  }
};

export const getUserFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.cookies.userId;
    if (!userId) {
      res.status(401).json({ message: 'Please login' });
      return;
    }

    const user = await User.findById(userId).populate('favorites');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user.favorites);
  } catch (error) {
    console.error('Get user favorites error:', error);
    res.status(500).json({ message: 'Error loading favorites' });
  }
};
