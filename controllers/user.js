const db = require("../db");
const {collection,addDoc, orderBy, limit, getDocs, query, where, updateDoc, doc}  = require("firebase/firestore")

const createUser = async (req, res) => {
    let reqObj = req.body
  try {
    let checkUser = await findUser(req.body.user)
    if(checkUser.length === 0){
        const docRef = await addDoc(collection(db, "Users"), {
          user: reqObj.user,
          time: reqObj.time,
        });
        console.log(docRef);
        res.sendStatus(200);
    }else{
        console.log(checkUser[0].id)
        let docRef = doc(db,"Users",checkUser[0].id)
        await updateDoc(docRef, { time: reqObj.time});
        res.sendStatus(200)
    }
  } catch { 
    console.log("Error creating user in firestore");
    res.status(400).send('Error creating user');
  }
};

const findUser = async(userName) => {
    const findQuery = query(collection(db,'Users'), where('user', '==', userName));
    const users = await getDocs(findQuery);
   let usersArr = [];
   users.forEach((doc) => {
     usersArr = [...usersArr, doc];
   });
   return usersArr
}

const getAllUser = async (req, res) => {
  const findQuery = query(collection(db, "Users"), orderBy("time"), limit(5));
  const findUser = await getDocs(findQuery);
  let usersArr = [];
  findUser.forEach((doc) => {
    usersArr = [...usersArr, doc.data()];
  });
  res.send(usersArr);
};


module.exports = { createUser, getAllUser, findUser };