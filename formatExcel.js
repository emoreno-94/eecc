/* eslint max-len: ["error", { "ignoreStrings": true }] */

const speciesFormat = {
  'B': {
    xlsx: 'NOMBRE CIENTÍFICO',
    db: {
      table: 'species',
      column: 'scientific_name',
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
    xlsx: 'REINO',
    db: {
      table: 'species',
      column: 'kingdom',
    },
  },
  'F': {
    xlsx: 'PHYLLUM / DIVISIÓN',
    db: {
      table: 'species',
      column: 'division',
    },
  },
  'G': {
    xlsx: 'CLASE',
    db: {
      table: 'species',
      column: 'class',
    },
  },
  'H': {
    xlsx: 'ORDEN',
    db: {
      table: 'species',
      column: 'order',
    },
  },
  'I': {
    xlsx: 'FAMILIA',
    db: {
      table: 'species',
      column: 'family',
    },
  },
  'J': {
    xlsx: 'HÁBITO  (sólo plantas)',
    db: {
      table: 'species',
      column: 'inhabit',
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
  'AH': {
    xlsx: 'CATEGORÍA VIGENTE: CR = En peligro crítico DD = Datos insuficientes EN = En Peligro EW= Extinta en estado silvestre EX = Extinta FP = Fuera de Peligro IC = Insuficientemente Conocida LC = Preocupación menor NT = Casi amenazada R  = Rara VU = Vulnerable',
    db: {
      table: 'species',
      column: 'valid_category_text',
    },
  },
  'AI': {
    xlsx: 'FUENTE DE CATEGORÍA VIGENTE: CAZA = Reglamento Ley de CAZA RCE = Reglamento de Clasificación Especies.',
    db: {
      table: 'species',
      column: 'source_category',
    },
  },
  'AJ': {
    xlsx: 'Criterio clasificación para especies RCE Vigentes',
    db: {
      table: 'species',
      column: 'classify_rule_for_valid_rce_species',
    },
  },
  'AK': {
    xlsx: 'NÚMERO PROCESO RCE  se clasificó categoría Vigente',
    db: {
      table: 'species',
      column: 'process_number_rce',
    },
  },
  'AL': {
    xlsx: 'REFERENCIA o DECRETO Categoría Vigente',
    db: {
      table: 'species',
      column: 'reference_or_decree_valid_category',
    },
  },
  'AM': {
    xlsx: 'Categoría anterior a RCE actual (no vigente) Bol_47 = Boletín 47 MNHN CAZA = Reglamento Ley de CAZA L_Rojo_Flora = Libro Rojo de flora L_Rojo_Vert = Libro Rojo de vertebrados Núñez et al. 1997 = Reunión de herpetólogos Yáñez et al. 1997 = Reunión especialistas mamíferos acuáticos RCE = Reglamento de Clasificación Especies.',
    db: {
      table: 'species',
      column: 'before_category_to_current_rce_not_valid',
    },
  },
  'AN': {
    xlsx: 'Fuente Categoría anterior a RCE actual (no vigente)',
    db: {
      table: 'species',
      column: 'before_source_category_to_current_rce_not_valid',
    },
  },
  'AO': {
    xlsx: 'Categoría Ante Anterior a RCE actual (no vigente) Bol_47 = Boletín 47 MNHN CAZA = Reglamento Ley de CAZA L_Rojo_Flora = Libro Rojo de flora L_Rojo_Vert = Libro Rojo de vertebrados Núñez et al. 1997 = Reunión de herpetólogos Yáñez et al. 1997 = Reunión especialistas mamíferos acuáticos RCE = Reglamento de Clasificación Especies.',
    db: {
      table: 'species',
      column: 'before_before_category_to_current_rce_not_valid',
    },
  },
  'AP': {
    xlsx: 'Fuente Categoría  Ante Anterior a RCE actual (no vigente)',
    db: {
      table: 'species',
      column: 'before_before_source_category_to_current_rce_not_valid',
    },
  },
  'AQ': {
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
    xlsx: 'Ñuble',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'W': {
    xlsx: 'Bío-Bío',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'X': {
    xlsx: 'Araucanía',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'Y': {
    xlsx: 'De Los Ríos',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'Z': {
    xlsx: 'De Los Lagos',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'AA': {
    xlsx: 'Aysén',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'AB': {
    xlsx: 'Magallanes continental e insular',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'AC': {
    xlsx: 'Antártica',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'AD': {
    xlsx: 'Isla Pascua',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'AE': {
    xlsx: 'Salas y Gómez',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'AF': {
    xlsx: 'Juan Fernandez',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'AG': {
    xlsx: 'Desventuradas',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
};

const validCategoryFormat = {
  'AH': {
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
