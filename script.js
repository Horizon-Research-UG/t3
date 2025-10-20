// Array für die Namen
let names = ["Hogwarts", "Timequest", "alles andere"];

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
    
    // Jeden Namen als Listenelement hinzufügen
    names.forEach(function(name) {
        const listItem = document.createElement('li');
        listItem.textContent = name;
        list.appendChild(listItem);
    });
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
    const dataStr = JSON.stringify({
        timestamp: new Date().toISOString(),
        markers: names
    }, null, 2);
    
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'timequest-marker.json';
    link.click();
    
    URL.revokeObjectURL(url);
    alert('JSON-Datei heruntergeladen! 📄');
}

// Als Text-Datei herunterladen
function downloadAsText() {
    const textContent = [
        '=== TimeQuest Marker ===',
        'Erstellt am: ' + new Date().toLocaleString('de-DE'),
        '',
        '--- Marker Liste ---'
    ].concat(names.map((name, index) => `${index + 1}. ${name}`)).join('\n');
    
    const dataBlob = new Blob([textContent], {type: 'text/plain'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'timequest-marker.txt';
    link.click();
    
    URL.revokeObjectURL(url);
    alert('Text-Datei heruntergeladen! 📝');
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
                    showNames();
                    alert(`${names.length} Marker aus JSON importiert! 🎉`);
                } else {
                    alert('Ungültiges JSON-Format!');
                }
            } else if (file.name.endsWith('.txt')) {
                // Text-Import
                const lines = content.split('\n')
                    .map(line => line.trim())
                    .filter(line => line && !line.startsWith('=') && !line.startsWith('-') && !line.includes('Erstellt am:'))
                    .map(line => line.replace(/^\d+\.\s*/, '')); // Nummerierung entfernen
                
                if (lines.length > 0) {
                    names = lines;
                    showNames();
                    alert(`${names.length} Marker aus Text-Datei importiert! 📝`);
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