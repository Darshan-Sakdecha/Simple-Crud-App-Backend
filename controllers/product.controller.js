import Product from "../models/product.model.js";

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getByIdProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const insertProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const paginationProduct = async (req, res) => {
    try {
        //  console.log("➡ Pagination route hit!");
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(50, Number(req.query.limit) || 10);

        // sorting : 
        const sortField = req.query.sort || "createdAt";
        const sortOrder = req.query.order === "desc" ? -1 : 1;

        // console.log(page,limit);

        const skip = (page - 1) * limit;

        const products = await Product.find().sort({ [sortField]: sortOrder }).skip(skip).limit(limit);

        const total = await Product.countDocuments();

        res.json({
            page: page,
            limit: limit,
            sortBy: sortField,
            order: sortOrder === 1 ? "asc" : "desc",
            totalRecords: total,
            totalPages: Math.ceil(total / limit),
            data: products
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    // res.send("done");
}

const serchingData = async (req, res) => {
    try {
        const queryObj = {};

        if (req.query.search) {
            queryObj.name = { $regex: req.query.search, $options: "i" };
        }

        const items = await Product.find(queryObj);

        res.json({
            success: true,
            count: items.length,
            data: items
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const filterData = async (req, res) => {
    // const data = req.query;
    // console.log(data);

    try {
        const queryObj = {};

        // based on price apply filtering : 
        if (req.query.minPrice || req.query.maxPrice) {
            queryObj.price = {};

            if (req.query.minPrice) {
                queryObj.price.$gte = Number(req.query.minPrice); // >=
            }
            if (req.query.maxPrice) {
                queryObj.price.$lte = Number(req.query.maxPrice); // <=
            }
        }
        // after this : 
        //   queryObj = {
        //      price: {
        //      $gte: 100,
        //      $lte: 1000
        //     }
        // }

        const products = await Product.find(queryObj);

        res.json({
            success: true,
            count: products.length,
            data: products
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// combaine code : search , sort , filter , pagination inside production level code :

// export const getInventory = async (req, res) => {
//   try {
//     const queryObj = {};

//     // ===== SEARCH =====
//     if (req.query.search) {
//       queryObj.$or = [
//         { name: { $regex: req.query.search, $options: "i" } },
//         { category: { $regex: req.query.search, $options: "i" } },
//       ];
//     }

//     // ===== FILTER =====
//     if (req.query.minPrice || req.query.maxPrice) {
//       queryObj.price = {};
//       if (req.query.minPrice) queryObj.price.$gte = Number(req.query.minPrice);
//       if (req.query.maxPrice) queryObj.price.$lte = Number(req.query.maxPrice);
//     }

//     if (req.query.inStock) {
//       queryObj.inStock = req.query.inStock === "true"; // boolean conversion
//     }

//     if (req.query.category) {
//       queryObj.category = req.query.category; // optional exact match filter
//     }

//     // ===== PAGINATION =====
//     const page = Math.max(1, Number(req.query.page) || 1);
//     const limit = Math.min(50, Number(req.query.limit) || 10);
//     const skip = (page - 1) * limit;

//     // ===== SORTING =====
//     let sort = {};
//     if (req.query.sort) {
//       const order = req.query.order === "desc" ? -1 : 1;
//       sort[req.query.sort] = order;
//     } else {
//       sort = { createdAt: -1 }; // default newest first
//     }

//     // ===== QUERY DATABASE =====
//     const total = await Inventory.countDocuments(queryObj);
//     const items = await Inventory.find(queryObj).sort(sort).skip(skip).limit(limit);

//     // ===== RESPONSE =====
//     res.json({
//       success: true,
//       page,
//       limit,
//       total,
//       totalPages: Math.ceil(total / limit),
//       count: items.length,
//       data: items,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

export { getProducts, getByIdProduct, insertProduct, updateProduct, deleteProduct, paginationProduct, filterData, serchingData }