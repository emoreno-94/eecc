'use strict';


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('region').del()
    .then(function () {
      // Inserts seed entries
      return knex('region').insert([
        {id: 1, name: 'Arica y Parinacota'},
        {id: 2, name: 'Tarapacá'},
        {id: 3, name: 'Antofagasta'},
        {id: 4, name: 'Atacama'},
        {id: 5, name: 'Coquimbo'},
        {id: 6, name: 'Valparaíso continental'},
        {id: 7, name: 'Metropolitana'},
        {id: 8, name: 'O\'higgins'},
        {id: 9, name: 'Maule'},
        {id: 10, name: 'Bío-Bío'},
        {id: 11, name: 'Araucanía'},
        {id: 12, name: 'De Los Ríos'},
        {id: 13, name: 'De Los Lagos'},
        {id: 14, name: 'Aysén'},
        {id: 15, name: 'Magallanes continental e insular'},
        {id: 16, name: 'Antártica'},
        {id: 17, name: 'Isla Pascua'},
        {id: 18, name: 'Salas y Gómez'},
        {id: 19, name: 'Juan Fernandez'},
        {id: 20, name: 'Desventuradas'},
      ]);
    });
};
