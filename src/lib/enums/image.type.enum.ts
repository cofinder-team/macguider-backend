enum ImageType {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  GIF = 'image/gif',
  WEBP = 'image/webp',
  SVG = 'image/svg+xml',
  TIFF = 'image/tiff',
}

const getExtensionByImageType = (type: ImageType): string => {
  switch (type) {
    case ImageType.JPEG:
      return 'jpeg';
    case ImageType.PNG:
      return 'png';
    case ImageType.GIF:
      return 'gif';
    case ImageType.WEBP:
      return 'webp';
    case ImageType.SVG:
      return 'svg';
    case ImageType.TIFF:
      return 'tiff';
  }
};

export { ImageType, getExtensionByImageType };
