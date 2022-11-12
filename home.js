class Canvas {
    constructor(canvas) {
        this.element = canvas;
        this.context = canvas.getContext('2d');
        this.shapes = [];
    }

    resize() {
        this.element.width = window.innerWidth;
        this.element.height = window.innerHeight;
    }

    clear() {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
    }

    addShape(shape) {
        this.shapes.push(shape);
    }

    removeShape(shape) {
        this.shapes = this.shapes.filter(s => s !== shape);
    }

    render() {
        this.clear();
        this.shapes.forEach(shape => shape.draw());
    }

    animate() {
        this.render();
        console.log("hey there");
        requestAnimationFrame(this.animate);
    }
}

class Circle {
    constructor(context) {
        this.context = context;
        this.x = (Math.random() * window.innerWidth);
        this.y = (Math.random() * window.innerHeight);
        this.radius = randomBetween(50, 100);
        this.color = `rgb(${randomBetween(0, 255)}, ${randomBetween(0, 255)}, ${randomBetween(0, 255)})`;
        this.dx = randomBetween(-5, 5);
        this.dy = randomBetween(-5, 5);
    }
    draw() {
        this.context.beginPath()
            //arc(x, y, radius, startAngle, endAngle, counterclockwise)
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.closePath();
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < 0 || this.x > window.innerWidth) {
            this.dx *= -1;
        }
        if (this.y < 0 || this.y > window.innerHeight) {
            this.dy *= -1;
        }
    }
}

const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

const canvas = document.querySelector('canvas');
const myCanvas = new Canvas(canvas);
myCanvas.resize();


myCanvas.shapes = new Array(10).fill().map(_ => {
    return new Circle(myCanvas.context);
});

function update() {
    myCanvas.render();
    requestAnimationFrame(update);
}
update();
// myCanvas.animate();