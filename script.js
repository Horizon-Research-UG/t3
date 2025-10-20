// TimeQuest Mission Control JavaScript

// Namen Array - wird im lokalen Speicher gespeichert
let names = [];

// Beim Laden der Seite Namen aus LocalStorage laden
document.addEventListener('DOMContentLoaded', function() {
    loadNames();
    updateDisplay();
    
    // Enter-Taste im Input-Feld abfangen
    document.getElementById('newName').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addName();
        }
    });
});

// Namen aus LocalStorage laden
function loadNames() {
    const savedNames = localStorage.getItem('timequest-names');
    if (savedNames) {
        names = JSON.parse(savedNames);
    } else {
        // Standardwerte aus Ihrer Python-Datei
        names = ["Hogwarts", "Timequest", "alles andere"];
        saveNames();
    }
}

// Namen in LocalStorage speichern
function saveNames() {
    localStorage.setItem('timequest-names', JSON.stringify(names));
}

// Neuen Namen hinzufügen
function addName() {
    const input = document.getElementById('newName');
    const newName = input.value.trim();
    
    if (newName === '') {
        alert('Bitte geben Sie einen Namen ein!');
        return;
    }
    
    if (names.includes(newName)) {
        alert('Dieser Name existiert bereits!');
        return;
    }
    
    // Namen hinzufügen
    names.push(newName);
    
    // Speichern und Anzeige aktualisieren
    saveNames();
    updateDisplay();
    
    // Input-Feld leeren und fokussieren
    input.value = '';
    input.focus();
    
    // Erfolgs-Feedback
    showSuccess(`"${newName}" wurde hinzugefügt! 🎉`);
}

// Namen löschen
function deleteName(index) {
    const deletedName = names[index];
    
    if (confirm(`Möchten Sie "${deletedName}" wirklich löschen?`)) {
        names.splice(index, 1);
        saveNames();
        updateDisplay();
        showSuccess(`"${deletedName}" wurde gelöscht.`);
    }
}

// Alle Namen löschen
function clearAll() {
    if (names.length === 0) {
        alert('Es sind bereits keine Namen vorhanden.');
        return;
    }
    
    if (confirm(`Möchten Sie wirklich alle ${names.length} Prioritäten löschen?`)) {
        names = [];
        saveNames();
        updateDisplay();
        showSuccess('Alle Prioritäten wurden gelöscht.');
    }
}

// Anzeige aktualisieren
function updateDisplay() {
    const nameList = document.getElementById('nameList');
    const totalCount = document.getElementById('totalCount');
    const lastAdded = document.getElementById('lastAdded');
    
    // Namen-Liste leeren
    nameList.innerHTML = '';
    
    if (names.length === 0) {
        nameList.innerHTML = '<div class="empty-state">Noch keine Prioritäten vorhanden.<br>Fügen Sie die erste hinzu! 🚀</div>';
    } else {
        names.forEach((name, index) => {
            const nameItem = document.createElement('div');
            nameItem.className = 'name-item';
            nameItem.innerHTML = `
                <span class="name-text">${escapeHtml(name)}</span>
                <button class="delete-btn" onclick="deleteName(${index})">Löschen</button>
            `;
            nameList.appendChild(nameItem);
        });
    }
    
    // Statistiken aktualisieren
    totalCount.textContent = names.length;
    lastAdded.textContent = names.length > 0 ? names[names.length - 1] : '-';
}

// HTML-Entities escapen für Sicherheit
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Erfolgs-Nachricht anzeigen
function showSuccess(message) {
    // Einfache Alert-Alternative (kann später durch Toast-Nachrichten ersetzt werden)
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #48bb78;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        font-weight: 500;
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Nach 3 Sekunden automatisch entfernen
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Export-Funktion für Namen (optional)
function exportNames() {
    const dataStr = JSON.stringify(names, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'timequest-prioritäten.json';
    link.click();
    
    URL.revokeObjectURL(url);
}

// Import-Funktion für Namen (optional)
function importNames(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedNames = JSON.parse(e.target.result);
            if (Array.isArray(importedNames)) {
                names = importedNames;
                saveNames();
                updateDisplay();
                showSuccess('Namen erfolgreich importiert!');
            } else {
                alert('Ungültiges Dateiformat!');
            }
        } catch (error) {
            alert('Fehler beim Lesen der Datei!');
        }
    };
    reader.readAsText(file);
}