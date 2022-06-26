const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const storage = new CloudinaryStorage({
  cloudinary : cloudinary,
  params : {
    folder : "uploads",
    format : async () => "png",
    public_id : (req , file) => file.filename,
  }
});

const parser = multer({storage : storage});
module.exports= parser