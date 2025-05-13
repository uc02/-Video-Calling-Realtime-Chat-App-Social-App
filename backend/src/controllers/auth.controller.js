import { upsertStreamUser } from "../lib/stream";
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export async function signup(req,res){
  const { email, password, fullName } = req.body;

  try {
    if(!email || !password || !fullName){
      return res.status(404).json({ message: 'All fields are required'})
    }

    if(password.length < 6){
      return res.status(400).json({ message: 'password should be min 6 characters'})
    }

    const emailRegex = /^[^\s@]+@^\s@]+\.[^\s@]+$/;
    if(!emailRegex){
      return res.status(400).json({ message: 'invalid email format'})
    }

    const existingUser = await User.findOne({ email });
    if(existingUser){
      return res.status(404).json({ message: 'email already exists, please use different one'})
    }

    
  } catch (error) {
    
  }
}