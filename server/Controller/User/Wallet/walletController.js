const walletSchema = require('../../../Models/walletSchema')

exports.walletController = (req,res) => {
    console.log("get wallet");
    console.log(req.query.id);
    try {
        walletSchema.findOne({userId : req.query.id}).then((data) => {
            res.status(200).json(data)
        })
    } catch (error) {
        
    }
}