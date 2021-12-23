const pathFile = "http://localhost:5000/uploads/";

const { barang, user } = require("../../models");

exports.addItem = async (req, res) => {
  try {
    const itemExist = await barang.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (itemExist) {
      return res.status(400).send({
        status: "failed",
        message: "Item already exist",
      });
    }

    const newItem = await barang.create({
      ...req.body,
      idUser: req.user.id,
    });

    if (newItem) {
      let data = await barang.findOne({
        where: {
          id: newItem.id,
        },
        include: [
          {
            model: user,
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.send({
        status: "success",
        message: "Add item success",
        data,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getBarang = async (req, res) => {
  try {
    const data = await barang.findAll({
      include: [
        {
          model: user,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getBarangId = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await barang.findAll({
      where: {
        id,
      },
      include: [
        {
          model: user,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const newData = data.map((item) => ({
      id: item.id,
      name: item.name,
      idUser: item.idUser,
      priceBuy: item.priceBuy,
      priceSell: item.priceSell,
      stock: item.stock,
      image: item.image,
    }));

    res.send({
      status: "success",
      data: newData,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.editBarang = async (req, res) => {
  try {
    const { id } = req.params;

    await barang.update(
      {
        image: req.body.image,
        name: req.body.name,
        priceBuy: req.body.priceBuy,
        priceSell: req.body.priceSell,
        stock: req.body.stock,
      },
      {
        where: {
          id,
        },
      }
    );

    const data = await barang.findAll({
      where: {
        id,
      },
      include: [
        {
          model: user,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const newData = data.map((item) => ({
      id: item.id,
      name: item.name,
      idUser: item.idUser,
      priceBuy: item.priceBuy,
      priceSell: item.priceSell,
      stock: item.stock,
      image: item.image,
    }));

    res.send({
      status: "success",
      data: newData,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteBarang = async (req, res) => {
  try {
    const { id } = req.params;

    await barang.destroy({
      where: {
        id,
      },
    });

    const data = await barang.findOne({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
