import * as Koa from 'koa';
import { Core } from '@zenweb/core';

const START_TIME = Symbol('zenweb-meta#startTime');

export interface MetaOption {
  showVersion: boolean;
  showProcessTime: boolean;
}

export async function setup(core: Core, opt?: MetaOption) {
  opt = Object.assign({
    showVersion: true,
    showProcessTime: true,
  }, opt);
  const version: string = require('zenweb/package.json').version;
  Object.defineProperty(core.koa.context, 'startTime', { get() { return this[START_TIME]; } });
  core.use(async function meta(ctx: Koa.Context, next: Koa.Next) {
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

declare module 'koa' {
  interface DefaultContext {
    [START_TIME]: number;
  
    /**
     * 请求开始时间: 时间戳毫秒
     */
    readonly startTime: number;
  }
}
