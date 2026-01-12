const authService = require("./auth.service");

const register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(
      req.body.email,
      req.body.password
    );
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
