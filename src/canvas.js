import { RECT_SIZE } from "./constant.js";
import updateCoordinates from "./controller.js";
import { degreeToRadian, handleDebounce, validateInput } from "./util.js";
const state = {
    originX: 0,
    originY: 0,
    moveX: 0,
    moveY: 0,
    angle: 0,
    pivotX: 0,
    pivotY: 0 + RECT_SIZE,
    transform: [1, 0, 0, 1, 0, 0],
    points: []
};

const drawScene = (isPivot = false) => {
    const canvas = document.getElementById('canvas');
    if (!canvas.getContext) return;
    
    const ctx = canvas.getContext('2d');
    const [scaleX, skewY, skewX, scaleY, offsetX, offsetY] = state.transform;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.resetTransform();
    ctx.setTransform(scaleX, skewY, skewX, scaleY, offsetX, offsetY);
    ctx.beginPath();
    ctx.rect(state.originX, state.originY, RECT_SIZE, RECT_SIZE);
    
    const transform = ctx.getTransform();
    const points = [
        transform.transformPoint(new DOMPoint(state.originX, state.originY)),
        transform.transformPoint(new DOMPoint(state.originX + RECT_SIZE, state.originY)),
        transform.transformPoint(new DOMPoint(state.originX + RECT_SIZE, state.originY + RECT_SIZE)),
        transform.transformPoint(new DOMPoint(state.originX, state.originY + RECT_SIZE))
    ];
    console.log("%c saved points", "color: magenta", points);
    updateCoordinates(points);
    
    ctx.fillStyle = 'lightgray';
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    //Pivot
    ctx.resetTransform();
    ctx.beginPath();
    ctx.arc(state.pivotX + state.moveX, state.pivotY + state.moveY, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();

    ctx.resetTransform();
};

const updateTransform = () => {
    const rad = degreeToRadian(state.angle);
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    const pivotX = state.pivotX;
    const pivotY = state.pivotY;

    const scaleX = cos;
    const skewX = sin;
    const skewY = -sin;
    const scaleY = cos;
    const translateX = state.moveX + pivotX * (1 - cos) + pivotY * sin;
    const translateY = state.moveY + pivotY * (1 - cos) - pivotX * sin;

    state.transform = [
        scaleX,
        skewX,
        skewY,
        scaleY,
        translateX,
        translateY
    ];

    console.log("%c updateTransform", "color: cyan", state.transform);
};

const setupListeners = () => {
    const inputs = {
        'moveX': (e) => state.moveX = validateInput(e),
        'moveY': (e) => state.moveY = validateInput(e),
        'pivotX': (e) => state.pivotX = validateInput(e),
        'pivotY': (e) => state.pivotY = validateInput(e),
        'angle': (e) => state.angle = validateInput(e)
    };

    Object.entries(inputs).forEach(([id, handler]) => {
        document.getElementById(id)?.addEventListener('input', handleDebounce((e) => {
            console.log(`${id} : ${e.target.value}`);
            handler(e);
            if(id !== 'pivotX' && id !== 'pivotY') {
                console.log("pivot is not updated");
                updateTransform();
            }
            drawScene();
        }), 16);
    });
};

export { drawScene, setupListeners };
