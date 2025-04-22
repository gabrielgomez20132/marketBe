const { validationResult } = require('express-validator');
const superheroService = require('../services/superheroService');

exports.getSuperheros = async (req, res) => {
    try {
         console.log('Obteniendo lista de superhéroes', {
            page: req.query.page,
            limit: req.query.limit
        });

        const result = await superheroService.getAll(
            parseInt(req.query.page),
            parseInt(req.query.limit)
        );

         console.log('Superhéroes obtenidos exitosamente', {
            count: result.data.length,
            pagination: result.pagination
        });

        res.json(result);
    } catch (error) {
         console.log('Error obteniendo superhéroes:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.getSuperheroById = async (req, res) => {
    try {
         console.log('Buscando superhéroe por ID', { id: req.params.id });

        const superhero = await superheroService.getById(req.params.id);

         console.log('Superhéroe encontrado exitosamente', {
            superheroId: superhero._id,
            superheroName: superhero.name
        });

        res.json(superhero);
    } catch (error) {
         console.log('Error obteniendo superhéroe:', error);
        res.status(error.message === 'Superhéroe no encontrado' ? 404 : 500)
            .json({ message: error.message || 'Error en el servidor' });
    }
};

exports.createSuperhero = async (req, res) => {
    try {

         console.log('Creando nuevo superhéroe', {
            superheroData: { ...req.body, password: undefined }
        });

        const superhero = await superheroService.create(req.body);

         console.log('Superhéroe creado exitosamente', {
            superheroId: superhero._id,
            superheroName: superhero.name
        });

        res.status(201).json(superhero);
    } catch (error) {
         console.log('Error creando superhéroe:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.updateSuperhero = async (req, res) => {
    try {


         console.log('Actualizando superhéroe', {
            id: req.params.id,
            updateData: req.body
        });

        const superhero = await superheroService.update(req.params.id, req.body);

         console.log('Superhéroe actualizado exitosamente', {
            superheroId: superhero._id,
            superheroName: superhero.name
        });

        res.json(superhero);
    } catch (error) {
         console.log('Error actualizando superhéroe:', error);
        res.status(error.message === 'Superhéroe no encontrado' ? 404 : 500)
            .json({ message: error.message || 'Error en el servidor' });
    }
};

exports.deleteSuperhero = async (req, res) => {
    console.log('Usuario autenticado:', req.user);
    try {
         console.log('Eliminando superhéroe', { id: req.params.id });

        await superheroService.delete(req.params.id);

         console.log('Superhéroe eliminado exitosamente', { id: req.params.id });

        res.json({ message: 'Superhéroe eliminado exitosamente' });
    } catch (error) {
         console.log('Error eliminando superhéroe:', error);
        res.status(error.message === 'Superhéroe no encontrado' ? 404 : 500)
            .json({ message: error.message || 'Error en el servidor' });
    }
};