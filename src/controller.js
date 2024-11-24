export default function updateCoordinates(points) {
    document.getElementById('left-top').innerHTML = 
        `<span>1. left, top: (${points[0].x.toFixed(2)}, ${points[0].y.toFixed(2)})</span>`;
    document.getElementById('right-top').innerHTML = 
        `<span>2. right, top: (${points[1].x.toFixed(2)}, ${points[1].y.toFixed(2)})</span>`;
    document.getElementById('right-bottom').innerHTML = 
        `<span>3. right, bottom: (${points[2].x.toFixed(2)}, ${points[2].y.toFixed(2)})</span>`;
    document.getElementById('left-bottom').innerHTML = 
        `<span>4. left, bottom: (${points[3].x.toFixed(2)}, ${points[3].y.toFixed(2)})</span>`;
}