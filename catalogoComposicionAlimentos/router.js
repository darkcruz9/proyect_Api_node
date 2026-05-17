const { Router } = require('express');
const {catalogoNutricionalController} = require('./controller.js');

const router = Router();

//Establecemos los EndPoints

//getAll 
router.get('/', catalogoNutricionalController.read);
router.post('/', catalogoNutricionalController.create);
router.get('/:id', catalogoNutricionalController.getById);
router.delete('/:id', catalogoNutricionalController.delete);
router.patch('/:id', catalogoNutricionalController.update);

module.exports = {
    router
}