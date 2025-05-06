const Order = require('../models/Order');
const Product = require('../models/Product');

/* exports.createOrder = async (req, res) => {
  try {
    const { user, items, paymentMethod, shippingAddress } = req.body;

    // Calcular total de la orden
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Validar stock y actualizar
    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: `Producto no encontrado: ${item.product}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Stock insuficiente para ${product.name}` });
      }

      // Decrementar el stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Crear la orden
    const newOrder = new Order({
      user,
      items,
      total,
      paymentMethod,
      shippingAddress,
      status: 'paid' // opcional: podés dejarlo como 'pending'
    });

    await newOrder.save();

    res.status(201).json({ message: 'Orden creada con éxito', order: newOrder });
  } catch (error) {
    console.error('Error al crear la orden:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}; */


exports.createOrder = async (req, res) => {
    //console.log(req.body);
    try {
      const { user, items, paymentMethod, shippingAddress, coupon } = req.body;
  
      // Calcular total de la orden sin descuento
      let total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
      // Aplicar descuento si hay cupón
      let discount = 0;
      if (coupon && coupon.discount) {
        discount = (total * coupon.discount) / 100;
        total = total - discount;
      }
  
      // Validar stock y actualizar
      for (const item of items) {
        const product = await Product.findById(item.product);
  
        if (!product) {
          return res.status(404).json({ message: `Producto no encontrado: ${item.product}` });
        }
  
        if (product.stock < item.quantity) {
          return res.status(400).json({ message: `Stock insuficiente para ${product.name}` });
        }
  
        product.stock -= item.quantity;
        await product.save();
      }
  
      // Crear la orden
      const newOrder = new Order({
        user,
        items,
        total,
        coupon: coupon ? { code: coupon.code, discount: coupon.discount } : undefined,
        paymentMethod,
        shippingAddress,
        status: 'paid'
      });
  
      await newOrder.save();
  
      res.status(201).json({ message: 'Orden creada con éxito', order: newOrder });
    } catch (error) {
      console.error('Error al crear la orden:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

exports.getUserOrders = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const orders = await Order.find({ user: userId })
        .populate({
          path: 'items.product',
          select: 'name image price brand'
        })
        .sort({ createdAt: -1 }); // órdenes más recientes primero
  
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error al obtener órdenes del usuario:', error);
      res.status(500).json({ message: 'Error al obtener órdenes del usuario' });
    }
  };