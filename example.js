const { Core } = require('@zenweb/core');
const { setup } = require('./dist/index');

const app = new Core();
app.setup(setup);
app.start();
