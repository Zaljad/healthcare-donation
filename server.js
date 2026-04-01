require("dotenv").config({ quiet: true })
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const session = require("express-session")
const { MongoStore } = require("connect-mongo")
const middleware = require("./middleware")
const path = require("path")

const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])
const db = require("./db")

const app = express()
const authRouter = require("./routes/authRouter")
const userRouter = require("./routes/userRouter")
const donationRouter = require("./routes/donationRouter")
const medicalTollsRouter = require("./routes/medicalToolsRouter")
const requestRouter = require("./routes/requestRouter")
const { fstat } = require("fs")

const PORT = process.env.PORT ? process.env.PORT : 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended: fstat}))
app.use(morgan("dev"))
app.use(methodOverride("_method"))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
)
app.use(middleware.passUserToView)

app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/donation", donationRouter)
app.use("/medicalEquipment", medicalTollsRouter)
app.use("/request", requestRouter)

app.get("/", (req, res) => {
  res.render("index.ejs")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀 `)
})
