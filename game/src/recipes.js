// The Cracked Yolk menu: original dishes, ingredients and regulars.
// A dish is a set of ingredients; the plate must hold exactly that set.
export const INGREDIENTS = [
  { id: 'bun',     name: 'Bun',     key: '1', color: '#e8a54b', dark: '#b97a26' },
  { id: 'patty',   name: 'Patty',   key: '2', color: '#7a4a21', dark: '#54310f' },
  { id: 'cheese',  name: 'Cheese',  key: '3', color: '#f7c948', dark: '#d9a400' },
  { id: 'tomato',  name: 'Tomato',  key: '4', color: '#e4572e', dark: '#a52f14' },
  { id: 'lettuce', name: 'Lettuce', key: '5', color: '#7bc950', dark: '#4a8c2b' },
  { id: 'egg',     name: 'Egg',     key: '6', color: '#fdf6e3', dark: '#f2c14e' },
  { id: 'noodle',  name: 'Noodle',  key: '7', color: '#f2c14e', dark: '#c98f1b' },
  { id: 'broth',   name: 'Broth',   key: '8', color: '#c96f2e', dark: '#8f4a16' },
  { id: 'chili',   name: 'Chili',   key: '9', color: '#d7263d', dark: '#8f1225' },
  { id: 'shrimp',  name: 'Shrimp',  key: '0', color: '#f28c7a', dark: '#c65a45' },
  { id: 'rice',    name: 'Rice',    key: 'Q', color: '#fff8e7', dark: '#d9cba8' },
  { id: 'seaweed', name: 'Seaweed', key: 'W', color: '#2e6b34', dark: '#17401c' },
];

export const DISHES = [
  { name: 'Lava Bun Blast',        ingredients: ['bun', 'patty', 'cheese', 'chili'],   coins: 120, blurb: 'Hot, melty, dangerously stackable.' },
  { name: 'Green Roof Stack',      ingredients: ['bun', 'patty', 'lettuce', 'tomato'], coins: 110, blurb: 'A garden on top of a grill.' },
  { name: 'Noodle Nest',           ingredients: ['noodle', 'egg', 'seaweed'],          coins: 100, blurb: 'Twirls up warm, yolk in the middle.' },
  { name: 'Shrimp Cloud Rice',     ingredients: ['rice', 'shrimp', 'egg', 'chili'],    coins: 130, blurb: 'Fluffy rice, pink shrimp, a little fire.' },
  { name: 'Broth Bomb Bowl',       ingredients: ['broth', 'noodle', 'shrimp', 'chili'], coins: 140, blurb: 'Slurp first, ask questions later.' },
  { name: 'Seaweed Scramble Roll', ingredients: ['seaweed', 'rice', 'egg'],            coins: 90,  blurb: 'Rolled tight, gone in three bites.' },
];

export const CUSTOMERS = [
  'Hangry Mara', 'Grumbles McGee', 'Tiny Tornado Tio', 'Chef Ada',
  'Sleepy Gus', 'Pepper Pam', 'Noodle Ned', 'Bunty Bea',
];

export function ingredientById(id) {
  return INGREDIENTS.find((item) => item.id === id);
}
