const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');

let mapImage = new Image();
let mapScale = 1;
let currentObject = 'hook';
let placedObjects = [];
let paths = [];
let killerPaths = [];
let currentStroke = null;
let isDrawingPath = false;
let isDrawingKillerPath = false;
let dragIndex = -1;

// Load icons
const icons = {
    hook: new Image(),
    gen: new Image(),
    pallet: new Image(),
    killer: new Image()
};
icons.hook.src = 'icons/hook.png';
icons.gen.src = 'icons/gen.png';
icons.pallet.src = 'icons/pallet.png';
icons.killer.src = 'icons/killer.png';

// Map list
const maps = [
    "Azarovs20Resting20Place.png",
    "Blood20Lodge.png",
    "Coal_Tower.png",
    "Coal20Tower20II.png",
    "Family_Residence.png",
    "Family20Residence20II.png",
    "Gas20Heaven.png",
    "Groaning20Storehouse.png",
    "Groaning20Storehouse20II.png",
    "Ironworks20Of20Misery.png",
    "Ironworks20Of20Misery20II.png",
    "Suffocation20Pit.png",
    "Suffocation20Pit20II.png",
    "Wreckers.png",
    "Wretched20Shop.png"
].sort();

const mapSelect = document.getElementById('mapSelect');
maps.forEach(file => {
    const name = file.replace(/20/g, ' ').replace(/_/g, '');
    const option = document.createElement('option');
    option.value = "maps/" + file;
    option.textContent = name;
    mapSelect.appendChild(option);
});

// Mouse events
canvas.addEventListener('mousedown', e => {
    const pos = getMousePosScaled(e);

    if (isDrawingKillerPath) {
        currentStroke = [pos];
        killerPaths.push(currentStroke);
        return;
    }

    if (isDrawingPath) {
        currentStroke = [pos];
        paths.push(currentStroke);
        return;
    }

    dragIndex = getObjectAtPos(pos);
    if (dragIndex === -1) {
        placedObjects.push({ type: currentObject, x: pos.x, y: pos.y, unhook: currentObject === 'hook' ? true : false });
    }

    drawMap();
});

canvas.addEventListener('mousemove', e => {
    const pos = getMousePosScaled(e);

    if (isDrawingPath && currentStroke) {
        currentStroke.push(pos);
    }
    if (isDrawingKillerPath && currentStroke) {
        currentStroke.push(pos);
    }

    if (!isDrawingPath && !isDrawingKillerPath && dragIndex !== -1) {
        placedObjects[dragIndex].x = pos.x;
        placedObjects[dragIndex].y = pos.y;
    }

    drawMap();
});

canvas.addEventListener('mouseup', () => {
    currentStroke = null;
    dragIndex = -1;
});

// Helpers
function getMousePosScaled(evt) {
    const rect = canvas.getBoundingClientRect();
    return { x: (evt.clientX - rect.left) / mapScale, y: (evt.clientY - rect.top) / mapScale };
}

function getObjectAtPos(pos) {
    for (let i = placedObjects.length - 1; i >= 0; i--) {
        const obj = placedObjects[i];
        if (Math.hypot(pos.x - obj.x, pos.y - obj.y) < 15) return i;
    }
    return -1;
}

function selectObject(type) {
    currentObject = type;
    isDrawingPath = false;
    isDrawingKillerPath = false;
}

function drawPathMode() {
    isDrawingPath = true;
    isDrawingKillerPath = false;
}

function drawKillerPathMode() {
    isDrawingKillerPath = true;
    isDrawingPath = false;
}

// Clear
function clearPath() { paths = []; killerPaths = []; drawMap(); }
function clearObjects() { placedObjects = []; paths = []; killerPaths = []; drawMap(); }

// Map selection
function changeMap() {
    const select = document.getElementById('mapSelect');
    if (select.value) {
        mapImage.src = select.value;
        placedObjects = [];
        paths = [];
        killerPaths = [];
    }
}

// Draw everything
mapImage.onload = () => {
    const maxWidth = 900;
    const maxHeight = 600;
    mapScale = Math.min(maxWidth / mapImage.width, maxHeight / mapImage.height, 1);
    canvas.width = mapImage.width * mapScale;
    canvas.height = mapImage.height * mapScale;
    drawMap();
};

function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (mapImage.src) ctx.drawImage(mapImage, 0, 0, mapImage.width * mapScale, mapImage.height * mapScale);

    // Draw objects
    placedObjects.forEach(obj => {
        const icon = icons[obj.type];
        ctx.shadowColor = "black";
        ctx.shadowBlur = 4;
        ctx.drawImage(icon, obj.x * mapScale - 12, obj.y * mapScale - 12, 24, 24);
    });
    ctx.shadowBlur = 0;

    // Draw survivor paths
    ctx.strokeStyle = 'cyan';
    ctx.lineWidth = 4;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    paths.forEach(stroke => {
        if (stroke.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(stroke[0].x * mapScale, stroke[0].y * mapScale);
        for (let i = 1; i < stroke.length; i++) {
            ctx.lineTo(stroke[i].x * mapScale, stroke[i].y * mapScale);
        }
        ctx.stroke();
    });

    // Draw killer paths
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    killerPaths.forEach(stroke => {
        if (stroke.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(stroke[0].x * mapScale, stroke[0].y * mapScale);
        for (let i = 1; i < stroke.length; i++) {
            ctx.lineTo(stroke[i].x * mapScale, stroke[i].y * mapScale);
        }
        ctx.stroke();
    });
}
