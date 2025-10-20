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

// Liste ein-/ausblenden
function toggleMarkerList() {
    const container = document.getElementById('markerListContainer');
    const button = document.querySelector('.show-list-btn');
    
    if (container.style.display === 'none') {
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