const GAME_CONFIG = {
  // INFORMACIÓN PERSONAL
  girlfriend: "Angy",
  anniversary: "15/08/2024",
  
  // PRIMERA PRUEBA: Contraseña (fecha en formato DDMMYYYY)
  challenge1: {
    password: "15082024",
    hint: "Deberías recordar este día.",
    successMessages: [
      "Bueno, esto era fácil.",
      "Llevamos dos años, tampoco esperaba que fallaras aquí. 😂"
    ]
  },

  // SEGUNDA PRUEBA: Recuerdos ordenados cronológicamente
  challenge2: {
    rounds: [
      {
        question: "¿Cuál de estos momentos ocurrió primero?",
        photos: [
          { id: 1, src: "assets/img/FOTO_01.jpg", order: 1 },
          { id: 2, src: "assets/img/FOTO_02.jpg", order: 3 },
          { id: 3, src: "assets/img/FOTO_03.jpg", order: 2 },
          { id: 4, src: "assets/img/FOTO_04.jpg", order: 4 }
        ],
        correctId: 1,
        memoryText: "Está claro que apuntábamos maneras al poco de conocernos... 💕"
      },
      {
        question: "Hemos viajado mucho juntos pero hay uno que lo cambió todo.",
        photos: [
          { id: 5, src: "assets/img/FOTO_05.jpg", order: 2 },
          { id: 6, src: "assets/img/FOTO_08.jpg", order: 4 },
          { id: 7, src: "assets/img/FOTO_07.jpg", order: 1 },
          { id: 8, src: "assets/img/FOTO_06.jpg", order: 3 }
        ],
        correctId: 8,
        memoryText: "Ese viaje a Tenerife donde no esperábamos nada y todos se dieron cuenta antes que nosotros de lo que estaba pasando... 🌴"
      },
      {
        question: "¿Quién me quiere más?",
        photos: [
          { id: 9, src: "assets/img/FOTO_09.jpg", order: 1 },
          { id: 10, src: "assets/img/FOTO_10.jpg", order: 2 }
        ],
        correctId: 10,
        memoryText: "¿Ves cómo no me quieres? Si lo dice una web no puede ser mentira 😭"
      }
    ]
  },

  // TERCERA PRUEBA: ¿Quién es más probable?
  challenge3: {
    rounds: [
      {
        question: "¿Quién es más probable que llegue tarde a los sitios?",
        optionA: "Angy",
        optionB: "Ropi",
        correctAnswer: "A",  // "A" o "B"
        explanation: "Serías capaz de llegar tarde a tu propio funeral... 😂"
      },
      {
        question: "¿Quién sería más probable que se apuntara a un reality?",
        optionA: "Angy",
        optionB: "Ropi",
        correctAnswer: "A",
        explanation: "Simplemente tikitiki... 😎"
      },
      {
        question: "¿Quién dijo primero \"te quiero\"?",
        optionA: "Angy",
        optionB: "Ropi",
        correctAnswer: "B",
        explanation: "Me tengo que fiar de ti en esto pero de lo que estoy seguro es de que no me arrepiento."
      },
      {
        question: "¿Quién es más probable que diga \"una y nos vamos\" y acabe cerrando el bar?",
        optionA: "Angy",
        optionB: "Ropi",
        correctAnswer: "B",
        explanation: "Y no me lo puedes reprochar porque me conociste borracho. 😊"
      },
      {
        question: "¿Quién es más cariñoso?",
        optionA: "Angy",
        optionB: "Ropi",
        correctAnswer: "A",
        explanation: "Irrebatible, aunque hayas derretido un poco mi corazón de hielo. 🥶❤️"
      },
      {
        question: "¿Quién sería más probable que adoptara un animal sin consultarlo?",
        optionA: "Angy",
        optionB: "Ropi",
        correctAnswer: "A",
        explanation: "NO QUIERO UN PEZ."
      },
      {
        question: "¿Quién conoce mejor al otro?",
        optionA: "Angy",
        optionB: "Ropi",
        correctAnswer: "B",
        explanation: "Siempre sabré lo que piensas antes que tú misma, aunque a veces me equivoque. 😅"
      },
      {
        question: "¿Quién sobreviviría menos tiempo en un apocalipsis zombi?",
        optionA: "Angy",
        optionB: "Ropi",
        correctAnswer: "A",
        explanation: "Te tropezarías, te comerían y por intentar salvarte moriría yo pero tú antes."
      },
      {
        question: "¿Quién es más dramático?",
        optionA: "Angy",
        optionB: "Ropi",
        correctAnswer: "A",
        explanation: "¿Algo que objetar?"
      },
      {
        question: "¿Quién es más cabezota?",
        optionA: "Angy",
        optionB: "Ropi",
        correctAnswer: "B",
        explanation: "No te lo niego, es la sangre sayaguesa, pero te amo aunque se me vaya el tono a veces. ❤️"
      },
      {
        question: "¿Quién es más probable que quiera seguir viviendo aventuras contigo durante muchos años?",
        optionA: "Angy",
        optionB: "Ropi",
        optionC: "Los dos ❤️",
        correctAnswer: "C",
        explanation: "Y aquí no hay discusión posible ❤️ (¿verdad? 😥)"
      }
    ]
  },

  // PRÓXIMAS PRUEBAS
  challenge4: {
    title: "PRUEBA 4"
  },

  // QUINTA PRUEBA: Días juntos
  challenge5: {
    question: "¿Cuántos días llevamos juntos?",
    hint: "Espero que esto no lo cuentes con los dedos... 😏",
    correctAnswer: 730, // Calcula los días entre tu fecha y hoy
    tolerance: 0, // Margen de error de ±3 días
    successMessages: [
      "730 y me parecen pocos, espero que a ti no se te haya hecho largo... 🥰",
      "Cada día contigo es especial. 💕"
    ]
  },

  // LOCATION REVEAL
  locationReveal: {
    title: "🎉 ¡LO HAS LOGRADO!",
    message: "Has decodificado todos los archivos de la operación.",
    locationText: "Tu regalo está escondido en:",
    location: "El lugar que Tusita pierde sus pelotas.", // Ejemplo: "Debajo de tu almohada" o "En la nevera"
    instructions: "Ve a buscarlo ahora. Cuando lo encuentres y abras la tarjeta con el código, vuelve a esta web para desbloquear el final romántico. 💝"
  },

  // FINALE
  finalCode: "OHANA<3",
  finalMessage: "Y esto ha sido todo. Espero que te haya costado más este mini-juego que el tiempo que llevamos juntos.\nEs evidente que no ha sido nuestro mejor año, pero lo importante es que, por muchos problemas que tengamos, los afrontemos juntos, como un equipo. La convivencia tiene cosas muy buenas pero puede traer dificultades y nos puede obligar a mejorar a ambos pero, estoy seguro de que merece la pena por estar a tu lado.\nNo creo que merezca la pena explayarme más por aquí porque creo que eres consciente de lo que te quiero, lo afortunado que me siento de que estés a mi lado y todo lo que te amo.\n Poco más tengo que decir, que se me sube el azucar 😉 Disfruta de tu juego y construye tu vida virtual como yo quiero construir contigo la real ❤️",
  finalPhotos: ["assets/img/PHOTO_FINALE_01.jpg", "assets/img/PHOTO_FINALE_02.jpg", "assets/img/PHOTO_FINALE_03.jpg"]
};