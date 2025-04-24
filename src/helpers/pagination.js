/**
 * Helper de paginación reutilizable
 * @param {Object} req - Objeto request de Express (usa req.query)
 * @param {Function} getData - Función para obtener los datos con paginación ({ skip, limit }) => Promise<Array>
 * @param {Function} getTotal - Función para contar los registros totales () => Promise<Number>
 * @returns {Object} Objeto con datos paginados
 */
const paginate = async (req, getData, getTotal) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [data, totalRecords] = await Promise.all([
        getData({ skip, limit }),
        getTotal()
    ]);

    const totalPages = Math.ceil(totalRecords / limit);

    return {
        data,
        current_page: page,
        total_pages: totalPages,
        total_records: totalRecords,
        limit
    };
};

module.exports = paginate;