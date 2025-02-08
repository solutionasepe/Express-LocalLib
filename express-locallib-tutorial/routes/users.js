const express = require('express');
const router = express.Router();
const user_controller = require("../controllers/userController");
const auth_middleware = require('../middleware/authmiddleware');

/* GET users listing. */
router.post('/signup', user_controller.userSignup);

router.get('/list', user_controller.userList);

router.post('/login', user_controller.userLogin);

router.get('/dashboard', auth_middleware.Verify ,(req, res)=>{
  res.json({message: `welcome Asepe!`});
});

router.get('/admindashboard',  auth_middleware.VerifyRole("admin"), function(req, res){
  res.status(200).json({message:"Welcome to admin portal"});
})
module.exports = router;
