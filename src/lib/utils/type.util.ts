const getTypeName = (type: string): string => {
  switch (type) {
    case 'M':
      return 'macbook';
    case 'P':
      return 'ipad';
  }
};

export { getTypeName };
