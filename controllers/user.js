const db = require("../db");
const {collection,addDoc, orderBy, limit, getDocs, query}  = require("firebase/firestore")

const createUser = async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, "Users"), {
      user: req.body.user,
      time: req.body.time,
    });
    console.log(docRef);
    res.sendStatus(200);
  } catch {
    console.log("Error creating user in firestore");
  }
};

const findUser = async (req, res) => {
  const q = query(collection(db, "Users"), orderBy("time"), limit(5));
  const findUser = await getDocs(q);
  let usersArr = [];
  findUser.forEach((doc) => {
    usersArr = [...usersArr, doc.data()];
  });
  console.log(usersArr);
  res.send(usersArr);
};


module.exports = {createUser, findUser}