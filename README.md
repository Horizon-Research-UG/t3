# 🚀 TimeQuest Mission Control

Eine einfache Web-Anwendung zur Verwaltung von Prioritäten und Namen, die auf GitHub Pages gehostet werden kann.

## 📋 Features

- ✅ Namen/Prioritäten hinzufügen und löschen
- ✅ Daten werden lokal im Browser gespeichert
- ✅ Moderne, responsive Benutzeroberfläche  
- ✅ Statistiken und Übersicht
- ✅ Komplett statisch - perfekt für GitHub Pages

## 🚀 GitHub Pages Tutorial

### Schritt 1: Repository vorbereiten
```bash
# Falls noch nicht geschehen, Git initialisieren
git init
git add .
git commit -m "Initial TimeQuest Mission Control"

# Auf GitHub pushen
git branch -M main
git remote add origin https://github.com/Horizon-Research-UG/t3.git
git push -u origin main
```

### Schritt 2: GitHub Pages aktivieren
1. Gehen Sie zu Ihrem GitHub Repository: `https://github.com/Horizon-Research-UG/t3`
2. Klicken Sie auf **Settings** (Einstellungen)
3. Scrollen Sie zu **Pages** in der linken Seitenleiste
4. Unter **Source** wählen Sie **Deploy from a branch**
5. Wählen Sie **main** branch und **/ (root)**
6. Klicken Sie auf **Save**

### Schritt 3: Website aufrufen
Nach wenigen Minuten ist Ihre Website verfügbar unter:
`https://horizon-research-ug.github.io/t3/`

## 📁 Dateistruktur

```
t3/
├── index.html          # Haupt-HTML-Datei
├── style.css          # CSS-Styling
├── script.js          # JavaScript-Funktionalität
├── mission_control.py # Ihre ursprüngliche Python-Datei
├── README.md          # Diese Dokumentation
└── frage_bis_es_stimmt.py
```

## 🎮 Nutzung

### Namen hinzufügen
1. Text in das Eingabefeld eingeben
2. "Hinzufügen" klicken oder Enter drücken
3. Der Name wird zur Liste hinzugefügt

### Namen verwalten
- **Löschen**: Einzelne Namen mit dem "Löschen"-Button entfernen
- **Alle löschen**: Alle Namen auf einmal entfernen
- **Statistiken**: Zeigt Gesamtzahl und zuletzt hinzugefügten Namen

### Datenpersistenz
- Alle Daten werden im lokalen Browser-Speicher (LocalStorage) gespeichert
- Daten bleiben auch nach dem Schließen des Browsers erhalten
- Standardwerte: "Hogwarts", "Timequest", "alles andere" (aus Ihrer Python-Datei)

## 🔧 Technische Details

### Verwendete Technologien
- **HTML5**: Struktur der Website
- **CSS3**: Modernes Styling mit Flexbox und Gradients
- **Vanilla JavaScript**: Funktionalität ohne externe Abhängigkeiten
- **LocalStorage API**: Lokale Datenspeicherung

### Browser-Unterstützung
- ✅ Chrome/Edge (aktuell)
- ✅ Firefox (aktuell)  
- ✅ Safari (aktuell)
- ✅ Mobile Browser

## 📱 Responsive Design
Die Website passt sich automatisch an verschiedene Bildschirmgrößen an:
- Desktop (große Bildschirme)
- Tablet (mittlere Bildschirme)
- Smartphone (kleine Bildschirme)

## 🔄 Zukünftige Erweiterungen

Mögliche Verbesserungen:
- Export/Import von Namen als JSON-Datei
- Kategorisierung von Prioritäten
- Drag & Drop zum Sortieren
- Zeitstempel für hinzugefügte Namen
- Integration mit Ihrer Python-Backend-Logik

## 🐛 Troubleshooting

### Website lädt nicht
- Warten Sie 5-10 Minuten nach der Aktivierung von GitHub Pages
- Prüfen Sie die Repository-Einstellungen

### Daten gehen verloren
- LocalStorage wird durch den Browser verwaltet
- Daten können durch Browser-Bereinigung gelöscht werden
- Implementieren Sie Export/Import für Backups

### Styling-Probleme
- Leeren Sie den Browser-Cache (Strg+F5)
- Prüfen Sie die Konsole auf Fehlermeldungen (F12)

## 📞 Support
Bei Problemen können Sie:
1. Issues auf GitHub erstellen
2. Den Code lokal testen
3. Browser-Entwicklertools verwenden (F12)