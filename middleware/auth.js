exports.isLoggedIn = (req,res,next) => {
  if(req.isAuthenticated())
  {
    next()
  }
  else
  {
    res.status(403).send('로그인필요')
  }
}

// exports.''' 를 사용하면 모듈 하나에 묶어서 다 보낼 수 있다. 

exports.isNotLoggedIn = (req,res,next) => {
  if(!req.isAuthenticated())
  {
    next()
  }
  else{
    const message = encodeURIComponent('로그인한 상태입니다')
    res.redirect(`/?error=${message}`)
  }
}