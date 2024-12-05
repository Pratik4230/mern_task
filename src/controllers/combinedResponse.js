import "dotenv/config";
import axios from "axios";

const BaseUrl = process.env.BASE_URL;

const Statistics = `${BaseUrl}/transactions/statistics`;
const BarChart = `${BaseUrl}/transactions/barchart`;
const PieChart = `${BaseUrl}/transactions/piechart`;

const combinedResponse = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    const [StatisticsResponse, BarChartResponse, PieChartResponse] =
      await Promise.all([
        axios.get(Statistics, { params: { month } }),
        axios.get(BarChart, { params: { month } }),
        axios.get(PieChart, { params: { month } }),
      ]);

    const combinedData = {
      statistics: StatisticsResponse.data,
      barChart: BarChartResponse.data,
      pieChart: PieChartResponse.data,
    };

    res.status(200).json(combinedData);
  } catch (error) {
    console.log("combinedResponse error : ", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export default combinedResponse;
