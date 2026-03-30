const bcrypt = require('bcrypt')
const User =require('../models/User.js')

const registerUser = async (req, res) => {
  try {
    const userInDatabase = await User.exists({email: req.body.email})
    if(userInDatabase){
      return res.send('Username already taken❗')
    }
    if(req.body.password !== req.body.confirmPassword){
      return res.send('❌ Password and confirm Password must match')
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12)

    await User.create({
      userName: req.body.userName,
      email: req.body.email,
      phoneNum: req.body.phoneNum,
      password: hashedPassword,
      address: req.body.address,
      role: req.body.role || 'user'
    })

    res.send('🙏 Thanks for signing up!')

  } catch (error) {
    console.error('⚠️ An error has occurred registering a user!', error.message)
  }
}



const signInUser = async(req,res)=>{
  try{
    const user = await User.findOne({ email: req.body.email})

    if(!user){
      return res.send('❌ No user has been registered with that email. Please sign up!')
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    )

    if(!validPassword){
      return res.send('❌ Incorrect password! Please try again.')
    }

    req.session.user ={
      email: user.email,
      _id: user._id
    }

    req.session.save(()=>{
      res.send(`Thanks for signing in, ${user.userName}✨`)
    })

  } catch (error) {
    console.error('⚠️ An error has occurred signing in a user!', error.message)
  }
}

const signOutUser = (req, res)=>{
  try {
    req.session.destroy(()=>{
      res.redirect('/')
    })

  } catch (error) {
    console.error('⚠️ An error has occurred signing out a user!', error.message)
  }
}

const updatePassword = async(req,res)=>{
  try {
    const user = await User.findById(req.params.id)
    if(!user){
      return res.send('❌ No user with that ID exists!')
    }

    res.send(`User ${user.userName} ready to update password ✨`)

  } catch (error) {
    console.error('⚠️ An error has occurred updating password a user!', error.message)
  }
}


module.exports ={
  registerUser,
  signInUser,
  signOutUser,
  updatePassword
}
