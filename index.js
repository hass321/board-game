const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

const {createUser, findUser} = require("./controllers/user")

app.use(bodyParser.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("Yah!!!")
})

app.get("/user/all",findUser);
app.post('/create/user',createUser)


const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`App is running! on ${PORT}`,))