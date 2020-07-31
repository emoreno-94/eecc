/* eslint max-len: ["error", { "ignoreStrings": true }] */

const speciesFormat = {
  'C': {
    xlsx: 'NOMBRE CIENTÍFICO',
    db: {
      table: 'species',
      column: 'scientific_name',
    },
  },
  'D': {
    xlsx: 'NOMBRE COMÚN',
    db: {
      table: 'species',
      column: 'common_name',
    },
  },
  'E': {
    xlsx: 'SINONIMIA incompleta',
    db: {
      table: 'species',
      column: 'incomplete_synonymy',
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
    xlsx: 'HÁBITO  (sólo plantas)',
    db: {
      table: 'species',
      column: 'inhabit',
    },
  },
  'L': {
    xlsx: 'ENDÉMICA respecto de Chile  (? = dudoso)',
    db: {
      table: 'species',
      column: 'endemic',
    },
  },
  'M': {
    xlsx: 'DISTRIBUCIÓN REGIONES: ANT= ANTARTICA DV= DESVENTURADAS IP= ISLA DE PASCUA JF= Arch. JUAN FERNÁNDEZ SG= SALAS Y GOMEZ ? = Sin datos o de presencia dudosa o requiere confirmación',
    db: {
      table: 'species',
      column: 'distribution',
    },
  },
  'AI': {
    xlsx: 'CATEGORÍA VIGENTE: CR = En peligro crítico DD = Datos insuficientes EN = En Peligro EW= Extinta en estado silvestre EX = Extinta FP = Fuera de Peligro IC = Insuficientemente Conocida LC = Preocupación menor NT = Casi amenazada R  = Rara VU = Vulnerable',
    db: {
      table: 'species',
      column: 'valid_category_text',
    },
  },
  'AJ': {
    xlsx: 'FUENTE DE CATEGORÍA VIGENTE: CAZA = Reglamento Ley de CAZA RCE = Reglamento de Clasificación Especies.',
    db: {
      table: 'species',
      column: 'source_category',
    },
  },
  'AK': {
    xlsx: 'Criterio clasificación para especies RCE Vigentes',
    db: {
      table: 'species',
      column: 'classify_rule_for_valid_rce_species',
    },
  },
  'AL': {
    xlsx: 'NÚMERO PROCESO RCE  se clasificó categoría Vigente',
    db: {
      table: 'species',
      column: 'process_number_rce',
    },
  },
  'AM': {
    xlsx: 'REFERENCIA o DECRETO Categoría Vigente',
    db: {
      table: 'species',
      column: 'reference_or_decree_valid_category',
    },
  },
  'AN': {
    xlsx: 'Categoría anterior a RCE actual (no vigente) Bol_47 = Boletín 47 MNHN CAZA = Reglamento Ley de CAZA L_Rojo_Flora = Libro Rojo de flora L_Rojo_Vert = Libro Rojo de vertebrados Núñez et al. 1997 = Reunión de herpetólogos Yáñez et al. 1997 = Reunión especialistas mamíferos acuáticos RCE = Reglamento de Clasificación Especies.',
    db: {
      table: 'species',
      column: 'before_category_to_current_rce_not_valid',
    },
  },
  'AO': {
    xlsx: 'Fuente Categoría anterior a RCE actual (no vigente)',
    db: {
      table: 'species',
      column: 'before_source_category_to_current_rce_not_valid',
    },
  },
  'AP': {
    xlsx: 'Categoría Ante Anterior a RCE actual (no vigente) Bol_47 = Boletín 47 MNHN CAZA = Reglamento Ley de CAZA L_Rojo_Flora = Libro Rojo de flora L_Rojo_Vert = Libro Rojo de vertebrados Núñez et al. 1997 = Reunión de herpetólogos Yáñez et al. 1997 = Reunión especialistas mamíferos acuáticos RCE = Reglamento de Clasificación Especies.',
    db: {
      table: 'species',
      column: 'before_before_category_to_current_rce_not_valid',
    },
  },
  'AQ': {
    xlsx: 'Fuente Categoría  Ante Anterior a RCE actual (no vigente)',
    db: {
      table: 'species',
      column: 'before_before_source_category_to_current_rce_not_valid',
    },
  },
  'AR': {
    xlsx: 'Es vertebrado, INvertebrado, Planta u Hongo',
    db: {
      table: 'species',
      column: 'classification',
    },
  },
};

const regionsFormat = {
  'N': {
    xlsx: 'Arica y Parinacota',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'O': {
    xlsx: 'Tarapacá',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'P': {
    xlsx: 'Antofagasta',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'Q': {
    xlsx: 'Atacama',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'R': {
    xlsx: 'Coquimbo',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'S': {
    xlsx: 'Valparaíso continental',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'T': {
    xlsx: 'Metropolitana',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'U': {
    xlsx: 'O\'higgins',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'V': {
    xlsx: 'Maule',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'W': {
    xlsx: 'Ñuble',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'X': {
    xlsx: 'Bío-Bío',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'Y': {
    xlsx: 'Araucanía',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'Z': {
    xlsx: 'De Los Ríos',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'AA': {
    xlsx: 'De Los Lagos',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'AB': {
    xlsx: 'Aysén',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'AC': {
    xlsx: 'Magallanes continental e insular',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'AD': {
    xlsx: 'Antártica',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'AE': {
    xlsx: 'Isla Pascua',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'AF': {
    xlsx: 'Salas y Gómez',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'AG': {
    xlsx: 'Juan Fernandez',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
  'AH': {
    xlsx: 'Desventuradas',
    db: {
      table: 'regions',
      column: 'name',
    },
  },
};

const validCategoryFormat = {
  'AI': {
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
