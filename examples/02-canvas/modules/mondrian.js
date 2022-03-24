export default function DrawMondrian(canvas) {
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(3,4,5)';
    ctx.fillRect(0, 0, 400, 300);
    ctx.fillStyle = '#dfd9dc';
    ctx.fillRect(0, 0, 100, 30);
    ctx.fillRect(110, 0, 100, 30);
    ctx.fillRect(0, 40, 30, 100);
    ctx.fillRect(0, 150, 30, 100);
    ctx.fillRect(220, 150, 50, 100);
    ctx.fillRect(100, 260, 110, 100);
    ctx.fillRect(220, 260, 110, 100);
    ctx.fillRect(340, 0, 60, 140);
    ctx.fillStyle = '#C14634';
    ctx.fillRect(40, 40, 170, 210);
    ctx.fillRect(340, 260, 170, 210);
    ctx.fillStyle = '#E2C158';
    ctx.fillRect(220, 0, 110, 30);
    ctx.fillRect(220, 40, 110, 100);
    ctx.fillStyle = '#224170';
    ctx.fillRect(0, 260, 90, 40);
    ctx.fillRect(280, 150, 120, 100);
}
