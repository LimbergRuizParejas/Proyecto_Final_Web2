const { Pokemon, Movimiento, Item, sequelize } = require('../models');


async function seed() {
  try {
    
    await sequelize.sync({ force: true }); 
    console.log('✅ Base de datos reiniciada correctamente.');


    const pokemones = await Pokemon.bulkCreate([
      {
        nombre: 'Pikachu',
        imagen: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
        tipo1: 'Eléctrico',
        tipo2: null,
        habilidades: ['Electricidad Estática', 'Pararrayos'],
        statsBase: { hp: 35, atk: 55, def: 40, sp_atk: 50, sp_def: 50, speed: 90 },
      },
      {
        nombre: 'Bulbasaur',
        imagen: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        tipo1: 'Planta',
        tipo2: 'Veneno',
        habilidades: ['Espesura', 'Clorofila'],
        statsBase: { hp: 45, atk: 49, def: 49, sp_atk: 65, sp_def: 65, speed: 45 },
      },
      {
        nombre: 'Charmander',
        imagen: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
        tipo1: 'Fuego',
        tipo2: null,
        habilidades: ['Mar Llamas', 'Poder Solar'],
        statsBase: { hp: 39, atk: 52, def: 43, sp_atk: 60, sp_def: 50, speed: 65 },
      },
      {
        nombre: 'Squirtle',
        imagen: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
        tipo1: 'Agua',
        tipo2: null,
        habilidades: ['Torrente', 'Cura Lluvia'],
        statsBase: { hp: 44, atk: 48, def: 65, sp_atk: 50, sp_def: 64, speed: 43 },
      },
      {
        nombre: 'Eevee',
        imagen: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png',
        tipo1: 'Normal',
        tipo2: null,
        habilidades: ['Fuga', 'Adaptable', 'Anticipación'],
        statsBase: { hp: 55, atk: 55, def: 50, sp_atk: 45, sp_def: 65, speed: 55 },
      },
    ]);
    console.log('✅ Pokémon creados exitosamente.');

   
    const movimientos = await Movimiento.bulkCreate([
      { nombre: 'Impactrueno', tipo: 'Eléctrico', categoria: 'físico', poder: 40 },
      { nombre: 'Placaje', tipo: 'Normal', categoria: 'físico', poder: 40 },
      { nombre: 'Ascuas', tipo: 'Fuego', categoria: 'especial', poder: 40 },
      { nombre: 'Pistola Agua', tipo: 'Agua', categoria: 'especial', poder: 40 },
      { nombre: 'Latigazo', tipo: 'Planta', categoria: 'físico', poder: 45 },
      { nombre: 'Gruñido', tipo: 'Normal', categoria: 'estado', poder: 0 },
      { nombre: 'Rayo', tipo: 'Eléctrico', categoria: 'especial', poder: 90 },
      { nombre: 'Cola Férrea', tipo: 'Acero', categoria: 'físico', poder: 100 },
      { nombre: 'Ataque Rápido', tipo: 'Normal', categoria: 'físico', poder: 40 },
      { nombre: 'Mordisco', tipo: 'Siniestro', categoria: 'físico', poder: 60 },
    ]);
    console.log('✅ Movimientos creados exitosamente.');


    await Item.bulkCreate([
      {
        nombre: 'Restos',
        descripcion: 'Recupera PS cada turno',
        imagen: 'https://cdn.wikidex.net/images/0/01/Restos_EP.png',
      },
      {
        nombre: 'Banda Focus',
        descripcion: 'Evita desmayarse con 1 PS',
        imagen: 'https://cdn.wikidex.net/images/8/81/Banda_focus_EP.png',
      },
      {
        nombre: 'Chaleco Asalto',
        descripcion: 'Sube defensa especial pero no permite usar movimientos de estado',
        imagen: 'https://cdn.wikidex.net/images/c/cc/Chaleco_asalto_EP.png',
      },
      {
        nombre: 'Gafa Protectora',
        descripcion: 'Evita efectos de clima',
        imagen: 'https://cdn.wikidex.net/images/7/77/Gafa_protectora_EP.png',
      },
      {
        nombre: 'Botas Gruesas',
        descripcion: 'Evita efectos de trampas de campo',
        imagen: 'https://cdn.wikidex.net/images/4/45/Botas_gruesas_EP.png',
      },
    ]);
    console.log('✅ Ítems creados exitosamente.');


    await pokemones[0].addMovimientos([movimientos[0], movimientos[6], movimientos[8], movimientos[9]]); // Pikachu
    await pokemones[1].addMovimientos([movimientos[1], movimientos[4], movimientos[5]]); // Bulbasaur
    await pokemones[2].addMovimientos([movimientos[2], movimientos[1], movimientos[5]]); // Charmander

    console.log('✅ Base de datos poblada con éxito.');
    process.exit();
  } catch (err) {
    console.error('❌ Error al ejecutar seed:', err.message);
    process.exit(1);
  }
}

seed();
