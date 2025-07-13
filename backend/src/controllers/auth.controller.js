import User from "../models/user.model.js";
import generateToken from "../lib/jwt.js";
import bcrypt from "bcrypt";
const authController = {
  register: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Please enter all required fields" });
      }

      if (password.length < 8) {
        return res
          .status(400)
          .json({ message: "Password must be at least 8 characters" });
      }

      const user = await User.findOne({ email });

      if (user) {
        return res.status(409).json({ message: "User already exists" });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      if (newUser) {
        generateToken(newUser._id, res);
        await newUser.save();

        return res.status(201).json({
          message: "Registered successfully",
          data: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            avatar: newUser.avatar,
          },
        });
      }
    } catch (error) {
      console.log("Error in register controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Please enter all required fields" });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          message: "Email or password is incorrect, please try again",
        });
      }

      const isMatchPassword = bcrypt.compareSync(password, user.password);

      if (!isMatchPassword) {
        return res.status(404).json({
          message: "Email or password is incorrect, please try again",
        });
      }

      generateToken(user._id, res);

      return res.status(200).json({
        message: "Login successfully",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      });
    } catch (error) {
      console.log("Error in login controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  logout: (req, res) => {
    try {
      res.cookie("courseToken", "", {
        maxAge: 0,
      });
      return res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
      console.log("Error in logout controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  check: (req, res) => {
    try {
      const user = req.user;
      return res.status(200).json({
        message: "Check successfully",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      });
    } catch (error) {
      console.log("Error in check controller", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default authController;
