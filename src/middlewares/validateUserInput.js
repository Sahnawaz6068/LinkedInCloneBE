import validator from "validator";

//User register validation
const userDataValidation = (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    //name check
    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 2 characters long.",
      });
    }
    //EMAIL CHECK
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format.",
      });
    }
    //password checek
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    // Password must be at least 6 characters and strong
    if (password.length < 6 || !validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Please choose a stronger password (min 6 chars, include uppercase, lowercase, number, and symbol).",
      });
    }

    next();
  } catch (error) {
    console.error("Validation Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong during validation.",
    });
  }
};

const logInDataValidation = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format.",
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    next();
  } catch (error) {
    console.error("Validation Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong during validation.",
    });
  }
};

export default { userDataValidation, logInDataValidation};
