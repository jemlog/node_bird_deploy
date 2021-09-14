const { isLoggedIn } = require('../middleware/auth')
const User = require('../models/user')
const express = require('express')

const router = express.Router()

// POST /user/1/follow
router.post('/:id/follow', isLoggedIn, async (req,res,next) => {

  try{
    const user = await User.findOne({where : {id : req.user.id}})  // 내가 
    if(user)
    {
      await user.addFollowings([parseInt(req.params.id, 10)])  // 1번 사용자를 팔로우 할꺼야 addFollowing 등을 할때는 직접 추가보다 아이디를 추가해주자
      res.send('success')
    }
    else
    {
      res.status(404).send('no user')
    }
  }
  catch(error)
  {
    console.log(error)
    next(error)
  }

})

module.exports = router;