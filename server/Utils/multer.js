const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null,file.originalname)
//     }
// })

const storage = multer.diskStorage({ destination: "./storage/media", filename: (req, file, cb) => { cb(null, Date.now() + "-" + file.originalname); }, });



const fileFilter = (req, file, cb) => {
    console.log(file);
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'||file.mimetype=="image/webp") {
        cb(null, true)
    } else {
        // reject file
        cb({message: 'Unsupported file format'}, false)
    }
}

const upload = multer({
    storage: storage,
    // limits: { fileSize: 1024 * 1024 },
    // fileFilter: fileFilter
})

module.exports = upload;