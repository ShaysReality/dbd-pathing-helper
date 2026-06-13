const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
const realmList = document.getElementById('realmList');
const mapSearch = document.getElementById('mapSearch');
const lastMapReadout = document.getElementById('lastMap');
const toolStatus = document.getElementById('toolStatus');
const brushSizeInput = document.getElementById('brushSize');
const brushSizeValue = document.getElementById('brushSizeValue');
const emptyState = document.getElementById('emptyState');

const MAP_DATA = {
    "realmOrder": [
        "MacMillan Estate",
        "Autohaven Wreckers",
        "Coldwind Farm",
        "Crotus Prenn Asylum",
        "Haddonfield",
        "Backwater Swamp",
        "L\u00e9ry's Memorial Institute",
        "Red Forest",
        "Springwood",
        "Gideon Meat Plant",
        "Yamaoka Estate",
        "Ormond",
        "Grave of Glenvale",
        "Raccoon City",
        "Forsaken Boneyard",
        "Withered Isle",
        "Decimated Borgo",
        "Dvarka Deepwood",
        "Nostromo Wreckage",
        "Greenville Square",
        "Hawkins National Laboratory",
        "Silent Hill",
        "Tomb of the Forgotten",
        "Five Nights at Freddy\u2019s",
        "The Shattered Realm",
        "Other"
    ],
    "maps": [
        {
            "name": "Azarovs Resting Place",
            "realm": "Autohaven Wreckers",
            "src": "maps/clock/Azarovs Resting Place.webp"
        },
        {
            "name": "Blood Lodge",
            "realm": "Autohaven Wreckers",
            "src": "maps/clock/Blood Lodge.webp"
        },
        {
            "name": "Coal Tower II",
            "realm": "MacMillan Estate",
            "src": "maps/clock/Coal Tower II.webp"
        },
        {
            "name": "Coal Tower",
            "realm": "MacMillan Estate",
            "src": "maps/clock/Coal Tower.webp"
        },
        {
            "name": "Dead Dawg Saloon (NA)",
            "realm": "Grave of Glenvale",
            "src": "maps/clock/Dead Dawg Saloon NA.png"
        },
        {
            "name": "Dead Dawg Saloon (EU)",
            "realm": "Grave of Glenvale",
            "src": "maps/clock/Dead Dawg Saloon.webp"
        },
        {
            "name": "Dead Sands",
            "realm": "Tomb of the Forgotten",
            "src": "maps/clock/Dead Sands.webp"
        },
        {
            "name": "Disturbed Ward",
            "realm": "Crotus Prenn Asylum",
            "src": "maps/clock/Disturbed Ward.webp"
        },
        {
            "name": "Eyrie of Crows",
            "realm": "Forsaken Boneyard",
            "src": "maps/clock/Eyrie of Crows.webp"
        },
        {
            "name": "Fallen Refuge",
            "realm": "Tomb of the Forgotten",
            "src": "maps/clock/Fallen Refuge.webp"
        },
        {
            "name": "Family Residence II",
            "realm": "Yamaoka Estate",
            "src": "maps/clock/Family Residence II.webp"
        },
        {
            "name": "Family Residence",
            "realm": "Yamaoka Estate",
            "src": "maps/clock/Family Residence.webp"
        },
        {
            "name": "Father Campbells Chapel",
            "realm": "Crotus Prenn Asylum",
            "src": "maps/clock/Father Campbells Chapel.webp"
        },
        {
            "name": "Forgotten Ruins",
            "realm": "Decimated Borgo",
            "src": "maps/clock/Forgotten Ruins.webp"
        },
        {
            "name": "Fractured Cowshed",
            "realm": "Coldwind Farm",
            "src": "maps/clock/Fractured Cowshed.webp"
        },
        {
            "name": "Freddy Fazbears Pizza",
            "realm": "Five Nights at Freddy\u2019s",
            "src": "maps/clock/Freddy Fazbears Pizza.webp"
        },
        {
            "name": "Garden of Joy",
            "realm": "Withered Isle",
            "src": "maps/clock/Garden of Joy.webp"
        },
        {
            "name": "Gas Heaven",
            "realm": "Autohaven Wreckers",
            "src": "maps/clock/Gas Heaven.webp"
        },
        {
            "name": "Greenville Square",
            "realm": "Greenville Square",
            "src": "maps/clock/Greenville Square.webp"
        },
        {
            "name": "Grim Pantry",
            "realm": "Backwater Swamp",
            "src": "maps/clock/Grim Pantry.webp"
        },
        {
            "name": "Groaning Storehouse II",
            "realm": "MacMillan Estate",
            "src": "maps/clock/Groaning Storehouse II.webp"
        },
        {
            "name": "Groaning Storehouse",
            "realm": "MacMillan Estate",
            "src": "maps/clock/Groaning Storehouse.webp"
        },
        {
            "name": "Haddonfield",
            "realm": "Haddonfield",
            "src": "maps/clock/Haddonfield.webp"
        },
        {
            "name": "Hawkins",
            "realm": "Hawkins National Laboratory",
            "src": "maps/clock/Hawkins.webp"
        },
        {
            "name": "Ironworks Of Misery II",
            "realm": "MacMillan Estate",
            "src": "maps/clock/Ironworks Of Misery II.webp"
        },
        {
            "name": "Ironworks Of Misery",
            "realm": "MacMillan Estate",
            "src": "maps/clock/Ironworks Of Misery.webp"
        },
        {
            "name": "Lerys",
            "realm": "L\u00e9ry's Memorial Institute",
            "src": "maps/clock/Lerys.webp"
        },
        {
            "name": "Midwich Elementary School",
            "realm": "Silent Hill",
            "src": "maps/clock/midwichbottom.png"
        },
        {
            "name": "Mothers Dwelling",
            "realm": "Red Forest",
            "src": "maps/clock/Mothers Dwelling.webp"
        },
        {
            "name": "Nostromo Wreckage",
            "realm": "Nostromo Wreckage",
            "src": "maps/clock/Nostromo Wreckage.webp"
        },
        {
            "name": "Ormond II",
            "realm": "Ormond",
            "src": "maps/clock/Ormond II.webp"
        },
        {
            "name": "Ormond III",
            "realm": "Ormond",
            "src": "maps/clock/Ormond III.webp"
        },
        {
            "name": "Ormond Lake Mine",
            "realm": "Ormond",
            "src": "maps/clock/Ormond Lake Mine.webp"
        },
        {
            "name": "Ormond",
            "realm": "Ormond",
            "src": "maps/clock/Ormond.webp"
        },
        {
            "name": "Pale Rose",
            "realm": "Backwater Swamp",
            "src": "maps/clock/Pale Rose.webp"
        },
        {
            "name": "Badham Preschool 1",
            "realm": "Springwood",
            "src": "maps/clock/Preschool1.webp"
        },
        {
            "name": "Badham Preschool 2",
            "realm": "Springwood",
            "src": "maps/clock/Preschool2.webp"
        },
        {
            "name": "Badham Preschool 3",
            "realm": "Springwood",
            "src": "maps/clock/Preschool3.webp"
        },
        {
            "name": "Badham Preschool 4",
            "realm": "Springwood",
            "src": "maps/clock/Preschool4.webp"
        },
        {
            "name": "Badham Preschool 5",
            "realm": "Springwood",
            "src": "maps/clock/Preschool5.webp"
        },
        {
            "name": "Rancid Abbatoir",
            "realm": "Coldwind Farm",
            "src": "maps/clock/Rancid Abbatoir.webp"
        },
        {
            "name": "Rotten Fields",
            "realm": "Coldwind Farm",
            "src": "maps/clock/Rotten Fields.webp"
        },
        {
            "name": "Rpd East Wing",
            "realm": "Raccoon City",
            "src": "maps/clock/Rpd East Wing.webp"
        },
        {
            "name": "Rpd West Wing",
            "realm": "Raccoon City",
            "src": "maps/clock/Rpd West Wing.webp"
        },
        {
            "name": "Sanctum of Wrath II",
            "realm": "Yamaoka Estate",
            "src": "maps/clock/Sanctum of Wrath II.webp"
        },
        {
            "name": "Sanctum of Wrath",
            "realm": "Yamaoka Estate",
            "src": "maps/clock/Sanctum of Wrath.webp"
        },
        {
            "name": "Shattered Square",
            "realm": "Decimated Borgo",
            "src": "maps/clock/Shattered Square.webp"
        },
        {
            "name": "Shelter Woods II",
            "realm": "MacMillan Estate",
            "src": "maps/clock/Shelter Woods II.webp"
        },
        {
            "name": "Shelter Woods",
            "realm": "MacMillan Estate",
            "src": "maps/clock/Shelter Woods.webp"
        },
        {
            "name": "Suffocation Pit II",
            "realm": "MacMillan Estate",
            "src": "maps/clock/Suffocation Pit II.webp"
        },
        {
            "name": "Suffocation Pit",
            "realm": "MacMillan Estate",
            "src": "maps/clock/Suffocation Pit.webp"
        },
        {
            "name": "Temple of Purgation",
            "realm": "Red Forest",
            "src": "maps/clock/Temple of Purgation.webp"
        },
        {
            "name": "The Game",
            "realm": "Gideon Meat Plant",
            "src": "maps/clock/The Game.webp"
        },
        {
            "name": "The Thompson House",
            "realm": "Coldwind Farm",
            "src": "maps/clock/The Thompson House.webp"
        },
        {
            "name": "Toba Landing",
            "realm": "Dvarka Deepwood",
            "src": "maps/clock/Toba Landing.webp"
        },
        {
            "name": "Torment Creek",
            "realm": "Coldwind Farm",
            "src": "maps/clock/Torment Creek.webp"
        },
        {
            "name": "Tricksters Delusion",
            "realm": "The Shattered Realm",
            "src": "maps/clock/Tricksters Delusion.webp"
        },
        {
            "name": "Wreckers",
            "realm": "Autohaven Wreckers",
            "src": "maps/clock/Wreckers.webp"
        },
        {
            "name": "Wretched Shop",
            "realm": "Autohaven Wreckers",
            "src": "maps/clock/Wretched Shop.webp"
        }
    ]
};

let mapImage = new Image();
let mapScale = 1;
let activeTool = 'hook';
let placedObjects = [];
let paths = [];
let killerPaths = [];
let currentStroke = null;
let dragIndex = -1;
let isPointerDown = false;
let brushSize = Number(brushSizeInput.value);
let undoStack = [];
let lastErasePoint = null;
let activeMap = null;
let showFavoritesOnly = false;
let favorites = JSON.parse(localStorage.getItem('dbdPathingFavorites') || '[]');

const toolLabels = {
    hook: 'Hook',
    gen: 'Generator',
    pallet: 'Pallet',
    killer: 'Killer',
    survivorPath: 'Survivor Path',
    killerPath: 'Killer Path',
    erase: 'Erase Brush'
};

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

function saveFavorites() {
    localStorage.setItem('dbdPathingFavorites', JSON.stringify(favorites));
}

function isFavorite(src) {
    return favorites.includes(src);
}

function toggleFavorite(src) {
    favorites = isFavorite(src) ? favorites.filter(item => item !== src) : [...favorites, src];
    saveFavorites();
    renderMapBrowser();
}

function getVisibleMaps() {
    const query = mapSearch.value.trim().toLowerCase();
    return MAP_DATA.maps.filter(map => {
        const matchesSearch = !query || map.name.toLowerCase().includes(query) || map.realm.toLowerCase().includes(query);
        const matchesFav = !showFavoritesOnly || isFavorite(map.src);
        return matchesSearch && matchesFav;
    });
}

function renderMapBrowser() {
    const visible = getVisibleMaps();
    realmList.innerHTML = '';

    MAP_DATA.realmOrder.forEach(realm => {
        const realmMaps = visible.filter(map => map.realm === realm);
        if (!realmMaps.length) return;

        const block = document.createElement('div');
        block.className = 'realm-block';

        const head = document.createElement('button');
        head.type = 'button';
        head.className = 'realm-head';
        head.innerHTML = `${realm} <span>${realmMaps.length}</span>`;
        head.addEventListener('click', () => block.classList.toggle('closed'));

        const list = document.createElement('div');
        list.className = 'map-list';

        realmMaps.forEach(map => {
            const row = document.createElement('div');
            row.className = 'map-row';

            const fav = document.createElement('button');
            fav.type = 'button';
            fav.className = 'fav-btn';
            fav.title = 'Favorite';
            fav.textContent = isFavorite(map.src) ? '★' : '☆';
            fav.addEventListener('click', event => {
                event.stopPropagation();
                toggleFavorite(map.src);
            });

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'map-btn';
            btn.classList.toggle('active', activeMap && activeMap.src === map.src);
            btn.textContent = map.name;
            btn.addEventListener('click', () => loadMap(map));

            row.append(fav, btn);
            list.appendChild(row);
        });

        block.append(head, list);
        realmList.appendChild(block);
    });

    if (!realmList.children.length) {
        realmList.innerHTML = '<div class="last-map">No maps found.</div>';
    }
}

function updateLastMap() {
    if (!activeMap) {
        lastMapReadout.textContent = 'Last map: none';
        return;
    }
    lastMapReadout.textContent = `Last map: ${activeMap.name}`;
}

function snapshot() {
    undoStack.push(JSON.stringify({ placedObjects, paths, killerPaths }));
    if (undoStack.length > 75) undoStack.shift();
}

function restore(snapshotString) {
    const state = JSON.parse(snapshotString);
    placedObjects = state.placedObjects || [];
    paths = state.paths || [];
    killerPaths = state.killerPaths || [];
    drawMap();
}

function setTool(tool) {
    activeTool = tool;
    toolStatus.textContent = `Tool: ${toolLabels[tool]}`;
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tool === tool);
    });
    canvas.style.cursor = tool === 'erase' ? 'cell' : 'crosshair';
}

function getPointerPosScaled(evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / mapScale,
        y: (evt.clientY - rect.top) / mapScale
    };
}

function getObjectAtPos(pos, radius = 18) {
    for (let i = placedObjects.length - 1; i >= 0; i--) {
        const obj = placedObjects[i];
        if (Math.hypot(pos.x - obj.x, pos.y - obj.y) < radius) return i;
    }
    return -1;
}

function eraseAt(pos) {
    const radius = brushSize / mapScale;
    let changed = false;

    for (let i = placedObjects.length - 1; i >= 0; i--) {
        const obj = placedObjects[i];
        if (Math.hypot(pos.x - obj.x, pos.y - obj.y) <= radius) {
            placedObjects.splice(i, 1);
            changed = true;
        }
    }

    paths = eraseFromStrokeCollection(paths, pos, radius, value => { changed = changed || value; });
    killerPaths = eraseFromStrokeCollection(killerPaths, pos, radius, value => { changed = changed || value; });
    return changed;
}

function eraseFromStrokeCollection(collection, pos, radius, setChanged) {
    const nextCollection = [];

    collection.forEach(stroke => {
        const points = getStrokePoints(stroke);
        const width = Array.isArray(stroke) ? brushSize : stroke.width;
        let currentSegment = [];
        let strokeChanged = false;

        points.forEach(point => {
            const shouldErase = Math.hypot(point.x - pos.x, point.y - pos.y) <= radius;
            if (shouldErase) {
                strokeChanged = true;
                if (currentSegment.length > 1) nextCollection.push({ points: currentSegment, width });
                currentSegment = [];
            } else {
                currentSegment.push(point);
            }
        });

        if (currentSegment.length > 1) nextCollection.push({ points: currentSegment, width });
        setChanged(strokeChanged);
    });

    return nextCollection;
}

function getStrokePoints(stroke) {
    return Array.isArray(stroke) ? stroke : stroke.points;
}

function getStrokeWidth(stroke) {
    return Array.isArray(stroke) ? Math.max(3, brushSize / 4) : Math.max(3, stroke.width / 4);
}

function drawPathStroke(stroke, color) {
    const points = getStrokePoints(stroke);
    if (!points || points.length < 2) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = getStrokeWidth(stroke);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(points[0].x * mapScale, points[0].y * mapScale);

    for (let i = 1; i < points.length - 1; i++) {
        const midX = (points[i].x + points[i + 1].x) / 2;
        const midY = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x * mapScale, points[i].y * mapScale, midX * mapScale, midY * mapScale);
    }

    const last = points[points.length - 1];
    ctx.lineTo(last.x * mapScale, last.y * mapScale);
    ctx.stroke();
}

function drawErasePreview(pos) {
    if (activeTool !== 'erase' || !pos || !mapImage.src) return;
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillStyle = 'rgba(255, 59, 59, 0.12)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(pos.x * mapScale, pos.y * mapScale, brushSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawMap(previewPos = null) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!mapImage.src) return;
    ctx.drawImage(mapImage, 0, 0, mapImage.width * mapScale, mapImage.height * mapScale);

    ctx.save();
    ctx.shadowColor = 'rgba(0, 240, 255, 0.55)';
    ctx.shadowBlur = 8;
    paths.forEach(stroke => drawPathStroke(stroke, 'rgba(0, 240, 255, 0.92)'));
    ctx.shadowColor = 'rgba(255, 45, 85, 0.5)';
    killerPaths.forEach(stroke => drawPathStroke(stroke, 'rgba(255, 45, 85, 0.92)'));
    ctx.restore();

    placedObjects.forEach(obj => {
        const icon = icons[obj.type];
        const x = obj.x * mapScale;
        const y = obj.y * mapScale;

        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(x, y, 17, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(5, 7, 10, 0.72)';
        ctx.fill();
        ctx.drawImage(icon, x - 14, y - 14, 28, 28);
        ctx.restore();
    });

    drawErasePreview(previewPos || lastErasePoint);
}

function pointerDown(evt) {
    if (!mapImage.src) return;
    evt.preventDefault();
    canvas.setPointerCapture(evt.pointerId);
    isPointerDown = true;
    const pos = getPointerPosScaled(evt);

    if (activeTool === 'survivorPath' || activeTool === 'killerPath') {
        snapshot();
        currentStroke = { points: [pos], width: brushSize };
        if (activeTool === 'survivorPath') paths.push(currentStroke);
        if (activeTool === 'killerPath') killerPaths.push(currentStroke);
    } else if (activeTool === 'erase') {
        snapshot();
        lastErasePoint = pos;
        eraseAt(pos);
    } else {
        dragIndex = getObjectAtPos(pos);
        snapshot();
        if (dragIndex === -1) {
            placedObjects.push({ type: activeTool, x: pos.x, y: pos.y });
        } else {
            placedObjects[dragIndex].x = pos.x;
            placedObjects[dragIndex].y = pos.y;
        }
    }

    drawMap(pos);
}

function pointerMove(evt) {
    if (!mapImage.src) return;
    const pos = getPointerPosScaled(evt);

    if (!isPointerDown) {
        lastErasePoint = activeTool === 'erase' ? pos : null;
        drawMap(pos);
        return;
    }

    evt.preventDefault();

    if ((activeTool === 'survivorPath' || activeTool === 'killerPath') && currentStroke) {
        const previous = currentStroke.points[currentStroke.points.length - 1];
        if (Math.hypot(pos.x - previous.x, pos.y - previous.y) > 1.5) currentStroke.points.push(pos);
    } else if (activeTool === 'erase') {
        lastErasePoint = pos;
        eraseAt(pos);
    } else if (dragIndex !== -1) {
        placedObjects[dragIndex].x = pos.x;
        placedObjects[dragIndex].y = pos.y;
    }

    drawMap(pos);
}

function pointerUp(evt) {
    if (!mapImage.src) return;
    isPointerDown = false;
    currentStroke = null;
    dragIndex = -1;
    try { canvas.releasePointerCapture(evt.pointerId); } catch (_) { /* pointer already released */ }
    drawMap();
}

function loadMap(map) {
    snapshot();
    activeMap = map;
    mapImage.src = encodeURI(map.src);
    placedObjects = [];
    paths = [];
    killerPaths = [];
    emptyState.classList.add('hidden');
    localStorage.setItem('dbdPathingLastMap', map.src);
    updateLastMap();
    renderMapBrowser();
}

function resizeCanvasForMap() {
    const maxWidth = Math.min(1060, window.innerWidth - 360);
    const maxHeight = Math.max(480, window.innerHeight - 360);
    mapScale = Math.min(maxWidth / mapImage.width, maxHeight / mapImage.height, 1);
    canvas.width = Math.round(mapImage.width * mapScale);
    canvas.height = Math.round(mapImage.height * mapScale);
    drawMap();
}

function undo() {
    const previous = undoStack.pop();
    if (previous) restore(previous);
}


canvas.addEventListener('pointerdown', pointerDown);
canvas.addEventListener('pointermove', pointerMove);
canvas.addEventListener('pointerup', pointerUp);
canvas.addEventListener('pointercancel', pointerUp);
canvas.addEventListener('pointerleave', () => {
    if (!isPointerDown) {
        lastErasePoint = null;
        drawMap();
    }
});

brushSizeInput.addEventListener('input', () => {
    brushSize = Number(brushSizeInput.value);
    brushSizeValue.textContent = brushSize;
    drawMap();
});

document.querySelectorAll('.tool-btn').forEach(button => {
    button.addEventListener('click', () => setTool(button.dataset.tool));
});

document.getElementById('undoBtn').addEventListener('click', undo);
document.getElementById('clearPathsBtn').addEventListener('click', () => {
    snapshot();
    paths = [];
    killerPaths = [];
    drawMap();
});
document.getElementById('clearObjectsBtn').addEventListener('click', () => {
    snapshot();
    placedObjects = [];
    drawMap();
});
document.getElementById('resetBtn').addEventListener('click', () => {
    snapshot();
    placedObjects = [];
    paths = [];
    killerPaths = [];
    drawMap();
});
document.getElementById('showAllMaps').addEventListener('click', () => {
    showFavoritesOnly = false;
    renderMapBrowser();
});
document.getElementById('showFavMaps').addEventListener('click', () => {
    showFavoritesOnly = true;
    renderMapBrowser();
});
mapSearch.addEventListener('input', renderMapBrowser);

document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
        event.preventDefault();
        undo();
        return;
    }
    if (event.target instanceof HTMLInputElement) return;
    const keys = { '1': 'hook', '2': 'gen', '3': 'pallet', '4': 'killer', s: 'survivorPath', k: 'killerPath', e: 'erase' };
    const tool = keys[event.key.toLowerCase()];
    if (tool) setTool(tool);
});

window.addEventListener('resize', () => {
    if (mapImage.src) resizeCanvasForMap();
});

mapImage.onload = resizeCanvasForMap;
Object.values(icons).forEach(icon => { icon.onload = () => drawMap(); });

setTool('hook');
renderMapBrowser();
const lastMapSrc = localStorage.getItem('dbdPathingLastMap');
const lastMap = MAP_DATA.maps.find(map => map.src === lastMapSrc);
if (lastMap) loadMap(lastMap);
else updateLastMap();
