const axios = require('axios');

const getTopProducts = async (req, res) => {
  try {
    const url = `${process.env.URL_ML}/highlights/MLA/category/MLA1055`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN_ML}`,
      },
    });

    // Verificar si la respuesta contiene productos en 'content'
    if (!response.data || !response.data.content || response.data.content.length === 0) {
      throw new Error('No se encontraron productos en la respuesta.');
    }

    const productIds = response.data.content.map((product) => product.id);

    // Obtener detalles de cada producto
    const productDetailsPromises = productIds.map(async (productId) => {
      const productUrl = `https://api.mercadolibre.com/products/${productId}`; // URL con el ID del producto
      /* console.log('productURL',productUrl); */
      try {
        const productResponse = await axios.get(productUrl, {
          headers: {
            Authorization: `Bearer ${process.env.TOKEN_ML}`,
          },
        });

        // Extraer información relevante del producto
        const productData = productResponse.data;
        //console.log('Respuesta de la API de MercadoLibre pictures:', productData.pictures);

        // Asegurarse de que 'pictures' tiene imágenes y acceder a la primera
        const thumbnail = productData.pictures && productData.pictures.length > 0 ? productData.pictures[0].url : '';

        return {
          id: productData.id,
          name: productData.name,
          permalink: productData.permalink,
          price: productData.buy_box_winner.price,
          currency: productData.buy_box_winner.currency_id,
          shipping: productData.buy_box_winner.shipping.free_shipping,
          family_name: productData.family_name,
          thumbnail: thumbnail, 
        };
      } catch (error) {
        console.error(`Error al obtener los detalles del producto ${productId}:`, error.message);
        return {
          id: productId,
          error: 'No se pudo obtener detalles del producto',
        };
      }
    });

    // Esperar que todas las promesas se resuelvan
    const productDetails = await Promise.all(productDetailsPromises);

    // Responder con los detalles de los productos
    res.json({
      success: true,
      data: productDetails,
    });
  } catch (error) {
    console.error('Error al obtener los productos:', error.message);
    res.status(500).json({
      success: false,
      message: `Error al obtener los productos: ${error.message}`,
    });
  }
};

module.exports = { getTopProducts };
