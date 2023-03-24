const multer  = require('multer')
const ramdomstring = require('randomstring')
const path = require('path')
const fs = require('fs')

let uploadFile = (field, folderDes = `${__path_public}uploads/items/`, fileNameLength = 10, fileSizeMb = 1, fileExtension = 'jpeg|jpg|png|gif') => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, folderDes)
        },
        filename: (req, file, cb) => {
          cb(null, ramdomstring.generate(fileNameLength) + path.extname(file.originalname))
        }
    });
    const upload = multer({ 
        storage: storage,
        limits:{
            fileSize: 1024 * 1024 * fileSizeMb
        },
        fileFilter: (req, file, cb) => {
            const filetypes = new RegExp(fileExtension)
            const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
            const mimetype = filetypes.test(file.mimetype)
    
            if(mimetype && extname) {
                return cb(null, true);
            }else {
                cb('Phần mở rộng của tập tin ko phù hợp');
            }
        }
     }).single(field)
    //  .single(field);.array(field, 5)
     return upload;
}

let removeFile = (folder, fileName) => {
    let path = folder + fileName
    if(fs.existsSync(path)) fs.unlink(path, (errUpload) => { if (errUpload) throw errUpload })
}

module.exports = {
    upload: uploadFile,
    remove: removeFile
}