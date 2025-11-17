declare global {
  interface Request {
    /** Custom properties used to track retries in fetch */
    _retry?: boolean;
    _retryCount?: number;
  }
}
