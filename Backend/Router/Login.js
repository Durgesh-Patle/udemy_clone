// Login Form.
let express=require('express');
let User=require('../model/User')
let router=express.Router();
let jwt=require('jsonwebtoken')
let bcypt= require("bcryptjs")

router.post('/login', async (req, res) => {
    let user = req.body;
    // console.log(user);
    let data = await User.findOne({ Email: user.Email });
    if (data) {
        // let validPass = await data.Password == user.Password;
        let validPass = await bcypt.compare(user.Password, data.Password)

        if (validPass) {
            // JWT token generate........
            let token = jwt.sign({ data: data.Email, role: data.role }, 'nsjbjbsbusuhwihiwh', { expiresIn: '1h' });
            console.log(token ,"JWt tokennn");
            res.send({token,msg:"Loginn SuccessFully....!!"});
        } else {
            res.send('Invalid Password');
        }
    } else {
        res.send("Please First registeration and then Login")
    }
})

module.exports=router;