'use strict';

const { version } = require('@zenweb/core/package.json');

/**
 * 服务器信息
 * @param {import('koa').Context} ctx 
 * @param {*} next 
 */
async function meta(ctx, next) {
  ctx.startTime = Date.now();
  ctx.set('X-Powered-By', `zenweb/${version} node/${process.version}`);
  try {
    await next();
  } finally {
    ctx.set('X-Process-Time', Date.now() - ctx.startTime);
  }
}

/**
 * @param {import('@zenweb/core').Core} core 
 * @param {*} [options]
 */
function setup(core, options) {
  core.koa.use(meta);
}

module.exports = {
  setup,
};
