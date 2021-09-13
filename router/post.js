const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const Post = require('../models/post')
const {isLoggedIn} = require('../middleware/auth')
const { Hashtag } = require('../models')

const router = express.Router()

try
{
    fs.readdirSync('uploads')
}
catch(error)
{ 
  console.log('upload 폴더가 없어서 새로 만듭니다.')
   fs.mkdirSync('uploads')
}

const upload = multer({
  storage : multer.diskStorage({

    destination(req,file,cb)
    {
      cb(null,'uploads/')
    },
    filename(req,file,cb)
    {
      const ext = path.extname(file.originalname)
      cb(null, path.basename(file.originalname,ext) + Date.now() + ext) 
    }
  }
  ),
  limits : {fileSize : 5 * 1024 * 1024}
})

router.post('/img', isLoggedIn, upload.single('img'), (req,res,next) => {
  console.log(req.file)
  res.json({url : `/img/${req.file.filename}`})
})
// 이미지랑 게시글을 따로 받는데 좋을때도 있다. 이미지 압축이 필요할때 시간이 걸리므로 게시글 먼저 업로드 시키는것도 괜찮다. 
// 보통 이미지 동영상 먼저 업로드 하고 게시글은 나중에 한다.
const upload2 = multer() 
router.post('/', isLoggedIn, upload2.none(), async (req,res,next) => {

  try
  {
    console.log('여기까지는 도착!')
    const post = await Post.create({
      content : req.body.content, 
      img : req.body.url, 
      UserId : req.user.id
    })
    const hashtags = req.body.content.match(/#[^\s#]+/g); // 정규표현식 공부해보기 
    if(hashtags)
    {
      const result = await Promise.all(
        hashtags.map(tag => {
          return Hashtag.findOrCreate({  //upsert도 생각해보자 
            where : { title : tag.slice(1).toLowerCase()}
          })
        })
      )
      await post.addHashtags(result.map(r => r[0]))
    }

    res.redirect('/')

  }
  catch(error)
  {
    console.error(error)
    next(error)
  }
})

module.exports = router