const express = require('express');

const app = express();
const mongoose = require('mongoose');
//pipeline and middleware
app.use(express.json());

mongoose.connect('mongodb://localhost/mentor').then(()=> console.log("connect to database")).catch((err)=>  console.log("exception occured",err));

 const UserSchema= mongoose.Schema({      
    user: String,
    password: String

 });

 const MenorSchema = mongoose.Schema({
    
     Name: String,
     Experience : Number,
     Speciality: String,
     SelectedOption: [String]
 })

 const Mentor = mongoose.model('mentor',MenorSchema);

 const User = mongoose.model('user',UserSchema);


 app.get('/user',(req,res)=>{

    User.find().then(user => res.send(user));
    return;

 });

 app.get('/mentor',(req,res)=>{

    Mentor.find().then(mentor => res.send(mentor));
    return;

 });

 app.post('/mentor',(req,res)=>{
 
    const mentor = new Mentor({
     
          Name: req.body.Name,
          Experience: req.body.Experience,
          Speciality: req.body.Speciality,
          SelectedOption : req.body.SelectedOption
    });

    mentor.save().then(data=> res.send(data));
    return; 
 })

 app.delete('/mentor/:name',(req,res)=>{
    let name = req.params.name;
      Mentor.deleteOne({Name: name}).then(
        () => {
          res.status(200).json({
            message: 'Deleted!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    });

   //  app.put('/mentor/:name',(req,res)=>{
   //       const mentor = new Mentor({
   //          Name: req.body.Name,
   //          Experience: req.body.Experience,
   //          Speciality: req.body.Speciality,
   //          SelectedOption : req.body.SelectedOption
   //       });
   //       Mentor.updateOne({ Name:req.params.name}, mentor).then(
   //         () => {
   //           res.status(201).json({
   //             message: 'Thing updated successfully!'
   //           });
   //         }
   //       ).catch(
   //         (error) => {
   //           res.status(400).json({
   //             error: error
   //           });
   //         }
   //       );
   //     });
       
       app.put('/:_id', (req, res) => {
        
     
         var updatedRecord = {
            Name: req.body.Name,
            Experience: req.body.Experience,
            Speciality: req.body.Speciality,
            SelectedOption : req.body.SelectedOption
         }
     
         Mentor.findByIdAndUpdate(req.params._id, { $set: updatedRecord },{new:true}, (err, docs) => {
             if (!err) res.send(docs)
             else console.log('Error while updating a record : ' + JSON.stringify(err, undefined, 2))
         })
     })

 


 app.listen(3000,()=>{
     console.log("listening")
 })

