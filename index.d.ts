import 'koa';

declare module 'koa' {
  interface BaseContext {
    /**
     * 请求开始时间: 时间戳毫秒
     */
    startTime: number;
  }
}
