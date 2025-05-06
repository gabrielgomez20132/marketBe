/**
 * Helper de paginación reutilizable
 * @param {Object} req - Objeto request de Express (usa req.query)
 * @param {Function} getData - Función para obtener los datos con paginación ({ skip, limit, ...filters }) => Promise<Array>
 * @param {Function} getTotal - Función para contar los registros totales (...filters) => Promise<Number>
 * @returns {Object} Objeto con datos paginados
 */
const paginate = async (req, getData, getTotal) => {
    // Obtenemos la página y el límite de los parámetros query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    // Filtros: si el parámetro "search" está presente en la consulta, lo agregamos al objeto de filtros
    const filters = {};
    if (req.query.search) {
        filters.search = req.query.search;
    }

    // Ejecutamos ambas funciones (getData y getTotal) de manera paralela con Promise.all
    const [data, totalRecords] = await Promise.all([
        getData({ skip, limit, ...filters }),  // getData recibe los filtros y la paginación
        getTotal(filters)                     // getTotal recibe los filtros
    ]);

    // Calculamos el total de páginas
    const totalPages = Math.ceil(totalRecords / limit);

    return {
        data,               // Los datos obtenidos
        current_page: page, // Página actual
        total_pages: totalPages, // Total de páginas
        total_records: totalRecords, // Total de registros
        limit               // Límite de resultados por página
    };
};

module.exports = paginate;
