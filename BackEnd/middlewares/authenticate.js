const jwt = require("jsonwebtoken");

// So this is my Identifier, My identifier will do three things, it will check if the user is logged-in(Authenticated), it will check if the user is Admin or Employee, and it will check if the Employee is verified

exports.identifier = (req, res, next) => {
  const token = req.body.Authorization;
  console.log("The token is ", token);
  //   let token;
  //   console.log("THe cookeis are ", req.cookies);

  //   if (req.headers.client === "not-browser") {
  //     token = req.headers.authorization;
  //   } else {
  //     // token = req.cookies['Authorization'];
  //     req.cookies.Authorization;
  //   }

  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "Please log in first" });
  }

  try {
    // const userToken = token.split(" ")[1];
    const userToken = token;
    const jwtVerified = jwt.verify(userToken, process.env.TOKEN_SECRET);
    if (jwtVerified) {
      req.user = jwtVerified;
      if (req.user.role === "admin") {
        return next();
      }
      if (req.user.role === "employee") {
        if (!req.user.verified) {
          return res.status(403).json({
            success: false,
            message: "You are not verified. Please contact the admin.",
          });
        }
        return next();
      }

      return res.status(403).json({
        success: false,
        message: "Unauthorized role. Access denied.",
      });
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
