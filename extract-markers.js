// TimeQuest Marker Extractor
// Dieses Script können Sie in der Browser-Konsole ausführen

// 1. Öffnen Sie Ihre TimeQuest Website
// 2. Drücken Sie Strg+Shift+I (Entwicklertools)
// 3. Gehen Sie zum "Console" Tab
// 4. Fügen Sie diesen Code ein und drücken Sie Enter:

console.log("=== TimeQuest Marker Export ===");

// Aktuelle Marker aus dem Speicher holen (falls LocalStorage verwendet wird)
if (typeof names !== 'undefined') {
    const currentMarkers = {
        timestamp: new Date().toISOString(),
        source: "Browser-Session",
        markers: names
    };
    
    console.log("Aktuelle Marker:", currentMarkers);
    console.log("JSON für VS Code:");
    console.log(JSON.stringify(currentMarkers, null, 2));
    
    // Automatisch in die Zwischenablage kopieren
    navigator.clipboard.writeText(JSON.stringify(currentMarkers, null, 2))
        .then(() => console.log("✅ JSON in Zwischenablage kopiert!"))
        .catch(() => console.log("❌ Kopieren fehlgeschlagen"));
} else {
    console.log("❌ Keine Marker gefunden. Seite neu laden?");
}