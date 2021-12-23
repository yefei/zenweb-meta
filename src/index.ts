import { SetupFunction } from '@zenweb/core';

const START_TIME = Symbol('zenweb-meta#startTime');

export interface MetaOption {
  showVersion: boolean;
  showProcessTime: boolean;
}

export default function setup(opt?: MetaOption): SetupFunction {
  opt = Object.assign({
    showVersion: true,
    showProcessTime: true,
  }, opt);
  if (opt.showVersion) {
    try {
      var version: string = require('zenweb/package.json').version;
      console.log('zenweb version:', version);
    } catch (err) {
      console.warn('load zenweb version error:', err);
    }
  }
  return async function meta(setup) {
    setup.defineContextProperty('startTime', { get() { return this[START_TIME]; } });
    setup.middleware(async function metaHeader(ctx, next) {
      ctx[START_TIME] = Date.now();
      if (opt.showVersion) {
        ctx.set('X-Powered-By', `zenweb/${version || '-'} node/${process.version}`);
      }
      try {
        await next();
      } finally {
        if (opt.showProcessTime) {
          ctx.set('X-Process-Time', (Date.now() - ctx[START_TIME]).toString());
        }
      }
    });
  }
}

declare module 'koa' {
  interface DefaultContext {
    [START_TIME]: number;
  
    /**
     * 请求开始时间: 时间戳毫秒
     */
    readonly startTime: number;
  }
}
