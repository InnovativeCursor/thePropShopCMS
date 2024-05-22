// controllers/productController.js
const Product = require("../models/product");
const { Op } = require("sequelize");
exports.getProducts = async (req, res) => {
  try {
    // Get query parameters
    const {
      location,
      booth_size,
      budget,
      closed_meeting_room,
      demo_stations,
      open_discussion_area,
      ...functionalReq
    } = req.query;

    // Construct the filter object
    let filter = {};

    if (location) filter.location = location;
    if (booth_size) filter.booth_size = booth_size;
    // if (budget) {
    //   const [minBudget, maxBudget] = budget.split("-").map(Number);
    //   filter.budget = {
    //     [Op.between]: [minBudget, maxBudget],
    //   };
    // }
    // Handle budget filter
    if (budget) {
      let budgetRange;
      try {
        budgetRange = JSON.parse(budget); // Parse the JSON string
      } catch (e) {
        return res.status(400).json({ message: "Invalid budget format" });
      }

      if (Array.isArray(budgetRange) && budgetRange.length === 2) {
        filter.budget = {
          [Op.between]: [budgetRange[0], budgetRange[1]],
        };
      } else {
        return res.status(400).json({ message: "Invalid budget range" });
      }
    }
    if (closed_meeting_room) filter.closed_meeting_room = closed_meeting_room;
    if (demo_stations) filter.demo_stations = demo_stations;
    if (open_discussion_area)
      filter.open_discussion_area = open_discussion_area;

    // Add functional requirements to the filter
    Object.keys(functionalReq).forEach((key) => {
      if (functionalReq[key] === "true") {
        filter[key] = true;
      }
    });

    const products = await Product.findAll({ where: filter });
    res.status(200).json({ products });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};
exports.getLocationOptions = async (req, res) => {
  try {
    // Fetch all unique locations from the Products table
    const locations = await Product.findAll({
      attributes: [
        [
          Product.sequelize.fn("DISTINCT", Product.sequelize.col("location")),
          "location",
        ],
      ],
      order: [["location", "ASC"]],
    });

    // Extract the locations from the result
    const locationList = locations.map((loc) => loc.location);

    res.status(200).json(locationList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch locations", error: error.message });
  }
};
exports.getBoothSizeOptions = async (req, res) => {
  try {
    const boothSizes = await Product.findAll({
      attributes: [
        [
          Product.sequelize.fn("DISTINCT", Product.sequelize.col("booth_size")),
          "booth_size",
        ],
      ],
    });

    const boothSizeList = boothSizes.map((boothSize) =>
      boothSize.get("booth_size")
    );

    // Function to extract the numeric parts of the booth size
    const parseBoothSize = (boothSize) => {
      const match = boothSize.match(/(\d+)x(\d+)/i);
      if (match) {
        return [parseInt(match[1], 10), parseInt(match[2], 10)];
      }
      return [0, 0];
    };

    // Sort boothSizeList based on the parsed numeric values
    boothSizeList.sort((a, b) => {
      const [aWidth, aHeight] = parseBoothSize(a);
      const [bWidth, bHeight] = parseBoothSize(b);
      return aWidth - bWidth || aHeight - bHeight;
    });

    res.status(200).json(boothSizeList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch booth sizes", error: error.message });
  }
};
exports.getBudgetOptions = async (req, res) => {
  try {
    const budgetList = [
      {
        label: "$10k - $15k",
        value: [10000, 15000],
      },
      {
        label: "$15k - $25k",
        value: [15000, 25000],
      },
      {
        label: "$25k - $35k",
        value: [25000, 35000],
      },
      {
        label: "$35k - $45k",
        value: [35000, 45000],
      },
      {
        label: "$45k - $60k",
        value: [45000, 60000],
      },
      {
        label: "$60k+",
        value: [60000, Number.MAX_SAFE_INTEGER],
      },
    ];
    res.status(200).json(budgetList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch budgets", error: error.message });
  }
};
exports.getSecondaryOptions = async (req, res) => {
  try {
    const secondaryOptions = [
      {
        label: 1,
        value: 1,
      },
      {
        label: 2,
        value: 2,
      },
      {
        label: 3,
        value: 3,
      },
      {
        label: 4,
        value: 4,
      },
      {
        label: 5,
        value: 5,
      },
      {
        label: 6,
        value: 6,
      },
    ];
    res.status(200).json(secondaryOptions);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to fetch secondary Options",
        error: error.message,
      });
  }
};
exports.getfunctionalRequirements = async (req, res) => {
  try {
    //Hard Coded Options
    const functionalReq = [
      {
        label: "Bar Area",
        value: "bar_area",
      },
      {
        label: "Hanging sign",
        value: "hanging_sign",
      },
      {
        label: "LED Video Wall",
        value: "led_video_wall",
      },
      {
        label: "Lounge Area",
        value: "longue_area",
      },
      {
        label: "Product Display",
        value: "product_display",
      },
      {
        label: "Reception Counter",
        value: "reception_counter",
      },
      {
        label: "Semi Closed Meeting Area",
        value: "semi_closed_meeting_area",
      },
      {
        label: "Storage Room",
        value: "storage_room",
      },
      {
        label: "Theatre Style Demo",
        value: "theatre_style_demo",
      },
      {
        label: "Touch Screen Kiosk",
        value: "touch_screen_kiosk",
      },
    ];
    res.status(200).json(functionalReq);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch functional Requirements",
      error: error.message,
    });
  }
};
exports.createProduct = async (req, res) => {
  const {
    product_name,
    location,
    booth_size,
    budget,
    closed_meeting_room,
    demo_stations,
    open_discussion_area,
    bar_area,
    hanging_sign,
    led_video_wall,
    longue_area,
    product_display,
    reception_counter,
    semi_closed_meeting_area,
    storage_room,
    theatre_style_demo,
    touch_screen_kiosk,
    description,
    pictures, // pictures should be an array of base64 strings
  } = req.body;
  try {
    await Product.create({
      product_name,
      location,
      booth_size,
      budget,
      closed_meeting_room,
      demo_stations,
      open_discussion_area,
      bar_area,
      hanging_sign,
      led_video_wall,
      longue_area,
      product_display,
      reception_counter,
      semi_closed_meeting_area,
      storage_room,
      theatre_style_demo,
      touch_screen_kiosk,
      description,
      pictures,
    });
    res.status(201).json({ message: "Product Created Successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
};
// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.update(updatedData);
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
};
