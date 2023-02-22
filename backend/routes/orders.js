const express = require("express");
const { Order } = require("../models/order");
const router = express.Router();

router.get("/", async (req, res) => {
  const query = req.query.new;

  try {
    const orders = query
      ? await Order.find().sort({ id: _id }).limit(4)
      : await Order.find().sort({ _id: -1 });
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedOrder);
  } catch (error) {
    res.status(500).send(err);
  }
});

router.get("/findOne/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(err);
  }
});

module.exports = router;
