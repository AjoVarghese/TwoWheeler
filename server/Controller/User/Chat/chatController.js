
const userSchema = require('../../../Models/userSchema')
const chatSchema = require('../../../Models/chatSchema')
const formidable = require('formidable')
const fs = require('fs').promises;
const path = require('path');
// import name from ''

exports.getAllOwners = async(req,res) => {
    console.log("ccc",req.query.id);
    console.log(typeof req.query.id);
    try {
       const contacts = await userSchema.find({
        _id : {$ne : req.query.id}
        
       }) 
       .select([
        "Email",
        "Name",
        'Status',
        'ProfileImage'
       ])
       return res.status(200).json(contacts)
    
    } catch (error) {
        console.log("ALL owners error",error);
    }
}

exports.addMessageController = async(req,res) => {
    
    try {
        const {from,to,message} = req.body.data

        const data = await chatSchema.create({
            message :{
                text:message,
                image : ''
            },
            users:[from,to],
            sender:from
        })

        if(data){
            res.status(201).json(data)
            console.log('done it');
        }else{
            res.status(400).json({msg:"Failed to add Message to the database"})
            console.log('not done it');
        }
    } catch (error) {
        console.log('error in adding msgs',error);
         
    }
}

exports.getAllMessages = async(req,res) => {
   
    try {
        const {from,to} = req.body.data
        const messages = await chatSchema.find({
            users:{
                $all:[
                    from,to
                ]
            }
        })
        .sort({updatedAt:1})

       
       return res.status(200).json(messages)
    } catch (error) {
        console.log("error finding msgs",error);
        return res.status(400).json("error while finding messages")
    }
}

// exports.sendImages = async(req,res) => {
//      try {
//         console.log('Image send');
//         const form  = formidable()
//         form.parse(req,(err,fields,files) => {
//             const {from,to,imageName} = fields
//             console.log('image name',imageName);
//             console.log(typeof imageName);
//             // const newPath = __dirname + `../../../../client/src/assets/Images/${imageName}`
//             const newPath = path.join(__dirname, '..', '..', '..', '..', 'client', 'src', 'assets', 'Images', imageName);
//             console.log('newww',newPath);

//             files.image.name = imageName
//             console.log('Naeee',imageName);
             
//             try {
//                 fs.copyFile(files.image.path,newPath,async(err) => {
//                     console.log(files.image.path,'ooooo');
//                     if(err) {
//                         console.log("SOME SOME ERROR",err);
//                     } else {
//                         const data = await chatSchema.create({
//                             message :{
//                                 text:'',
//                                 image : files.image.newFilename
//                             },
//                             users:[from,to],
//                             sender:from
//                         })
//                         console.log("IMage send success");
//                         res.status(200).json(data)
//                     }
//                 })
//             } catch (error) {
//                 console.log("error in file",error);
//                 res.status(400).json("error eorro error")
//             }
            
//             console.log(fields);
//             console.log(files);
//             // console.log(files.image.filepath);
//         })
//      } catch (error) {
        
//      }
// }

exports.sendImages = async (req, res) => {
    console.log('done');
    console.log(req.body);
    try {
        const {from,to,image} = req.body.data

        const data = await chatSchema.create({
            message :{
                text:'',
                image : image
            },
            users:[from,to],
            sender:from
        })

        if(data){
            res.status(201).json(data)
            console.log('Image done');
        }else{
            res.status(400).json({msg:"Failed to add Image Message to the database"})
            console.log('not done it');
        }
    } catch (error) {
        console.log('error in adding image msgs',error);
    }
    // try {
    //   console.log('Image send');
    //   const form = formidable()
    //   form.parse(req, async (err, fields, files) => {
    //     const { from, to, imageName } = fields
    //     console.log('image name', imageName)
    //     console.log(typeof imageName)
    //     const newPath = path.join(__dirname, '..', '..', '..', '..', 'client', 'src', 'assets', 'Images', imageName)
    //     console.log('newww', newPath)
  
    //     files.image.name = imageName
    //     console.log('Naeee', imageName)
  
    //     try {
    //       await fs.copyFile(files.image.path, newPath)
    //       const data = await chatSchema.create({
    //         message: {
    //           text: '',
    //           image: files.image.name
    //         },
    //         users: [from, to],
    //         sender: from
    //       })
    //       console.log('Image send success')
    //       res.status(200).json(data)
    //     } catch (error) {
    //       console.log('Error copying file:', error)
    //       res.status(400).json('Error copying file')
    //     }
  
    //     console.log(fields)
    //     console.log(files)
    //   })
    // } catch (error) {
    //   console.log('Error parsing form:', error)
    //   res.status(400).json('Error parsing form')
    // }
  }

