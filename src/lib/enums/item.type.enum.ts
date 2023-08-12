enum ItemType {
  macbook = 'M',
  ipad = 'P',
  iphone = 'I',
}

const getItemType = (type: ItemType): string => {
  switch (type) {
    case 'M':
      return 'macbook';
    case 'P':
      return 'ipad';
    case 'I':
      return 'iphone';
  }
};

export { ItemType, getItemType };
