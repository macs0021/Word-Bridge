export function changeLanguage(language, playingDate, getWordFromSeed,setStart, setEnd, setWords) {
    // Asumiendo que playingDate y otras funciones/setters están disponibles en este ámbito.
    let dt = playingDate !== "" ? new Date(playingDate) : new Date();
    const daySeed = dt.getDate();
    const monthSeed = dt.getMonth() + 1;
    const yearSeed = dt.getFullYear();
    const seed = `${yearSeed}${monthSeed}${daySeed}`;

    // Usar una función genérica para obtener las palabras de inicio y fin basadas en el seed y el idioma.
    const newStart = getWordFromSeed(seed, language);
    let newEnd = getWordFromSeed(`${seed + 1}`, language);

    // Asegurarse de que newStart y newEnd no sean iguales (opcional, dependiendo de tu lógica de negocio).
    let attempts = 0;
    while (newStart === newEnd && attempts < 10) { // Limitar los intentos para evitar un bucle infinito.
      attempts++;
      newEnd = getWordFromSeed(`${seed + 1 + attempts}`, language);
    }

    // Actualizar los estados correspondientes.
    setStart(newStart);
    setEnd(newEnd);
    setWords([newStart]);
    // No es necesario llamar a setPlayingDate a menos que desees cambiar la fecha actual de juego.
    // setPlayingDate(dt.toISOString()); // Si decides actualizar la fecha de juego.
  }