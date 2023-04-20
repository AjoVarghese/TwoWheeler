const userSchema = require('../../../Models/userSchema')
const chatSchema = require('../../../Models/chatSchema')

exports.getAllOwners = async(req,res) => {
    console.log("ccc",req.query.id);
    console.log(typeof req.query.id);
    try {
       userSchema.find({
        $and :[
            {
                _id : {$ne : req.query.id}
            },
            // {
            //     Role : {$exists : true}
            // }
        ]
       }) .then((data) => {
        res.status(200).json(data)
       })
       .catch((err) => {
        console.log(err);
       })
    } catch (error) {
        console.log("ALL owners error",error);
    }
}

exports.addMessageController = async(req,res) => {
    console.log('ADD');
    console.log(req.body.data);
    try {
        const {
            from,
            to,
            message
        } = req.body.data

        const data = await chatSchema.create({
            message :{text:message},
            users :[from,to],
            sender : from,
        })

        if(data){
            console.log("yaaasss");
             res.status(200).json({msg : "Message Added Successfully"})
        } else {
            console.log("failed");
            res.status(400).json({msg : "Failed to add message to the db"})
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

        const projectedMessages = messages.map((msg)=>{
            return{
                fromSelf :msg.sender.toString() === from,
                message : msg.message.text
            }
        })

       return res.status(200).json(projectedMessages)
    } catch (error) {
        console.log("error finding msgs",error);
        return res.status(400).json("error while finding messages")
    }
}