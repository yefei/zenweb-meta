const START_TIME = Symbol('zenweb-meta#startTime');

/**
 * @param {import('@zenweb/core').Core} core
 */
export async function setup(core) {
  const version = await import('zenweb/package.json').then(r => r.version, e => '-');
  Object.defineProperty(core.koa.context, 'startTime', { get() { return this[START_TIME]; } });
  core.use(async function meta(ctx, next) {
    ctx[START_TIME] = Date.now();
    ctx.set('X-Powered-By', `zenweb/${version} node/${process.version}`);
    try {
      await next();
    } finally {
      ctx.set('X-Process-Time', Date.now() - ctx[START_TIME]);
    }
  });
}
