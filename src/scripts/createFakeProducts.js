const mongoose = require('mongoose');
const Product = require('../models/Product'); // Asegúrate de que la ruta sea correcta
require('dotenv').config();
const connectDB = require('../config/database');

// Datos falsos para los productos electrónicos
const fakeProducts = [
    { name: 'Smartphone Samsung Galaxy S23', description: 'Smartphone de última generación con cámara de 108 MP', price: 999, stock: 100, category: 'Smartphones', image: 'https://example.com/samsung-galaxy-s23.jpg', brand: 'Samsung', isActive: true, rating: 4.5, sku: 'SKU1001' },
    { name: 'Laptop Dell XPS 13', description: 'Laptop ultradelgada con procesador i7 y pantalla 4K', price: 1500, stock: 50, category: 'Laptops', image: 'https://example.com/dell-xps-13.jpg', brand: 'Dell', isActive: true, rating: 4.7, sku: 'SKU1002' },
    { name: 'Smartwatch Apple Watch Series 8', description: 'Reloj inteligente con funciones de salud y monitorización', price: 400, stock: 200, category: 'Smartwatches', image: 'https://example.com/apple-watch-series-8.jpg', brand: 'Apple', isActive: true, rating: 4.6, sku: 'SKU1003' },
    { name: 'Tablet Samsung Galaxy Tab S8', description: 'Tablet Android con pantalla AMOLED y procesador Snapdragon', price: 800, stock: 150, category: 'Tablets', image: 'https://example.com/samsung-galaxy-tab-s8.jpg', brand: 'Samsung', isActive: true, rating: 4.4, sku: 'SKU1004' },
    { name: 'Auriculares Sony WH-1000XM5', description: 'Auriculares con cancelación de ruido y sonido premium', price: 350, stock: 120, category: 'Auriculares', image: 'https://example.com/sony-wh-1000xm5.jpg', brand: 'Sony', isActive: true, rating: 4.8, sku: 'SKU1005' },
    { name: 'Televisor LG OLED55CXPUA', description: 'Televisor OLED de 55 pulgadas con calidad 4K', price: 1500, stock: 80, category: 'Televisores', image: 'https://example.com/lg-oled55c.jpg', brand: 'LG', isActive: true, rating: 4.9, sku: 'SKU1006' },
    { name: 'Cámara Canon EOS R5', description: 'Cámara sin espejo de 45 MP con grabación 8K', price: 4000, stock: 30, category: 'Cámaras', image: 'https://example.com/canon-eos-r5.jpg', brand: 'Canon', isActive: true, rating: 4.9, sku: 'SKU1007' },
    { name: 'Router WiFi 6 TP-Link Archer AX6000', description: 'Router Wi-Fi 6 de alta velocidad para múltiples dispositivos', price: 250, stock: 90, category: 'Redes', image: 'https://example.com/tplink-archer-ax6000.jpg', brand: 'TP-Link', isActive: true, rating: 4.6, sku: 'SKU1008' },
    { name: 'Auriculares Bose QuietComfort 45', description: 'Auriculares con cancelación activa de ruido y sonido balanceado', price: 400, stock: 70, category: 'Auriculares', image: 'https://example.com/bose-quietcomfort-45.jpg', brand: 'Bose', isActive: true, rating: 4.7, sku: 'SKU1009' },
    { name: 'Smartphone iPhone 14 Pro', description: 'Smartphone con cámara de 48 MP y pantalla ProMotion', price: 1100, stock: 200, category: 'Smartphones', image: 'https://example.com/iphone-14-pro.jpg', brand: 'Apple', isActive: true, rating: 4.8, sku: 'SKU1010' },
    { name: 'Proyector Epson Home Cinema 3800', description: 'Proyector 4K para cine en casa con gran brillo y contraste', price: 1200, stock: 60, category: 'Proyectores', image: 'https://example.com/epson-home-cinema-3800.jpg', brand: 'Epson', isActive: true, rating: 4.6, sku: 'SKU1011' },
    { name: 'Altavoces JBL Flip 6', description: 'Altavoces Bluetooth portátiles resistentes al agua', price: 120, stock: 100, category: 'Altavoces', image: 'https://example.com/jbl-flip-6.jpg', brand: 'JBL', isActive: true, rating: 4.5, sku: 'SKU1012' },
    { name: 'Tablet Apple iPad Air 5', description: 'Tablet Apple con chip M1 y pantalla Liquid Retina', price: 650, stock: 180, category: 'Tablets', image: 'https://example.com/apple-ipad-air-5.jpg', brand: 'Apple', isActive: true, rating: 4.7, sku: 'SKU1013' },
    { name: 'Laptop MacBook Pro 16"', description: 'Laptop Apple con chip M1 Pro y pantalla Retina', price: 2500, stock: 40, category: 'Laptops', image: 'https://example.com/macbook-pro-16.jpg', brand: 'Apple', isActive: true, rating: 4.9, sku: 'SKU1014' },
    { name: 'Smartphone Google Pixel 7', description: 'Smartphone Google con cámara de 50 MP y pantalla AMOLED', price: 850, stock: 90, category: 'Smartphones', image: 'https://example.com/google-pixel-7.jpg', brand: 'Google', isActive: true, rating: 4.6, sku: 'SKU1015' },
    { name: 'Cámara Sony Alpha 7C', description: 'Cámara sin espejo compacta con sensor full-frame', price: 2200, stock: 40, category: 'Cámaras', image: 'https://example.com/sony-alpha-7c.jpg', brand: 'Sony', isActive: true, rating: 4.8, sku: 'SKU1016' },
    { name: 'Laptop HP Spectre x360', description: 'Laptop convertible con pantalla táctil 4K y procesador i7', price: 1400, stock: 70, category: 'Laptops', image: 'https://example.com/hp-spectre-x360.jpg', brand: 'HP', isActive: true, rating: 4.7, sku: 'SKU1017' },
    { name: 'Auriculares Sennheiser Momentum 4', description: 'Auriculares de alta calidad con cancelación de ruido', price: 350, stock: 110, category: 'Auriculares', image: 'https://example.com/sennheiser-momentum-4.jpg', brand: 'Sennheiser', isActive: true, rating: 4.7, sku: 'SKU1018' },
    { name: 'Monitor LG UltraWide 34WN80C-B', description: 'Monitor ultra ancho 34" con resolución 1440p y soporte ajustable', price: 450, stock: 55, category: 'Monitores', image: 'https://example.com/lg-ultrawide-34wn80c.jpg', brand: 'LG', isActive: true, rating: 4.6, sku: 'SKU1019' },
    { name: 'Cámara Nikon Z6 II', description: 'Cámara sin espejo full-frame con grabación 4K', price: 2000, stock: 25, category: 'Cámaras', image: 'https://example.com/nikon-z6-ii.jpg', brand: 'Nikon', isActive: true, rating: 4.8, sku: 'SKU1020' }
];

async function loadFakeProducts() {
    try {
        await connectDB();
        console.log('Conectado a MongoDB');

        // Limpiar la colección de productos existentes
        await Product.deleteMany({});
        console.log('Colección de productos limpiada');

        // Insertar los productos falsos
        await Product.insertMany(fakeProducts);
        console.log('Productos cargados exitosamente');
    } catch (error) {
        console.error('Error al cargar productos:', error);
    } finally {
        await mongoose.disconnect();
    }
}

loadFakeProducts();
