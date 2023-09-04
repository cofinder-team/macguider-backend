import { Request } from 'express';

const getClientIp = (request: Request): string =>
  (request.headers['x-forwarded-for'] as string) ||
  request.socket.remoteAddress;

export { getClientIp };
