import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

// Functie om een PDF te genereren
const Report = ({ data }) => {
  const generatePDF = () => {
    // Maak een nieuwe PDF aan
    const doc = new jsPDF();

    // Voeg de inhoud toe aan de PDF
    doc.setFontSize(18);
    doc.text("Voortgangsrapportage Mentoren op Zuid", 14, 22);
    doc.setFontSize(12);
    doc.text("Periode: 2022", 14, 30);
    doc.text("Programmateam 25%", 14, 36);

    // Voeg de eerste tabel toe
    doc.setFontSize(14);
    doc.text("1. Tevredenheid deelnemers", 14, 50);
    doc.autoTable({ startY: 55, html: "#satisfactionTable" });

    // Voeg de overige tabellen toe
    doc.setFontSize(14);
    doc.text(
      "2. Aanwezigheid en voorbereiding",
      14,
      doc.previousAutoTable.finalY + 10
    );
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 15,
      html: "#attendanceTable",
    });

    doc.setFontSize(14);
    doc.text("3. Wederzijdse band", 14, doc.previousAutoTable.finalY + 10);
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 15,
      html: "#relationshipTable",
    });

    doc.setFontSize(14);
    doc.text(
      "4. Motivatie van mentoren en mentees",
      14,
      doc.previousAutoTable.finalY + 10
    );
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 15,
      html: "#motivationTable",
    });

    doc.setFontSize(14);
    doc.text(
      "5. Toerusting van mentoren",
      14,
      doc.previousAutoTable.finalY + 10
    );
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 15,
      html: "#equipmentTable",
    });

    // Sla de PDF op
    doc.save("Voortgangsrapportage.pdf");
  };

  return (
    <div>
      <h1>Voortgangsrapportage Mentoren op Zuid</h1>
      <p>Periode: 2021</p>
      <p>Programmateam 25%</p>

      <h2>1. Tevredenheid deelnemers</h2>
      <table id="satisfactionTable">
        <thead>
          <tr>
            <th>Groep</th>
            <th>Gemiddelde Tevredenheid</th>
          </tr>
        </thead>
        <tbody>
          {data.satisfaction.map((item, index) => (
            <tr key={index}>
              <td>{item.group}</td>
              <td>{item.average}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>2. Aanwezigheid en voorbereiding</h2>
      <table id="attendanceTable">
        <thead>
          <tr>
            <th>Groep</th>
            <th>Aanwezigheid</th>
            <th>Voorbereiding</th>
          </tr>
        </thead>
        <tbody>
          {data.attendance.map((item, index) => (
            <tr key={index}>
              <td>{item.group}</td>
              <td>{item.presence}</td>
              <td>{item.preparation}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>3. Wederzijdse band</h2>
      <table id="relationshipTable">
        <thead>
          <tr>
            <th>Groep</th>
            <th>Mentor-Mentee Band</th>
          </tr>
        </thead>
        <tbody>
          {data.relationship.map((item, index) => (
            <tr key={index}>
              <td>{item.group}</td>
              <td>{item.bond}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>4. Motivatie van mentoren en mentees</h2>
      <table id="motivationTable">
        <thead>
          <tr>
            <th>Groep</th>
            <th>Motivatie</th>
          </tr>
        </thead>
        <tbody>
          {data.motivation.map((item, index) => (
            <tr key={index}>
              <td>{item.group}</td>
              <td>{item.motivation}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>5. Toerusting van mentoren</h2>
      <table id="equipmentTable">
        <thead>
          <tr>
            <th>Groep</th>
            <th>Toerusting</th>
          </tr>
        </thead>
        <tbody>
          {data.equipment.map((item, index) => (
            <tr key={index}>
              <td>{item.group}</td>
              <td>{item.equipment}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={generatePDF}>Exporteer als PDF</button>
    </div>
  );
};

export default Report;

// Example data format for the Report component
const exampleData = {
  satisfaction: [
    { group: "Groep 1", average: 7.5 },
    { group: "Groep 2", average: 8.0 },
  ],
  attendance: [
    { group: "Groep 1", presence: "90%", preparation: "80%" },
    { group: "Groep 2", presence: "85%", preparation: "75%" },
  ],
  relationship: [
    { group: "Groep 1", bond: 7.8 },
    { group: "Groep 2", bond: 8.1 },
  ],
  motivation: [
    { group: "Groep 1", motivation: 7.5 },
    { group: "Groep 2", motivation: 7.9 },
  ],
  equipment: [
    { group: "Groep 1", equipment: 8.0 },
    { group: "Groep 2", equipment: 8.3 },
  ],
};

// Render the Report component
import ReactDOM from "react-dom";
ReactDOM.render(<Report data={exampleData} />, document.getElementById("root"));
