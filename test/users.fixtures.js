function makeUsersArray() {
  return [
    {
      username: 'asdfUser',
      profile_picture:
        'https://images.pexels.com/photos/1887946/pexels-photo-1887946.jpeg',
      hash: '$2a$13$VeDmhYOE0eMdbBCul8oUXeeOqrHS39/Kmdk/XHz57.46rZVi4dms.',
    },
    {
      username: 'qwertyUser',
      profile_picture:
        'https://images.pexels.com/photos/2832456/pexels-photo-2832456.jpeg',
      hash: '$2a$13$X2B.aFUIXZqqyloIdaIE8eLpEYYWvjl49lmA9Raa2TgGtvixkv9dm',
    },
  ];
}

module.exports = {
  makeUsersArray,
};
