'use strict';

const speciesFormat = {
  'B': {
    xlsx: 'NOMBRE CIENTÍFICO',
    db: {
      table: 'species',
      column: 'scientist_name',
    },
  },
  'C': {
    xlsx: 'NOMBRE COMÚN',
    db: {
      table: 'species',
      column: 'common_name',
    },
  },
  'D': {
    xlsx: 'SINONIMIA incompleta',
    db: {
      table: 'species',
      column: 'incomplete_synonymy',
    },
  },
  'E': {
    xlsx: 'HÁBITO  (sólo plantas)',
    db: {
      table: 'species',
      column: 'inhabit',
    },
  },
  'F': {
    xlsx: 'REINO',
    db: {
      table: 'species',
      column: 'kingdom',
    },
  },
  'G': {
    xlsx: 'PHYLLUM / DIVISIÓN',
    db: {
      table: 'species',
      column: 'division',
    },
  },
  'H': {
    xlsx: 'CLASE',
    db: {
      table: 'species',
      column: 'class',
    },
  },
  'I': {
    xlsx: 'ORDEN',
    db: {
      table: 'species',
      column: 'order',
    },
  },
  'J': {
    xlsx: 'FAMILIA',
    db: {
      table: 'species',
      column: 'family',
    },
  },
  'K': {
    xlsx: 'ENDÉMICA respecto de Chile  (? = dudoso)',
    db: {
      table: 'species',
      column: 'endemic',
    },
  },
  'L': {
    xlsx: 'DISTRIBUCIÓN REGIONES: ANT= ANTARTICA DV= DESVENTURADAS IP= ISLA DE PASCUA JF= Arch. JUAN FERNÁNDEZ SG= SALAS Y GOMEZ ? = Sin datos o de presencia dudosa o requiere confirmación',
    db: {
      table: 'species',
      column: 'distribution',
    },
  },
  'AG': {
    xlsx: 'CATEGORÍA VIGENTE: CR = En peligro crítico DD = Datos insuficientes EN = En Peligro EW= Extinta en estado silvestre EX = Extinta FP = Fuera de Peligro IC = Insuficientemente Conocida LC = Preocupación menor NT = Casi amenazada R  = Rara VU = Vulnerable',
    db: {
      table: 'species',
      column: 'valid_category_text',
    },
  },
  'AH': {
    xlsx: 'FUENTE DE CATEGORÍA VIG.: Bol_47 = Boletín 47 MNHN CAZA  = Reglamento Ley de CAZA L_Rojo_Flora = Libro Rojo de flora L_Rojo_Vert = Libro Rojo de vertebrados Núñez et al. 1997 = Reunión de herpetólogos Yáñez et al. 1997 = Reunión especialistas mamíferos acuáticos RCE = Reglamento de Clasificación Especies.',
    db: {
      table: 'species',
      column: 'source_category',
    },
  },
  'AI': {
    xlsx: 'Criterio clasificación para especies RCE Vigentes',
    db: {
      table: 'species',
      column: 'classify_rule_for_valid_rce_species',
    },
  },
  'AJ': {
    xlsx: 'NÚMERO PROCESO RCE  se clasificó categoría Vigente',
    db: {
      table: 'species',
      column: 'process_number_rce',
    },
  },
  'AK': {
    xlsx: 'REFERENCIA o DECRETO Categoría Vigente',
    db: {
      table: 'species',
      column: 'reference_or_decree_valid_category',
    },
  },
  'AL': {
    xlsx: 'Categoría anterior a RCE actual (no vigente)',
    db: {
      table: 'species',
      column: 'before_category_to_current_rce_not_valid',
    },
  },
  'AM': {
    xlsx: 'Fuente Categoría anterior a RCE actual (no vigente)',
    db: {
      table: 'species',
      column: 'before_source_category_to_current_rce_not_valid',
    },
  },
  'AN': {
    xlsx: 'Categoría Ante Anterior a RCE actual (no vigente)',
    db: {
      table: 'species',
      column: 'before_before_category_to_current_rce_not_valid',
    },
  },
  'AO': {
    xlsx: 'Fuente Categoría  Ante Anterior a RCE actual (no vigente)',
    db: {
      table: 'species',
      column: 'before_before_source_category_to_current_rce_not_valid',
    },
  },
  'AP': {
    xlsx: 'Es vertebrado, INvertebrado, Planta u Hongo',
    db: {
      table: 'species',
      column: 'classification',
    },
  },
};

const regionsFormat = {
  'M': {
    xlsx: 'Arica y Parinacota',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'N': {
    xlsx: 'Tarapacá',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'O': {
    xlsx: 'Antofagasta',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'P': {
    xlsx: 'Atacama',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'Q': {
    xlsx: 'Coquimbo',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'R': {
    xlsx: 'Valparaíso continental',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'S': {
    xlsx: 'Metropolitana',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'T': {
    xlsx: 'O\'higgins',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'U': {
    xlsx: 'Maule',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'V': {
    xlsx: 'Bío-Bío',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'W': {
    xlsx: 'Araucanía',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'X': {
    xlsx: 'De Los Ríos',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'Y': {
    xlsx: 'De Los Lagos',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'Z': {
    xlsx: 'Aysén',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'AA': {
    xlsx: 'Magallanes continental e insular',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'AB': {
    xlsx: 'Antártica',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'AC': {
    xlsx: 'Isla Pascua',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'AD': {
    xlsx: 'Salas y Gómez',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'AE': {
    xlsx: 'Juan Fernandez',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'AF': {
    xlsx: 'Desventuradas',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
};

const validCategoryFormat = {
  'AG': {
    xlsx: 'CATEGORÍA VIGENTE: CR = En peligro crítico DD = Datos insuficientes EN = En Peligro EW= Extinta en estado silvestre EX = Extinta FP = Fuera de Peligro IC = Insuficientemente Conocida LC = Preocupación menor NT = Casi amenazada R  = Rara VU = Vulnerable',
    db: {
      table: 'valid_category',
      column: 'short_name',
    },
  },
};

module.exports = {
  speciesFormat,
  regionsFormat,
  validCategoryFormat,
};