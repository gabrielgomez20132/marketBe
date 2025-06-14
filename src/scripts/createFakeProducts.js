const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('../config/database');

const Product = require('../models/Product');
const Category = require('../models/Category'); // Asegúrate de tener este modelo

// Datos base para categorías
const fakeCategories = [
  { name: 'Smartphones', description: 'Dispositivos móviles inteligentes', image: '', isActive: true },
  { name: 'Laptops', description: 'Ordenadores portátiles', image: '', isActive: true },
  { name: 'Smartwatches', description: 'Relojes inteligentes', image: '', isActive: true },
  { name: 'Tablets', description: 'Dispositivos tipo tablet', image: '', isActive: true },
  { name: 'Auriculares', description: 'Auriculares y audífonos', image: '', isActive: true },
  { name: 'Televisores', description: 'Pantallas y televisores', image: '', isActive: true },
  { name: 'Cámaras', description: 'Cámaras fotográficas y de video', image: '', isActive: true },
  { name: 'Redes', description: 'Dispositivos de red', image: '', isActive: true },
  { name: 'Proyectores', description: 'Proyectores multimedia', image: '', isActive: true },
  { name: 'Altavoces', description: 'Parlantes y altavoces', image: '', isActive: true },
  { name: 'Monitores', description: 'Pantallas para PC', image: '', isActive: true }
];

// Productos con nombres de categorías, que luego serán reemplazadas por los ObjectIds reales
const rawFakeProducts = [
  { name: 'Smartphone Samsung Galaxy S23', description: 'Smartphone de última generación con cámara de 108 MP', price: 999, salePrice: 899, stock: 100, category: 'Smartphones', image: 'https://example.com/samsung-galaxy-s23.jpg', brand: 'Samsung', isActive: true, rating: 4.5, sku: 'SKU1001' },
  { name: 'Laptop Dell XPS 13', description: 'Laptop ultradelgada con procesador i7 y pantalla 4K', price: 1500, salePrice: 1400, stock: 50, category: 'Laptops', image: 'https://example.com/dell-xps-13.jpg', brand: 'Dell', isActive: true, rating: 4.7, sku: 'SKU1002' },
  { name: 'Smartwatch Apple Watch Series 8', description: 'Reloj inteligente con funciones de salud y monitorización', price: 400, salePrice: 350, stock: 200, category: 'Smartwatches', image: 'https://example.com/apple-watch-series-8.jpg', brand: 'Apple', isActive: true, rating: 4.6, sku: 'SKU1003' },
  { name: 'Tablet Samsung Galaxy Tab S8', description: 'Tablet Android con pantalla AMOLED y procesador Snapdragon', price: 800, salePrice: 750, stock: 150, category: 'Tablets', image: 'https://example.com/samsung-galaxy-tab-s8.jpg', brand: 'Samsung', isActive: true, rating: 4.4, sku: 'SKU1004' },
  { name: 'Auriculares Sony WH-1000XM5', description: 'Auriculares con cancelación de ruido y sonido premium', price: 350, salePrice: 320, stock: 120, category: 'Auriculares', image: 'https://example.com/sony-wh-1000xm5.jpg', brand: 'Sony', isActive: true, rating: 4.8, sku: 'SKU1005' },
  { name: 'Televisor LG OLED55CXPUA', description: 'Televisor OLED de 55 pulgadas con calidad 4K', price: 1500, salePrice: 1400, stock: 80, category: 'Televisores', image: 'https://example.com/lg-oled55c.jpg', brand: 'LG', isActive: true, rating: 4.9, sku: 'SKU1006' },
  { name: 'Cámara Canon EOS R5', description: 'Cámara sin espejo de 45 MP con grabación 8K', price: 4000, salePrice: 3800, stock: 30, category: 'Cámaras', image: 'https://example.com/canon-eos-r5.jpg', brand: 'Canon', isActive: true, rating: 4.9, sku: 'SKU1007' },
  { name: 'Router WiFi 6 TP-Link Archer AX6000', description: 'Router Wi-Fi 6 de alta velocidad para múltiples dispositivos', price: 250, salePrice: 230, stock: 90, category: 'Redes', image: 'https://example.com/tplink-archer-ax6000.jpg', brand: 'TP-Link', isActive: true, rating: 4.6, sku: 'SKU1008' },
  { name: 'Auriculares Bose QuietComfort 45', description: 'Auriculares con cancelación activa de ruido y sonido balanceado', price: 400, salePrice: 380, stock: 70, category: 'Auriculares', image: 'https://example.com/bose-quietcomfort-45.jpg', brand: 'Bose', isActive: true, rating: 4.7, sku: 'SKU1009' },
  { name: 'Smartphone iPhone 14 Pro', description: 'Smartphone con cámara de 48 MP y pantalla ProMotion', price: 1100, salePrice: 1000, stock: 200, category: 'Smartphones', image: 'https://example.com/iphone-14-pro.jpg', brand: 'Apple', isActive: true, rating: 4.8, sku: 'SKU1010' },
  { name: 'Proyector Epson Home Cinema 3800', description: 'Proyector 4K para cine en casa con gran brillo y contraste', price: 1200, salePrice: 1100, stock: 60, category: 'Proyectores', image: 'https://example.com/epson-home-cinema-3800.jpg', brand: 'Epson', isActive: true, rating: 4.6, sku: 'SKU1011' },
  { name: 'Altavoces JBL Flip 6', description: 'Altavoces Bluetooth portátiles resistentes al agua', price: 120, salePrice: 100, stock: 100, category: 'Altavoces', image: 'https://example.com/jbl-flip-6.jpg', brand: 'JBL', isActive: true, rating: 4.5, sku: 'SKU1012' },
  { name: 'Tablet Apple iPad Air 5', description: 'Tablet Apple con chip M1 y pantalla Liquid Retina', price: 650, salePrice: 600, stock: 180, category: 'Tablets', image: 'https://example.com/apple-ipad-air-5.jpg', brand: 'Apple', isActive: true, rating: 4.7, sku: 'SKU1013' },
  { name: 'Laptop MacBook Pro 16"', description: 'Laptop Apple con chip M1 Pro y pantalla Retina', price: 2500, salePrice: 2400, stock: 40, category: 'Laptops', image: 'https://example.com/macbook-pro-16.jpg', brand: 'Apple', isActive: true, rating: 4.9, sku: 'SKU1014' },
  { name: 'Smartphone Google Pixel 7', description: 'Smartphone Google con cámara de 50 MP y pantalla AMOLED', price: 850, salePrice: 800, stock: 90, category: 'Smartphones', image: 'https://example.com/google-pixel-7.jpg', brand: 'Google', isActive: true, rating: 4.6, sku: 'SKU1015' },
  { name: 'Cámara Sony Alpha 7C', description: 'Cámara sin espejo compacta con sensor full-frame', price: 2200, salePrice: 2100, stock: 40, category: 'Cámaras', image: 'https://example.com/sony-alpha-7c.jpg', brand: 'Sony', isActive: true, rating: 4.8, sku: 'SKU1016' },
  { name: 'Laptop HP Spectre x360', description: 'Laptop convertible con pantalla táctil 4K y procesador i7', price: 1400, salePrice: 1300, stock: 70, category: 'Laptops', image: 'https://example.com/hp-spectre-x360.jpg', brand: 'HP', isActive: true, rating: 4.7, sku: 'SKU1017' },
  { name: 'Auriculares Sennheiser Momentum 4', description: 'Auriculares de alta calidad con cancelación de ruido', price: 350, salePrice: 300, stock: 110, category: 'Auriculares', image: 'https://example.com/sennheiser-momentum-4.jpg', brand: 'Sennheiser', isActive: true, rating: 4.7, sku: 'SKU1018' },
  { name: 'Monitor LG UltraWide 34WN80C-B', description: 'Monitor ultra ancho 34" con resolución 1440p y soporte ajustable', price: 450, salePrice: 400, stock: 55, category: 'Monitores', image: 'https://example.com/lg-ultrawide-34wn80c.jpg', brand: 'LG', isActive: true, rating: 4.6, sku: 'SKU1019' },
  { name: 'Cámara Nikon Z6 II', description: 'Cámara sin espejo full-frame con grabación 4K', price: 2000, salePrice: 1900, stock: 25, category: 'Cámaras', image: 'https://example.com/nikon-z6-ii.jpg', brand: 'Nikon', isActive: true, rating: 4.8, sku: 'SKU1020' }
];

async function loadFakeProducts() {
  try {
    await connectDB();
    console.log('✅ Conectado a MongoDB');

    // Limpiar colecciones
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('🧹 Colecciones de productos y categorías limpiadas');

    // Insertar categorías
    const insertedCategories = await Category.insertMany(fakeCategories);
    const categoryMap = {};
    insertedCategories.forEach(cat => categoryMap[cat.name.toLowerCase()] = cat._id);

    // Asignar ID de categoría a cada producto
    const productsWithCategoryIds = rawFakeProducts.map(prod => ({
      ...prod,
      category: categoryMap[prod.category.toLowerCase()]
    }));

    // Insertar productos
    await Product.insertMany(productsWithCategoryIds);
    console.log('🎉 Productos y categorías cargados exitosamente');
    
  } catch (error) {
    console.error('❌ Error al cargar productos y categorías:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB');
  }
}

loadFakeProducts();
