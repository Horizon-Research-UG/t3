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
        alert('Liste sollte jetzt sichtbar sein!');
    } else {
        // Liste verstecken
        container.style.display = 'none';
        button.textContent = '📋 Meine Marker anzeigen';
        alert('Liste sollte jetzt versteckt sein!');
    }
}