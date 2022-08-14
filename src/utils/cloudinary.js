import cloudinary from 'cloudinary';
import config from '../config/config';
const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  config[process.env.NODE_ENV];

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

export const imageUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({
      message: 'No image file found',
    });
  } else {
    let imageUrl;
    await cloudinary.v2.uploader.upload(
      req.file.path,
      async function (err, image) {
        if (err) console.log(err);
        return (imageUrl = image.secure_url);
      }
    );
    return imageUrl;
  }
};
