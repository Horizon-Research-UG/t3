// TimeQuest Namen-Verwaltung
let names = ["Beispiel"];

// Beim Laden der Seite Namen anzeigen
window.onload = function() {
    showNames();
};

// Name hinzufügen
function addName() {
    const input = document.getElementById('nameInput');
    const newName = input.value.trim();
    
    if (newName === '') {
        alert('Bitte einen Marker eingeben!');
        return;
    }
    
    // Name zur Liste hinzufügen
    names.push(newName);
    
    // Input-Feld leeren
    input.value = '';
    
    // Liste neu anzeigen
    showNames();
    
    console.log('Marker hinzugefügt:', newName);
    console.log('Aktuelle Marker:', names);
}

// Schnell-Marker hinzufügen
function addQuickMarker(markerName) {
    // Prüfen ob bereits vorhanden
    if (names.includes(markerName)) {
        alert('Marker "' + markerName + '" ist bereits vorhanden!');
        return;
    }
    
    // Marker zur Liste hinzufügen
    names.push(markerName);
    
    // Liste neu anzeigen
    showNames();
    
    console.log('Schnell-Marker hinzugefügt:', markerName);
}

// Alle Marker anzeigen
function showNames() {
    const list = document.getElementById('nameList');
    list.innerHTML = ''; // Liste leeren
    
    // Jeden Namen als Listenelement hinzufügen
    names.forEach(function(name, index) {
        const listItem = document.createElement('li');
        listItem.textContent = name;
        list.appendChild(listItem);
    });
    
    console.log('Namen angezeigt:', names);
}

// Enter-Taste im Input-Feld
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('nameInput');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addName();
            }
        });
    }
});