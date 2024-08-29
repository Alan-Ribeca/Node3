const Productos = require("../models/Productos");

const multer = require("multer");
const shortid = require("shortid");
const fs = require("fs").promises;
const path = require("path");

// Configuración para Multer
const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato no valido"));
    }
  },
};

// pasar la configuracion y el campo
const upload = multer(configuracionMulter).single("imagen");

//sube un archivo
exports.subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ mensaje: error });
    }
    return next();
  });
};

//agrega nuevos productos
exports.nuevoProducto = async (req, res, next) => {
  const producto = new Productos(req.body);

  try {
    if (req.file.filename) {
      producto.imagen = req.file.filename;
    }
    await producto.save();
    res.json({ mensaje: "Se agrego un nuevo producto" });
  } catch (error) {
    console.log(error);
    next();
  }
};

//mostrar los productos
exports.mostrarProductos = async (req, res, next) => {
  try {
    //mostrar todos los productos
    const productos = await Productos.find({});
    res.json(productos);
  } catch (error) {
    console.log(error);
    next();
  }
};

//mostrar un producto por id
exports.mostrarProducto = async (req, res, next) => {
  const producto = await Productos.findById(req.params.idProducto);

  if (!producto) {
    res.json({ mensaje: "El producto no existe" });
    return next();
  }

  //mostrar el producto
  res.json(producto);
};

//actualizar un producto
exports.actualizarProducto = async (req, res, next) => {
  try {
    //construir un nuevo producto
    let nuevoProducto = req.body;

    //verificar si hay imagen nueva, sino hay ponemos la que esta en bd
    if (req.file) {
      nuevoProducto.imagen = req.file.filename;
    } else {
      let productoAnterior = await Productos.findById(req.param.idProducto);

      nuevoProducto.imagen = productoAnterior.imagen;
    }

    let producto = await Productos.findByIdAndUpdate(
      {
        _id: req.params.idProducto,
      },
      nuevoProducto,
      { new: true }
    );
    res.json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};

//eliminar un producto
exports.eliminarProducto = async (req, res, next) => {
  try {
    //obtener el producto para eliminar la img de vs code
    let producto = await Productos.findById(req.params.idProducto);

    //eliminar la img de la carpeta uploads
    const imagenPath = path.join(__dirname, "..", "uploads", producto.imagen);
    try {
      await fs.unlink(imagenPath);
    } catch (error) {
      console.log(error);
    }

    //eliminar el producto de la base de datos
    await Productos.findOneAndDelete({ _id: req.params.idProducto });
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    console.log(error);
    next();
  }
};

//buscar un producto
exports.buscarProducto = async (req, res, next) => {
  try {
    // obtener el query
    const { query } = req.params;

    // buscar el producto utilizando una expresión regular para búsqueda insensible a mayúsculas/minúsculas
    const producto = await Productos.find({ nombre: new RegExp(query, "i") });

    // devolver el producto encontrado
    res.json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};
