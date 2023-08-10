export {};

declare global {
  namespace Express {
    interface Request {
      userData: { userId: decodeToken.userId };
      files: File[];
    }
  }
}
