const express= require("express");
const path =require("path");
const app=express();
const hbs=require("hbs");

require("./db/conn");
const Register= require("./models/registers");

const port=process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
//console.log(path.join(__dirname, "../public"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path))
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.get("/", (req,response) => {
    response.render("index")
});

app.get("/register", (req,response) => {
    response.render("register")

});

app.get("/login",(req,response) =>{
    response.render("login")
});

app.post("/register", async(req,response) => {
   try{
        

        const password=req.body.password;
        const cpassword=req.body.confirmpassword;
        if(password=== cpassword)
        {
            const registerStudent= new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender:req.body.gender,
                phone:req.body.phone,
                age:req.body.age,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
            })

            const registered =await registerStudent.save();
            response.status(201).render("index");
        }else{
            response.send("passowords are not matching ");
        }

   }catch(error){
        response.status(400).send(error)
   }
});


app.get("/login",(req,response) =>{
    response.render("login")
});

app.post("/login", async(req,response) => {
    try{
         const email=req.body.email;
         const password=req.body.password;
         const useremail =await Register.findOne({email:email});
            if(useremail.password===password)
            {
                response.status(201).render("index");
            }else{
                response.send("invalid login details");
            }
            
 
    }catch(error){
         response.status(400).send("Invalid Email or password");
    }
 });

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})