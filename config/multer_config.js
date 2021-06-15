const multer = require('multer')
const fs = require('fs')

module.exports = multerConfig = {
    config: {
        //
        storage: multer.diskStorage({
            //destination path for paste image files
            destination: (req, file, next) => {
                //check if images exists
                const folder = './images/';
                //if images not exists
                if (!fs.existsSync(folder)){
                    //create images folder
                    fs.mkdirSync(folder)
                }
                //else images exists
                next(null, folder)
            },
            //create filename of image
            filename: (req, file, next) => {
                next(null, `${file.fieldname}-${Date.now()}` )
            }
        }),
        //limit file size
        limits: {fileSize : 1024 * 1024 * 5 }, //1 = 1mb
        //filter upload only image
        fileFilter: (req, file, next) => {
            const image = file.mimetype.startsWith('image/')
            if(image){
                next(null, true)
            } else {
                next({message : 'File type not supported'}, false)
            }
        }
    },
    keyUpload: 'photo'
}