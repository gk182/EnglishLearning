import { productValid } from "../validation/product.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const getAll = async (req, res) => {
  try {
    const products = await Product.find({}).populate("categoryId");
    if (products.length === 0) {
      return res.status(404).json({
        message: "Khong tim thay san pham",
      });
    }
    return res.status(200).json({
      message: "Lay danh sach san pham thanh cong",
      datas: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("categoryId");
    if (!product) {
      return res.status(404).json({
        message: "Khong tim thay san pham",
      });
    }
    return res.status(200).json({
      message: "Lay danh sach san pham thanh cong",
      datas: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { error } = productValid.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const product = await Product.create(req.body);
    if (!product) {
      return res.status(404).json({
        message: "Tao san  pham khong thanh cong",
      });
    }

    const updateCategory = await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: {
        products: product._id
      }
    })

    if (!updateCategory) {
      return res.status(404).json({
        message: "update Category not succesful",
      });
    }

    return res.status(200).json({
      message: "Tao san pham thanh cong",
      datas: product,
    });
    
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { error } = productValid.validate(req.body, { abortEarly: true });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({
        message: "Update pham khong thanh cong",
      });
    }
    return res.status(200).json({
      message: "Update san pham thanh cong",
      datas: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await product.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(400).json({
        message: "Xoa san pham khong thanh cong",
      });
    }
    return res.status(200).json({
      message: "xoa san pham thanh cong",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
