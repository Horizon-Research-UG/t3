// TimeQuest Namen-Verwaltung
let names = ["Hogwarts", "Timequest", "alles andere"];

// Beim Laden der Seite Namen anzeigen
window.onload = function() {
    showNames();
};

// Name hinzufügen
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
    
    console.log('Name hinzugefügt:', newName);
    console.log('Aktuelle Namen:', names);
}

// Alle Namen anzeigen
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