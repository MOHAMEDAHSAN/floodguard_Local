const corrections: { [key: string]: string } = {
  'flod': 'flood',
  'emergensy': 'emergency',
  'evacuaton': 'evacuation',
  'preparness': 'preparedness',
  'watr': 'water',
  'dange': 'danger',
  'wether': 'weather',
  'allert': 'alert',
  'warning': 'warning'
};

export const autocorrect = (input: string): string => {
  return input.split(' ').map(word => 
    corrections[word.toLowerCase()] || word
  ).join(' ');
};