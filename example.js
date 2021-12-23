const { Core } = require('@zenweb/core');
const { default: meta } = require('./dist/index');

const app = new Core();
app.setup(meta());
app.start();
