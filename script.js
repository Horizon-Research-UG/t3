// Array für die Namen
let names = ["Hogwarts", "Timequest", "alles andere"];
let currentFileName = "Standard-Liste";
let downloadCounter = 1;

// Beim Laden der Seite - Liste versteckt lassen
window.onload = function() {
    console.log('TimeQuest geladen - Liste versteckt');
    console.log('toggleMarkerList Funktion verfügbar:', typeof toggleMarkerList);
    
    // Test ob alle Elemente gefunden werden
    const container = document.getElementById('markerListContainer');
    const button = document.querySelector('.show-list-btn');
    console.log('Container beim Laden gefunden:', container);
    console.log('Button beim Laden gefunden:', button);
};

// Funktion: Name hinzufügen
function addName() {
    const input = document.getElementById('nameInput');
    const newName = input.value.trim();
    
    if (newName === '') {
        alert('Bitte einen Namen eingeben!');
        return;
    }
    
    // Name zur Liste hinzufügen
    names.push(newName);
    
    // Input-Feld leeren
    input.value = '';
    
    // Liste neu anzeigen
    showNames();
}

// Funktion: Alle Namen anzeigen
function showNames() {
    const list = document.getElementById('nameList');
    list.innerHTML = ''; // Liste leeren
    
    // Jeden Namen als Listenelement mit X-Button hinzufügen
    names.forEach(function(name, index) {
        const listItem = document.createElement('li');
        listItem.className = 'marker-item';
        listItem.innerHTML = `
            <span class="marker-text">${name}</span>
            <button class="delete-btn" onclick="deleteMarker(${index})" title="Marker löschen">✖</button>
        `;
        list.appendChild(listItem);
    });
    
    // Versionsinfo aktualisieren
    updateVersionInfo();
}

// Marker löschen
function deleteMarker(index) {
    const markerName = names[index];
    if (confirm(`Möchten Sie "${markerName}" wirklich löschen?`)) {
        names.splice(index, 1);
        showNames();
        alert(`"${markerName}" wurde gelöscht! 🗑️`);
    }
}

// Versionsinfo aktualisieren
function updateVersionInfo() {
    const versionElement = document.getElementById('currentVersion');
    const timestamp = new Date().toLocaleString('de-DE', { 
        day: '2-digit', 
        month: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    versionElement.textContent = `📌 ${currentFileName} (${names.length} Marker, ${timestamp})`;
}

// Liste ein-/ausblenden
function toggleMarkerList() {
    const container = document.getElementById('markerListContainer');
    const button = document.querySelector('.show-list-btn');
    
    if (container.style.display === 'none' || container.style.display === '') {
        // Liste anzeigen
        container.style.display = 'block';
        button.textContent = '🙈 Meine Marker verstecken';
        showNames(); // Liste aktualisieren
    } else {
        // Liste verstecken
        container.style.display = 'none';
        button.textContent = '📋 Meine Marker anzeigen';
    }
}

// Als JSON-Datei herunterladen
function downloadAsJSON() {
    const timestamp = new Date().toISOString().slice(0,16).replace('T', '_').replace(':', '-');
    const fileName = `timequest-v${downloadCounter}_${timestamp}.json`;
    
    const dataStr = JSON.stringify({
        version: downloadCounter,
        timestamp: new Date().toISOString(),
        fileName: fileName,
        markers: names
    }, null, 2);
    
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    
    URL.revokeObjectURL(url);
    
    // Dateiname und Version aktualisieren
    currentFileName = fileName;
    downloadCounter++;
    updateVersionInfo();
    
    alert(`JSON-Datei "${fileName}" heruntergeladen! 📄`);
}

// Als Text-Datei herunterladen
function downloadAsText() {
    const timestamp = new Date().toISOString().slice(0,16).replace('T', '_').replace(':', '-');
    const fileName = `timequest-v${downloadCounter}_${timestamp}.txt`;
    
    const textContent = [
        '=== TimeQuest Marker ===',
        `Version: ${downloadCounter}`,
        `Dateiname: ${fileName}`,
        'Erstellt am: ' + new Date().toLocaleString('de-DE'),
        '',
        '--- Marker Liste ---'
    ].concat(names.map((name, index) => `${index + 1}. ${name}`)).join('\n');
    
    const dataBlob = new Blob([textContent], {type: 'text/plain'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    
    URL.revokeObjectURL(url);
    
    // Dateiname und Version aktualisieren
    currentFileName = fileName;
    downloadCounter++;
    updateVersionInfo();
    
    alert(`Text-Datei "${fileName}" heruntergeladen! 📝`);
}

// Datei hochladen und importieren
function uploadFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const content = e.target.result;
            
            if (file.name.endsWith('.json')) {
                // JSON-Import
                const data = JSON.parse(content);
                if (data.markers && Array.isArray(data.markers)) {
                    names = data.markers;
                    
                    // Dateiinfo aktualisieren
                    currentFileName = data.fileName || file.name;
                    if (data.version) {
                        downloadCounter = Math.max(downloadCounter, data.version + 1);
                    }
                    
                    showNames();
                    alert(`${names.length} Marker aus "${file.name}" importiert! 🎉`);
                } else {
                    alert('Ungültiges JSON-Format!');
                }
            } else if (file.name.endsWith('.txt')) {
                // Text-Import
                const lines = content.split('\n')
                    .map(line => line.trim())
                    .filter(line => line && !line.startsWith('=') && !line.startsWith('-') && !line.includes('Erstellt am:') && !line.includes('Version:') && !line.includes('Dateiname:'))
                    .map(line => line.replace(/^\d+\.\s*/, '')); // Nummerierung entfernen
                
                if (lines.length > 0) {
                    names = lines;
                    currentFileName = file.name;
                    showNames();
                    alert(`${names.length} Marker aus "${file.name}" importiert! 📝`);
                } else {
                    alert('Keine gültigen Marker in der Text-Datei gefunden!');
                }
            }
        } catch (error) {
            alert('Fehler beim Lesen der Datei: ' + error.message);
        }
    };
    reader.readAsText(file);
}