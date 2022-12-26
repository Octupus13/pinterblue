const connection = require("../services/database");
const bcrypt = require("bcrypt");

// const editMyProfileById = async (req, res) => {
//   const id = req.user.id;
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   await connection.query("UPDATE `users` SET `first_name` = ?, `last_name` = ? WHERE (`id` = ?);", [firstName, lastName, id])
//   res.status(200).json({message: "Your profile has been updated."});
// }

// const editMyPasswordById = async (req, res) => {
//   const id = req.user.id;
//   const password = req.body.password;
//   const hashPwd = await bcrypt.hash(password, 10)
//   await connection.query("UPDATE `users` SET `password` = ? WHERE (`uid` = ?);", [hashPwd, id])
//   res.status(200).json({message: "Your password has been updated."});
// }

/*---------------/users/getMy-----------------*/
const getMyProfile = async (req, res) => {
  const id = req.user.id;
  const [users] = await connection.query("SELECT uid,username,email FROM users where uid = ?", [id]);
  console.log(users[0]);
  res.status(200).json(users[0]);
}

module.exports = {
  // editMyProfileById,
  // editMyPasswordById,
  getMyProfile
}