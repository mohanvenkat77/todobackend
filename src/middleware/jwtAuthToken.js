const jwt = require("jsonwebtoken");

const jwtAuthToken = (newdata) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  let payload = {
    user: {
      id: newdata.id,
      name:newdata.name,
    },
  };

  const token = jwt.sign(payload, secretKey);

  return token;
};
module.exports = jwtAuthToken;
