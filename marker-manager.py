#!/usr/bin/env python3
"""
TimeQuest Marker Manager
Ermöglicht den Zugriff auf heruntergeladene Marker-Dateien
"""

import json
import os
from datetime import datetime
import glob

def find_latest_marker_file():
    """Findet die neueste TimeQuest Marker-Datei"""
    # Im Downloads-Ordner nach TimeQuest-Dateien suchen
    downloads_path = os.path.expanduser("~/Downloads")
    pattern = os.path.join(downloads_path, "timequest-v*.json")
    files = glob.glob(pattern)
    
    if not files:
        print("❌ Keine TimeQuest-Dateien im Downloads-Ordner gefunden")
        return None
    
    # Neueste Datei finden
    latest_file = max(files, key=os.path.getctime)
    return latest_file

def read_markers(file_path=None):
    """Liest Marker aus einer JSON-Datei"""
    if not file_path:
        file_path = find_latest_marker_file()
        
    if not file_path:
        return None
        
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        print(f"✅ Datei gelesen: {os.path.basename(file_path)}")
        print(f"📅 Version: {data.get('version', 'unbekannt')}")
        print(f"⏰ Zeitstempel: {data.get('timestamp', 'unbekannt')}")
        print(f"📋 Anzahl Marker: {len(data.get('markers', []))}")
        print()
        
        return data
    except Exception as e:
        print(f"❌ Fehler beim Lesen: {e}")
        return None

def show_markers(data):
    """Zeigt alle Marker an"""
    if not data or 'markers' not in data:
        print("❌ Keine Marker gefunden")
        return
        
    markers = data['markers']
    print("📋 Aktuelle Marker:")
    print("-" * 40)
    
    for i, marker in enumerate(markers, 1):
        print(f"{i:2d}. {marker}")
    
    print("-" * 40)
    print(f"Gesamt: {len(markers)} Marker")

def main():
    print("🏰 TimeQuest Marker Manager")
    print("=" * 40)
    
    # Aktuelle Marker-Datei finden und lesen
    data = read_markers()
    
    if data:
        show_markers(data)
        
        # Marker als Python-Liste verfügbar machen
        markers = data.get('markers', [])
        
        print("\n💡 Verfügbare Variablen:")
        print("   'markers' - Liste aller Marker")
        print("   'data' - Komplette JSON-Daten")
        
        # Interaktive Python-Session starten
        print("\n🐍 Interaktive Python-Session:")
        print("   Verwenden Sie 'markers' um mit den Daten zu arbeiten")
        
        # Beispiele anzeigen
        print("\n📝 Beispiel-Befehle:")
        print("   len(markers)           # Anzahl Marker")
        print("   markers[0]             # Erster Marker")
        print("   'Hogwarts' in markers  # Marker suchen")
        print("   markers.append('Neu')  # Marker hinzufügen")
        
        return markers, data
    else:
        print("\n💡 Tipp: Laden Sie erst eine Datei von der Website herunter!")
        return [], {}

if __name__ == "__main__":
    markers, data = main()