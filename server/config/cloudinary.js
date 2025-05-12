const cloudinary = require("cloudinary").v2;
const dotnev = require("dotenv");

dotnev.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
// Cloudinary Upload Single Image
const Upload = (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (result) => {
      resolve(
        {
          url: result.url,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};
// Cloudinary Upload Multiple Image
const UploadMultiple = (files) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(files, (result) => {
      resolve(
        {
          url: result.url,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};

// Cloudinary Remove Single Image
const Remove = (public_id) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(public_id, (result) => {
      resolve(result);
    });
  });
};
// Cloudinary Remove Multiple Image
const RemoveMultiple = (public_ids) => {
  // array of public_ids
  return new Promise((resolve) => {
    cloudinary.api.delete_resources(public_ids, (result) => {
      resolve(result);
    });
  });
};

const cloudinaryUpload = async (path) => await Upload(path, "image");
const cloudinaryUploadMultiple = async (paths) => await UploadMultiple(paths);
const cloudinaryRemove = async (public_id) => await Remove(public_id);
const cloudinaryRemoveMultiple = async (public_ids) => await RemoveMultiple(public_ids);
module.exports = { cloudinaryUpload, cloudinaryRemove, cloudinaryRemoveMultiple, cloudinaryUploadMultiple };
