import userModel from '../models/userModel.js'
import { hashPassword } from '../utils/authHelper.js';

export const registerController = async(req, res) => {
  try {
    const {name, email, password, phone, address} = req.body;
    // validation
    if(!name){
      return res.send({ error: 'Name is required'})
    }
    if(!email){
      return res.send({ error: 'Email is required'})
    }
    if(!password){
      return res.send({ error: 'Password is required'})
    }
    if(!address){
      return res.send({ error: 'Address is required'})
    }
    if(!phone){
      return res.send({ error: 'Phone is required'})
    }
    // check user
    const exisitingUser = await userModel.findOne({email});
    // existing user
    if(exisitingUser){
      return res.status(200).send({ success: true,
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

// export default {registerController};