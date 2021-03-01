import 'koa';

declare module 'koa' {
  interface BaseContext {
    startTime: number;
  }
}
