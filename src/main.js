import { drawRect, setupListeners } from './canvas.js';
import './controller.js';

document.addEventListener('DOMContentLoaded', () => {
    drawRect();
    setupListeners();
});
