document.addEventListener("DOMContentLoaded", () => {
  // Tooltip Management
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  document.body.appendChild(tooltip);

  const buttons = document.querySelectorAll(".col");

  buttons.forEach(button => {
    button.addEventListener("mouseover", (e) => {
      const text = button.dataset.tooltip;
      tooltip.textContent = text;
      tooltip.classList.add("show");
    });

    button.addEventListener("mousemove", (e) => {
      tooltip.style.left = e.pageX + 10 + "px";
      tooltip.style.top = e.pageY + 10 + "px";
    });

    button.addEventListener("mouseout", () => {
      tooltip.classList.remove("show");
    });
  });

  // Subscribe Button Management - 1° REST API (fetch)
  const subscribeButton = document.getElementById('subscribe-btn');

  subscribeButton.addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Nuovo Iscritto',
        body: 'Utente iscritto alla newsletter!',
        userId: 1
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(response => response.json())
    .then(data => {
      const confirmationMessage = document.createElement('div');
      confirmationMessage.textContent = 'Grazie per esserti iscritto!';
      confirmationMessage.classList.add('confirmation');

      subscribeButton.parentNode.appendChild(confirmationMessage);

      subscribeButton.disabled = true;
      subscribeButton.style.backgroundColor = 'gray';
      subscribeButton.style.cursor = 'not-allowed';
    })
    .catch(error => {
      console.error('Errore nella registrazione:', error);
    });
  });

  // Info Button Management - 2° REST API (Geocoding)
  const infoButton = document.getElementById('info-btn');

  infoButton.addEventListener('click', () => {
    const address = 'Contrada Valcorrente, 23 – Belpasso CT';
    const apiKey = 'secret'; // API key da non pubblicare
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}&language=it`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const infoContainer = document.getElementById('info-container');
        if (data.results && data.results.length > 0) {
          const result = data.results[0];
          const lat = result.geometry.lat;
          const lng = result.geometry.lng;
          const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;

          infoContainer.innerHTML = `
            <p><strong>Indirizzo:</strong> ${address}</p>
            <p><strong>Coordinate:</strong> ${lat}, ${lng}</p>
            <p><a href="${mapLink}" target="_blank">Apri su Google Maps</a></p>
          `;
        } else {
          infoContainer.textContent = 'Informazioni non disponibili.';
        }
      })
      .catch(error => {
        console.error('Errore nel recupero info:', error);
      });
  });
});
