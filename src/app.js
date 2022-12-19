          const express = require("express");
          const logger=require("./logger");
          const app= express();
          const mongoose = require('mongoose');
          
          mongoose.set('strictQuery', false);
          

          //require("../src/db/conn");
          const User= require("./models/users");

        // const port=process.env.PORT || 3000;
          app.use(express.json());
          app.use(express.urlencoded({ extended: true }));

       

          mongoose.connect('mongodb://127.0.0.1:27017/project-glory', {
            useNewUrlParser: true,
            //useCreateIndex:true,
            useUnifiedTopology: true
        });
        
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, "connection error:"));
        db.once('open', () => {
            console.log('Database connected');
        });
       

        app.use((req,res,next)=>{


            logger.info(req.body);
            let oldSend=res.send;
            res.send=function(data){
              logger.info(data);
              oldSend.apply(res,arguments);

            }
            next();  


        })


     



          app.get("/", async(req,res)=>{
             res.send('hellow from world!!!!')
          })

          //create users.------------------

            app .post('/users',async(req,res)=>{
            try{
              const user=new User(req.body)
              //console.log(req.body);
              const insertUser=await user.save();

                res.status(201).send(insertUser);
              }catch(e){
                  res.send(e);
              }
            })

              //fetch user info--------------------
            app .get('/users',async(req,res)=>{
              try{
                    const _id= req.params.id;

                  const getUser= await User.find({}).sort({"ranking":1});
              //console.log(req.body);
                  res.send(getUser);
              }catch(e){
                  res.status(400).send(e);
              }
            })





            //fetch unique  individual user info.------------------

            app .get('/users/:id',async(req,res)=>{
              try{
                const _id= req.params.id;

                  const getUser= await User.findById(_id);
              //console.log(req.body);
                  res.send(getUser);
              }catch(e){
                  res.status(400).send(e);
              }
            })

            //update user info.----------------------

            app .patch('/users/:id',async(req,res)=>{
              try{
                const _id= req.params.id;

                  const getUser= await User.findByIdAndUpdate(_id,req.body);
              //console.log(req.body);
                  res.send(getUser);
              }catch(e){
                  res.status(500).send(e);
              }
            })

            
            //delete user.

            app .delete('/users/:id',async(req,res)=>{
              try{
                const _id= req.params.id;

                  const getUser= await User.findByIdAndDelete(_id);
              //console.log(req.body);
                  res.send(getUser);
              }catch(e){
                  res.status(400).send(e);
              }
            })





        


          
          app.listen(7000, (req, res) => {

            logger.log('info','Serving on port 7000')
        })




      // app.listen(port, () => {
      //   console.log(`Server is listening on port ${port}...`)
      // });


    // app.listen(port,()=>{

          // console.log(`connection is live at post no. ${port}`);

          // })
