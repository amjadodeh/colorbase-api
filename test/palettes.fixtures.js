function makePalettesArray() {
  testPalettes = [
    {
      palette_name: 'Colorrrrssss',
      hex: '#ff0000,#00ff00,#0000ff,#ff00ff,,,,,,',
      user_id: 1,
    },
    {
      palette_name: 'Nice Colors',
      hex: '#ffff00,#00ffff,#f0f0f0,#0f0f0f,,,,,,',
      user_id: 1,
    },
    {
      palette_name: 'Noice Colours',
      hex: '#0f000f,#f000f0,#000f00,#00f000,,,,,,',
      user_id: 1,
    },
    {
      palette_name: 'Down the rabit hole...',
      hex: '#000000,#00ff00,#000000,#00ff00,#000000,,,,,',
      user_id: 1,
    },
    {
      palette_name: 'Taking the red pill.',
      hex: '#000000,#00ff00,#000000,#00ff00,#000000,,,,,',
      user_id: 1,
    },
    {
      palette_name: 'Am I The Chosen One?',
      hex: '#000000,#00ff00,#000000,#00ff00,#000000,#00ff00,,,,',
      user_id: 1,
    },
    {
      palette_name: "He's beginning to believe!!!",
      hex:
        '#000000,#00ff00,#000000,#00ff00,#000000,#00ff00,#000000,#00ff00,#000000,#00ff00',
      user_id: 1,
    },
  ];

  const testPalettesInDatabase = [
    {
      id: 1,
      palette_name: 'Colorrrrssss',
      hex: '#ff0000,#00ff00,#0000ff,#ff00ff,,,,,,',
      user_id: 1,
    },
    {
      id: 2,
      palette_name: 'Nice Colors',
      hex: '#ffff00,#00ffff,#f0f0f0,#0f0f0f,,,,,,',
      user_id: 1,
    },
    {
      id: 3,
      palette_name: 'Noice Colours',
      hex: '#0f000f,#f000f0,#000f00,#00f000,,,,,,',
      user_id: 1,
    },
    {
      id: 4,
      palette_name: 'Down the rabit hole...',
      hex: '#000000,#00ff00,#000000,#00ff00,#000000,,,,,',
      user_id: 1,
    },
    {
      id: 5,
      palette_name: 'Taking the red pill.',
      hex: '#000000,#00ff00,#000000,#00ff00,#000000,,,,,',
      user_id: 1,
    },
    {
      id: 6,
      palette_name: 'Am I The Chosen One?',
      hex: '#000000,#00ff00,#000000,#00ff00,#000000,#00ff00,,,,',
      user_id: 1,
    },
    {
      id: 7,
      palette_name: "He's beginning to believe!!!",
      hex:
        '#000000,#00ff00,#000000,#00ff00,#000000,#00ff00,#000000,#00ff00,#000000,#00ff00',
      user_id: 1,
    },
  ];

  return {
    testPalettes,
    testPalettesInDatabase,
  };
}

module.exports = {
  makePalettesArray,
};
