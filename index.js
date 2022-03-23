const express = require('express');

const app = express()
app.use(express.json())
const knex = require('knex')
    ({

        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: 'rexweb@123',
            database: 'employeeDB'
        }

    })
//creating table "register" using knex
knex.schema.hasTable("register").then((exists) => {
    if (!exists) {
        return knex.schema.createTable('register', function (table) {
            table.increments('id').primary();
            table.string('Name', 100);
            table.string('email', 100);
            table.string("contact_num", 100)
            table.string("gender", 100)
            table.string("password", 100)
            table.string("confirm_password", 100)
        });
    }
})

//API to insert data into "register"
app.post("/register", (req, res) => {
    const data = {
        Name: req.body.Name,
        email: req.body.email,
        contact_num: req.body.contact_num,
        gender: req.body.gender,
        password: req.body.password,
        confirm_password: req.body.confirm_password,

    }
    res.send(data)
    knex("register").insert(data).then(() => {
        console.log("data info insert success");
    }).catch((err) => {
        console.log(err);
    })
})

app.get("/registertable", (req, res) => {
    knex.select().from("register").then((data) => {
        res.send(data)
    }).catch((err) => {
        console.log(err)
    })
})

app.post("/login", (req, res) => {
    let user = req.body.email
    let password = req.body.password

    knex('register').then((data, err) => {
        for (i of data) {
            if (i.email == user && i.password == password)
                res.send("success")



            else {
                return console.log(err)

            }
        }
    }).catch((err) => {
        console.log(err)
    })

})


app.post("/login1", (req, res) => {
    {
        let email = req.body.email
        let password = req.body.password


        knex.select("*").from("register").then((data) => {
            for (i of data) {
                if (i.email == email && i.password == password) {
                    
                    res.send("logged in")
                }
                else {return console.log("failed")}
            }
                // if(data){
                //     res.send("login")
                // }
               
                
            
        }).catch((err) => {
            console.log(err)
        })
    }
})




app.listen(8500, () => {
    console.log("Server port running at 8800");
})