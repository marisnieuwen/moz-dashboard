# MoZ Monitoringstool - README

<img src="src/images/moz-mascot.svg" alt="MoZ Mascot" height="64" width="64">

## Introductie

De MoZ Monitoringstool is een webapplicatie die is ontwikkeld om medewerkers en onderzoekers van het programma MoZ (Mentoren op Zuid) inzicht te geven in de feedback van deelnemers. De gegevens van de evaluaties worden in deze tool verzameld en geanalyseerd, zodat MoZ een duidelijk beeld krijgt van de ervaringen en meningen van de mentoren en mentees.

Deze webapplicatie is gebouwd met React.js en MUI en maakt gebruik van Firebase om de data op te halen. Voor het genereren en downloaden van rapportages wordt gebruik gemaakt van jsPDF en html2canvas. Deze rapportages bevatten de verzamelde data, hoewel de huidige implementatie beperkt is omdat tekst in de PDF niet geselecteerd kan worden. In de toekomst zou deze functionaliteit kunnen worden verbeterd door een andere techniek te gebruiken, waardoor er ook een bewerkingsfunctionaliteit in de webapp kan worden toegevoegd.

## Vereisten

- Node.js
- React.js
- Firebase
- jsPDF
- html2canvas

## Installatie

1. **Installeer de benodigde dependencies:**

   ```bash
   npm install
   ```

2. **Configureer Firebase:**
   - Maak een Firebase-project aan in de [Firebase Console](https://console.firebase.google.com/).
   - Voeg je Firebase-configuratie toe in een `.env` bestand:
     ```
     REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
     REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
     REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
     REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
     REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
     ```

## Gebruik

1. **Start de webapplicatie:**

   ```bash
   npm start
   ```

2. **Gebruik de applicatie:**
   - Bekijk en analyseer de evaluatiedata die van de mentoren en mentees is verzameld.
   - Genereer rapportages door gebruik te maken van de jsPDF en html2canvas functionaliteit.
   - Download de rapportages als PDF-bestanden. Houd er rekening mee dat in de huidige implementatie de tekst in de PDF niet geselecteerd kan worden.

## Toekomstige verbeteringen

- Gebruik maken van een andere techniek voor het genereren van PDF's, zodat tekst geselecteerd kan worden in de PDF.
- Toevoegen van een bewerkingsfunctionaliteit in de webapp, waardoor rapportages in de webapp zelf kunnen worden aangepast en vervolgens als PDF gedownload kunnen worden.

## Structuur

- /src - Bevat de React.js frontend code
- /public - Bevat de statische bestanden
- .env - Bevat de configuratie variabelen voor Firebase
