import shortid from 'shortid';

export const GAMES = [
  {
    id: shortid.generate(),
    name: 'mortal kombat',
    icon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/message.svg',
  },
  {
    id: shortid.generate(),
    name: 'fifa 19',
    icon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/message.svg',
  },
];

export const GAMES_DURATION = [
  {
    id: shortid.generate(),
    duration: 10,
  },
  {
    id: shortid.generate(),
    duration: 15,
  },
  {
    id: shortid.generate(),
    duration: 30,
  },
];
