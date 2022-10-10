const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("Yah!!!")
})

app.post('/user', (req, res) => {
    console.log(req.body);
    res.sendStatus(200)
})
app.post("/user/time", (req,res)=>{
    let time = req.body.time;
    let user = req.body.user;
    console.log({time,user})
    res.sendStatus(200)
})
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`App is running! on ${PORT}`,))