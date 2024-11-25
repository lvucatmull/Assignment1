import { drawScene, setupListeners } from './canvas.js';
import './controller.js';

document.addEventListener('DOMContentLoaded', () => {
    drawScene();
    setupListeners();
});
