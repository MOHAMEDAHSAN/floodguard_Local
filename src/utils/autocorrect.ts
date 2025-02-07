const corrections: { [key: string]: string } = {
  'flod': 'flood',
  'emergensy': 'emergency',
  'evacuaton': 'evacuation',
  'preparness': 'preparedness',
  'watr': 'water',
  'dange': 'danger',
  'wether': 'weather',
  'allert': 'alert',
  'warning': 'warning',
  'hous': 'house',
  'wot': 'what',
  'halp': 'help',
  'preparaton': 'preparation',
  'safty': 'safety',
  'evac': 'evacuate',
  'resque': 'rescue',
  'damag': 'damage',
  'floding': 'flooding',
  'warnin': 'warning',
  'emrgency': 'emergency',
  'conctact': 'contact',
  'contct': 'contact',
  'locaton': 'location',
  'informaton': 'information',
  'emergncy': 'emergency',
  'contacs': 'contacts',
  'numers': 'numbers',
  'fone': 'phone'
};

export const autocorrect = (input: string): string => {
  return input.split(' ').map(word => {
    const lowerWord = word.toLowerCase();
    return corrections[lowerWord] || word;
  }).join(' ');
};