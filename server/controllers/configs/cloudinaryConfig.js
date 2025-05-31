import { v2 as cloudinary } from 'cloudinary';
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;

cloudinary.config({ 
    cloud_name: 'dzeiv5cxz', 
    api_key: '212633922881715', 
    api_secret: CLOUDINARY_API_KEY ,
});
export default cloudinary;