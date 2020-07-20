const continents = [
  {
    id: 1,
    name: 'Asia',
  },
  {
    id: 2,
    name: 'Africas',
  },
  {
    id: 3,
    name: 'Europe',
  },
  {
    id: 4,
    name: 'North America',
  },
  {
    id: 5,
    name: 'South America',
  },
  {
    id: 6,
    name: 'Antarctica',
  },
  {
    id: 7,
    name: 'Australia',
  },
];

const price = [
  {
    id: 0,
    name: 'Any',
    array: [],
  },
  {
    id: 1,
    name: '$0 to $199',
    array: [0, 199],
  },
  {
    id: 2,
    name: '$200 to $249',
    array: [200, 249],
  },
  {
    id: 3,
    name: '$250 to $279',
    array: [250, 279],
  },
  {
    id: 4,
    name: '$280 to $299',
    array: [280, 299],
  },
  {
    id: 5,
    name: 'More than $300',
    array: [300, 999999],
  },
];

module.exports = { continents, price };
