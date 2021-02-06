function makeUsersArray() {
  return [
    {
      username: 'asdfUser',
      profile_picture:
        'https://images.pexels.com/photos/1887946/pexels-photo-1887946.jpeg',
      hash: '$2a$10$WtnCpdLtcVA4rbHu4S/fEOnywBQybghGnN8ZC0rTMHVRZLSTdt/2G',
    },
    {
      username: 'qwertyUser',
      profile_picture:
        'https://images.pexels.com/photos/2832456/pexels-photo-2832456.jpeg',
      hash: '$2a$10$EccJMbxvsA1voU9NtnfvuOgg86S3wJhqXtqI2Zatg0vBjEw7PyWji',
    },
  ];
}

module.exports = {
  makeUsersArray,
};
