const coupon = require('../../../Models/couponSchema')

exports.addCoupon = async(req,res) => {
    console.log(req.body);
    try {
        coupon.create(req.body).then(() => {
            coupon.find().then((data) => {
                res.status(200).json(data)
            })
        })
    } catch (error) {
        
    }
}

exports.getCoupons = async(req,res) => {
    try {
        coupon.find().then((data) => {
            res.status(200).json(data)
        })
    } catch (error) {
        
    }
}

exports.editCoupon = async(req,res) =>{
    console.log(req.body);
    let {couponName,couponCode} = req.body
    try {
        coupon.updateOne({_id : req.query.id},
            {
                $set : {
                   couponName : couponName,
                   couponCode : couponCode
                }
            }
            ).then(() => {
                coupon.find().then((data) => {
                    res.status(200).json(data)
                })
            })
    } catch (error) {
        
    }
}


exports.deleteCoupon = async(req,res) => {
    try {
        coupon.deleteOne({_id : req.query.id}).then(() => {
            coupon.find().then((data) => {
                res.status(200).json(data)
            })
        })
    } catch (error) {
        
    }
}