const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;
        if (!userName || !email || !password) return res.status(400).json({ msg: "missing data" });

    const existUser = await User.findOne({email});
    if(existUser) return res.status(400).json({msg: "user is existed"});

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        userName,
        email,
        password: hashPassword,
        role
    });

    res.status(201).json({
        msg: "user is created",
        data: user
    });

    } catch (error) {
        console.log(error);
    }
}


const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ msg: "missing data" });

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'not found' });
        }

        res.status(200).json({
            msg: "user login",
            data: { email, isMatch }
        })

    } catch (error) {
        console.log(error);
    }

}



module.exports = {register, logIn};