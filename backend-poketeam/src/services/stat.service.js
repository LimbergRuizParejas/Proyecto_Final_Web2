const naturalezaData = require('../utils/naturaleza.helper');

/**
 * 
 * @param {number} base -
 * @param {number} iv -.
 * @param {number} ev -
 * @param {string} naturaleza -
 * @param {string} statName -
 * @param {boolean} isHP - .
 * @returns {number} 
 */
function calcularStat(base, iv, ev, naturaleza, statName, isHP = false) {
  const nivel = 100;
  
  //
  const bonus = naturalezaData[statName]?.[naturaleza] || 1;

  if (isHP) {
    //
    return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * nivel) / 100) + nivel + 10;
  }

  //
  return Math.floor(
    (((2 * base + iv + Math.floor(ev / 4)) * nivel) / 100 + 5) * bonus
  );
}

/**
 * .
 * @param {object} statsBase -
 * @param {object} ivs -
 * @param {object} evs -
 * @param {string} naturaleza -
 * @returns {object} 
 */
function calcularTodosLosStats(statsBase, ivs, evs, naturaleza) {
  const nombresStats = ['hp', 'atk', 'def', 'sp_atk', 'sp_def', 'speed'];
  const resultado = {};

  
  const validEVs = evs || { hp: 0, atk: 0, def: 0, sp_atk: 0, sp_def: 0, speed: 0 };
  const validIVs = ivs || { hp: 31, atk: 31, def: 31, sp_atk: 31, sp_def: 31, speed: 31 };

  
  for (const stat of nombresStats) {
    const isHP = stat === 'hp';
    
    
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
