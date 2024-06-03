import User from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import 'dotenv/config.js'
import jwt from 'jsonwebtoken'
import { handleResponseSuccess, handleResponseError } from '../utils/response.js'

const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1d' })
}

const register = async (req, res) => {
  const { email, password } = req.body
  console.log({ email, password })
  if (!email || !password) {
    handleResponseError(res, 400, "Bad request. All fields required")
    return
  }
  const existEmail = await User.findOne({email})
  if (existEmail) {
    handleResponseError(res, 400, "Email already exists")
    return
  }
  const saltRound = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, saltRound)
  try {
    const data = await User.create({ email, password: hashedPassword })
    console.log("data", data);
    handleResponseSuccess(res, 201, "Registration successful", { email: data.email, role: data.role})
  } catch (error) {
    console.log("error", error);
    handleResponseError(res, 500, "Internal server error")
  }
}

const login = async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) {
        handleResponseError(res, 400, "Bad request. All fields required")
        return
    }
    const checkEmailUser = await User.findOne({ email })
    console.log("checkEmailUser", checkEmailUser);
    if (!checkEmailUser) {
        handleResponseError(res, 401, "Email is incorrect")
        return
    }
    const checkPasswordUser = await bcrypt.compare(password, checkEmailUser.password)
    if (!checkPasswordUser) {
        handleResponseError(res, 401, "Password is incorrect")
        return
    }
    const accessToken = generateAccessToken(checkEmailUser)
    handleResponseSuccess(res, 200, "Login successfully", { email: checkEmailUser.email, role: checkEmailUser.role, accessToken})
}
  
const logout = (req, res) => {
    handleResponseSuccess(res, 200, "Logout successfully" )
}
  
export { register, logout, login }