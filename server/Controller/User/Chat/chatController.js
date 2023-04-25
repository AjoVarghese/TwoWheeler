// const userSchema = require('../../../Models/userSchema')
// const chatSchema = require('../../../Models/chatSchema')

// exports.getAllOwners = async(req,res) => {
//     console.log("ccc",req.query.id);
//     console.log(typeof req.query.id);
//     try {
//        const contacts = await userSchema.find({
//         _id : {$ne : req.query.id}
//         // $and :[
//         //     {
//         //         _id : {$ne : req.query.id}
//         //     },
//         //     {
//         //         Role : {$exists : true}
//         //     }
//         // ]
//        }) 
//        .select([
//         "Email",
//         "Name",
//         'Status',
//         'ProfileImage'
//        ])
//        return res.status(200).json(contacts)
//     //    .then((data) => {
//     //     res.status(200).json(data)
//     //    })
//     //    .catch((err) => {
//     //     console.log(err);
//     //    })
//     } catch (error) {
//         console.log("ALL owners error",error);
//     }
// }

// exports.addMessageController = async(req,res) => {
//     console.log('ADD');
//     console.log(req.body.data);
//     try {
//         const {from,to,message} = req.body.data

//         const data = await chatSchema.create({
//             message :{text:message},
//             users:[from,to],
//             sender:from
//         })

//         if(data){
//             res.status(201).json(data)
//             console.log('done it');
//         }else{
//             res.status(400).json({msg:"Failed to add Message to the database"})
//             console.log('not done it');
//         }
//     } catch (error) {
//         console.log('error in adding msgs',error);
         
//     }
// }

// exports.getAllMessages = async(req,res) => {
//     console.log("GET");
//     console.log(req.body);
//     try {
//         const {from,to} = req.body.data
//         const messages = await chatSchema.find({
//             users:{
//                 $all:[
//                     from,to
//                 ]
//             }
//         })
//         .sort({updatedAt:1})

//         const projectedMessages = messages.map((msg)=>{
//             return{
//                 fromSelf :msg.sender.toString() === from,
//                 message : msg.message.text
//             }
//         })

//        return res.status(200).json(projectedMessages)
//     } catch (error) {
//         console.log("error finding msgs",error);
//         return res.status(400).json("error while finding messages")
//     }
// }
const userSchema = require('../../../Models/userSchema')
const chatSchema = require('../../../Models/chatSchema')

exports.getAllOwners = async(req,res) => {
    console.log("ccc",req.query.id);
    console.log(typeof req.query.id);
    try {
       const contacts = await userSchema.find({
        _id : {$ne : req.query.id}
        // $and :[
        //     {
        //         _id : {$ne : req.query.id}
        //     },
        //     {
        //         Role : {$exists : true}
        //     }
        // ]
       }) 
       .select([
        "Email",
        "Name",
        'Status',
        'ProfileImage'
       ])
       return res.status(200).json(contacts)
    //    .then((data) => {
    //     res.status(200).json(data)
    //    })
    //    .catch((err) => {
    //     console.log(err);
    //    })
    } catch (error) {
        console.log("ALL owners error",error);
    }
}

exports.addMessageController = async(req,res) => {
    console.log('ADD');
    console.log(req.body.data);
    try {
        const {from,to,message} = req.body.data

        const data = await chatSchema.create({
            message :{text:message},
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
    console.log("GET");
    console.log(req.body);
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

// const chatSchema = require('../../../Models/chatSchema')
// const userSchema = require('../../../Models/userSchema')
// const messageSchema = require('../../../Models/messageSchema')

// exports.getAllChatUsers = async(req,res) => {
//   console.log('get chat ');
//   try {
    
//     // const chat = await chatSchema.find({
//     //     members : {$in : [req.query.userId]}
//     // })
//     const chat = await userSchema.find({
//         _id : {$ne : req.query.id}
//     })
//     res.status(200).json(chat)
// } catch (error) {
//     console.log('error in finding all chat',err);
//     res.status(500).json(error)
// }
// }

// exports.createChat = async(req,res) => {
//     console.log('create chat');
//     //creating a new chat using senderid and recieverId
//     const newChat = new chatSchema({
//         members : [req.body.senderId , req.body.receiverId]
//     })
    
//     try {
//         const result = await newChat.save();
//         res.status(200).json(result)
//     } catch (error) {
//         console.log('error in creating chat',err);
//         res.status(500).json(error)
//     }
// }

// exports.findSpecificChat = async(req,res) => {
//     console.log('specific chat');
//     try {
//         const chat = await chatSchema.findOne({
//             members : {
//                 $all : [req.query.firstId,req.query.secondId]
//             }
//         })
//         res.status(200).json(chat)
//     } catch (error) {
//         console.log('error i finding specific chat',err);
//         res.json(500).json(error)
//     }
// }

// exports.createMessage = async(req,res) => {
//     try {
//         const {from,to,message} = req.body
//     const newMessage = await messageSchema.create({
//         message : message,
//         ChatUsers : [from,to],
//         Sender : from
//     })
//     return res.status(200).json(newMessage)
//     } catch (error) {
//         console.log("ERRORRR",error);
//         res.status(500).json('Internal error')
//     }
    
// }

// exports.getMessage = async(req,res) => {
//     try {
//         const from = req.query.senderId
//         const to = req.query.receiverId

//         const newMessage = await messageSchema.find({
//             ChatUsers : {
//                 $all : [from,to]
//             }
//         }).sort({updatedAt : 1})

//         const allMessage = newMessage.map((msg) => {
//             return{
//                 myself : msg.Sender.toString() === from,
//                 message : msg.message
//             }
//         })
//         return res.status(200).json(allMessage)
//     } catch (error) {
//         console.log('ERRORRRR',error);
//         res.status(500).json("Internal server Error")
//     }
// }