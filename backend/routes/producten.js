const express = require("express");

const ProductController = require("../controllers/product");

const checkAuth = require("../middleware/check-auth");
const vraagBestandOp = require("../middleware/multer");

const router = express.Router();

router.post("", checkAuth, vraagBestandOp, ProductController.nieuwProduct);

router.put("/:id", checkAuth, vraagBestandOp, ProductController.updateProduct);

router.get("", ProductController.getAlleProducten);

router.get("/:id", ProductController.getEenEnkelProduct);

router.delete("/:id", checkAuth, ProductController.verwijderProduct);

module.exports = router;
