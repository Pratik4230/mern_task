import Product from "../models/Product.js";

const getAllTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { search, month } = req.query;

    let finalSearch = {};

    if (search) {
      const isNumber = !isNaN(search);

      if (isNumber) {
        finalSearch = { price: parseFloat(search) };
      } else {
        const regex = new RegExp(search, "i");

        finalSearch = {
          $or: [{ title: regex }, { description: regex }],
        };
      }
    }

    const transactions = await Product.find(finalSearch)
      .skip(skip)
      .limit(limit);

    const totalDocuments = await Product.countDocuments(finalSearch);

    res.status(200).json({ totalDocuments, currentPage: page, transactions });
  } catch (error) {
    console.log("getAllTransactions error : ", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getStatistics = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    console.log("month : ", month);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthNumber = months.indexOf(month) + 1;
    if (monthNumber < 1 || monthNumber > 12) {
      return res.status(400).json({ message: "Invalid month" });
    }

    const transactions = await Product.aggregate([
      {
        $addFields: {
          month: { $month: "$dateOfSale" },
        },
      },

      {
        $match: {
          month: monthNumber,
        },
      },

      {
        $group: {
          _id: null,
          totalSaleAmount: {
            $sum: { $cond: [{ $eq: ["$sold", true] }, "$price", 0] },
          },
          totalSoldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
          totalNotSoldItems: {
            $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] },
          },
        },
      },
    ]);

    console.log("transactions : ", transactions);

    if (transactions.length === 0) {
      return res.status(200).json({
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0,
      });
    }

    const { totalSaleAmount, totalSoldItems, totalNotSoldItems } =
      transactions[0];

    res.status(200).json({
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.log("getStatistics error : ", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export { getAllTransactions, getStatistics };
