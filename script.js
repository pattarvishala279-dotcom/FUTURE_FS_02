const API_URL = "http://localhost:5000/api/leads";

// Load leads when page opens
document.addEventListener("DOMContentLoaded", loadLeads);

// Add new lead
async function addLead() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const source = document.getElementById("source").value.trim();
  const notes = document.getElementById("notes").value.trim();

  if (!name || !email || !source) {
    alert("Please fill all required fields");
    return;
  }

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        source,
        notes
      })
    });

    // Clear inputs
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("source").value = "";
    document.getElementById("notes").value = "";

    // Reload leads
    loadLeads();

  } catch (error) {
    console.error("Error adding lead:", error);
    alert("Failed to add lead");
  }
}

// Load all leads
async function loadLeads() {
  try {
    const res = await fetch(API_URL);
    const leads = await res.json();

    const tableBody = document.getElementById("leadsTable");
    tableBody.innerHTML = "";

    leads.forEach(lead => {
      tableBody.innerHTML += `
        <tr>
          <td>${lead.name}</td>
          <td>${lead.email}</td>
          <td>${lead.source}</td>
          <td>${lead.status || "New"}</td>
          <td>—</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Error loading leads:", error);
  }
}
