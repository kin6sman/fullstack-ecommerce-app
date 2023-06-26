import { compare } from 'bcrypt';
import userModel from '../models/userModel.js'
import { comparePassword, hashPassword } from '../utils/authHelper.js';
import JWT from 'jsonwebtoken';

export const registerController = async(req, res) => {
  try {
    const {name, email, password, phone, address} = req.body;
    // validation
    if(!name){
      return res.send({ message: 'Name is required'})
    }
    if(!email){
      return res.send({ message: 'Email is required'})
    }
    if(!password){
      return res.send({ message: 'Password is required'})
    }
    if(!address){
      return res.send({ message: 'Address is required'})
    }
    if(!phone){
      return res.send({ message: 'Phone is required'})
    }
    // check user
    const exisitingUser = await userModel.findOne({email});
    // existing user
    if(exisitingUser){
      return res.status(200).send({ success: false,
        error: 'Already Register User, Please login'})
    }
    // register user
    const hashedPassword = await hashPassword(password);
    // save
    const user = await new userModel({name, email, phone, address, password:hashedPassword}).save();

    res.status(201).send({
      success: true,
      message: 'User register Successfully',
      user
    })

  } catch (error) {
    console.log(error.bgred);
    res.status(500).send({
      success: false,
      message: 'Error in Registration',
      error
    })
  }
};


// POST LOGIN
export const loginController = async(req, res) => {
  try {
    
    const {email, password} = req.body;
    // validation
    if(!email || !password){
      return res.status(404).send({
        success: false,
        message: 'Invalid email or password'
      })
    }
    // check user
    const user = await userModel.findOne({email});
    if(!user){
      return res.status(404).send({
        success:false,
        message: "Email is not registered"
      })
    }
    const match = await comparePassword(password, user.password);
    if(!match){
      return res.status(200).send({
        success:false,
        message: "Invalid Password"
      });
    }
    // token
    const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,

      },
      token,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in login',
      error
    })
  }
}


// test 
export const testContoller = (req, res) => {
  try {
    res.send("Protected Routes")
  } catch (error) {
    console.log(error);
    res.send({error});    
  }
}