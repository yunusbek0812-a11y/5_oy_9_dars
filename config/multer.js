const multer = require("multer")
const fs = require("fs")
const path = require("path")
const { log } = require("console")
const { allow } = require("joi")

const uploadPath = path.join(__dirname,"..", "uploads","images")

if(!fs.existsSync(uploadPath)){
  fs.mkdirSync(uploadPath, {recursive: true})
}

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,uploadPath)
  },
  filename: (req,file,cb ) => {
    const ext = path.extname(file.originalname)
    const uniqueFilename = "image" + "_" + Math.random() * 1000 + Date.now() + ext 

    cb(null,uniqueFilename)
  }
})

const fileFilter = (req,file,cb) => {
const allowedTypes = [
  // Standard rasmlar
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
  "image/bmp",
  "image/tiff",
  "image/svg+xml",

  // Apple formatlar
  "image/heic",
  "image/heif",

  // Adobe formatlar
  "image/avif",
  "image/x-icon",  // favicon .ico
]

if(!allowedTypes.includes(file.mimetype)){
cb(new Error("allowed  types(png,jpeg,jpg,webp) are required"))
}

cb(null,true)
}

module.exports = multer({storage,fileFilter,limits:1024 * 1024 * 5})