import axios from "axios";
import Product from "../models/Product.js";

const addData = async (req, res) => {
  try {
    const response = await axios.get(process.env.PRODUCTS_URL);
    const products = response.data;

    await Product.insertMany(products);

    res.status(201).json({ message: "Products Successfully added", products });
  } catch (error) {
    console.log("addData error : ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export default addData;
