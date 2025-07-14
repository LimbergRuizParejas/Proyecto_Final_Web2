const naturalezaData = require('../utils/naturaleza.helper');

/**
 * Calcula un stat individual de un Pokémon a nivel 100.
 * @param {number} base - El valor base del stat.
 * @param {number} iv - El valor individual (IV) del stat.
 * @param {number} ev - El valor de esfuerzo (EV) del stat.
 * @param {string} naturaleza - La naturaleza del Pokémon.
 * @param {string} statName - El nombre del stat (por ejemplo, 'hp', 'atk', 'def', etc.).
 * @param {boolean} isHP - Si el stat es de tipo 'hp', se debe marcar como true.
 * @returns {number} El valor calculado del stat.
 */
function calcularStat(base, iv, ev, naturaleza, statName, isHP = false) {
  const nivel = 100;
  
  // Se obtiene el factor de la naturaleza para el stat dado
  const bonus = naturalezaData[statName]?.[naturaleza] || 1;

  if (isHP) {
    // Fórmula para el cálculo del HP
    return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * nivel) / 100) + nivel + 10;
  }

  // Fórmula para los demás stats
  return Math.floor(
    (((2 * base + iv + Math.floor(ev / 4)) * nivel) / 100 + 5) * bonus
  );
}

/**
 * Calcula todos los stats de un Pokémon a nivel 100.
 * @param {object} statsBase - Objeto con los stats base del Pokémon { hp, atk, def, sp_atk, sp_def, speed }.
 * @param {object} ivs - Objeto con los IVs por stat { hp, atk, def, sp_atk, sp_def, speed }.
 * @param {object} evs - Objeto con los EVs por stat { hp, atk, def, sp_atk, sp_def, speed }.
 * @param {string} naturaleza - Nombre de la naturaleza del Pokémon.
 * @returns {object} Objeto con los stats finales calculados { hp, atk, def, sp_atk, sp_def, speed }.
 */
function calcularTodosLosStats(statsBase, ivs, evs, naturaleza) {
  const nombresStats = ['hp', 'atk', 'def', 'sp_atk', 'sp_def', 'speed'];
  const resultado = {};

  // Validamos que los IVs y EVs no sean undefined
  const validEVs = evs || { hp: 0, atk: 0, def: 0, sp_atk: 0, sp_def: 0, speed: 0 };
  const validIVs = ivs || { hp: 31, atk: 31, def: 31, sp_atk: 31, sp_def: 31, speed: 31 };

  // Iteramos sobre los stats y calculamos cada uno
  for (const stat of nombresStats) {
    const isHP = stat === 'hp';
    
    // Llamamos a la función para calcular el stat y lo guardamos en el objeto resultado
    resultado[stat] = calcularStat(
      statsBase[stat],
      validIVs[stat],
      validEVs[stat],
      naturaleza,
      stat,
      isHP
    );
  }

  return resultado;
}

module.exports = {
  calcularStat,
  calcularTodosLosStats
};
