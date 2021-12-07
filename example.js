import { Core } from '@zenweb/core';
import { setup } from './index.js';

const app = new Core();
app.setup(setup);
app.start();
