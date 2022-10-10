const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

const { createUser, getAllUser, findUser } = require("./controllers/user");

app.use(bodyParser.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("Yah!!!")
})

app.get("/user/all", getAllUser);
app.post('/create/user',createUser)
app.get("/find/user", findUser);


const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`App is running! on ${PORT}`,))