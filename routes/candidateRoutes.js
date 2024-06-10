const express = require('express')
const router = express.Router()
const User = require('../models/user')
const {jwthauthmiddleware,generatetoken } = require('../jwt')

//POST method of User
router.post('/signup' , async(req,res)=>{

    try {
      const data = req.body 
      const NewUser = new User(data);
         
      const response = await NewUser.save();
      console.log('data saved successfully :')

      const payload = {
        id:response.id
      }

      console.log(JSON.stringify(payload));
      
      const token = generatetoken(payload);
      console.log('token is :',token);

      res.status(200).json({response : response , token :token});

      
    } catch (error) {
      console.log(error);
      res.status(500).json({error :'Internal Server Error'})
    }
  })



  // Login Route
router.post('/login', async(req, res) => {
    try{
        // Extract aadharCardNumber and password from request body
        const {aadharCardNumber, password} = req.body;

        // Find the user by username
        const user = await User.findOne({aadharCardNumber: aadharCardNumber});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
        }

        const token = generatetoken(payload);
        // resturn token as response
        res.json({token})

    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Profile route
router.get('/profile', jwthauthmiddleware, async (req, res) => {
    try{
        const userData = req.user;
        const userId = userData.id;

        const user = await User.findById(userId);
        res.status(200).json({user});

    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})



  router.put('/profile/password' , async(req,res)=>{

    try {

      const userId = req.user.id;
      const{currentpassword , newpassword} = req.body

      const user = await User.findById(userId)

      if(!(await user.comparePassword(currentpassword))){
        return res.status(401).json({error: 'Invalid  password'});
    }

    user.password = newpassword;
    await user.save()

      console.log("password updated");
      res.status(200).json({message : 'password updated'})

    } catch (error) {
      console.log(error);
      res.status(500).json({error :'Internal Server Error'})
      
    }
  })



  

  



  module.exports = router
  
  