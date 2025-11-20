const API_BASE_URL = "http://localhost:4000/api";

let pendingOrder = null;

// Load pending order from localStorage
function loadPendingOrder() {
    const raw = localStorage.getItem("liquorLanePendingOrder");
    if (!raw) {
        // No pending order, go back to home
        window.location.href = "index.html";
        return;
    }

    try {
        pendingOrder = JSON.parse(raw);
    } catch (e) {
        console.error("Failed to parse pending order", e);
        window.location.href = "index.html";
        return;
    }
}

// Render order summary on the right panel
function renderSummary() {
    const summaryItemsEl = document.getElementById("summaryItems");
    const summaryTotalEl = document.getElementById("summaryTotal");

    if (!pendingOrder || !pendingOrder.items || pendingOrder.items.length === 0) {
        summaryItemsEl.innerHTML = "<p>No items found in order.</p>";
        summaryTotalEl.textContent = "0";
        return;
    }

    let total = 0;
    const ul = document.createElement("ul");
    ul.style.listStyle = "none";
    ul.style.padding = "0";
    ul.style.margin = "0";
    ul.style.maxHeight = "220px";
    ul.style.overflowY = "auto";
    ul.style.fontSize = "0.85rem";

    const cartRaw = localStorage.getItem("liquorLaneCart");
    let cartMap = {};
    if (cartRaw) {
        try {
            const cartArr = JSON.parse(cartRaw);
            cartArr.forEach((c) => {
                cartMap[c.productId] = c.name;
            });
        } catch {
            // ignore
        }
    }

    pendingOrder.items.forEach((item) => {
        const price = Number(item.price) || 0;
        const lineTotal = price * (item.quantity || 0);
        total += lineTotal;

        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.padding = "4px 0";

        const name =
            cartMap[item.productId] || `Product ${String(item.productId).slice(0, 4)}`;

        li.innerHTML = `
      <span>${name} × ${item.quantity}</span>
      <span>₹${lineTotal}</span>
    `;
        ul.appendChild(li);
    });

    summaryItemsEl.innerHTML = "";
    summaryItemsEl.appendChild(ul);
    summaryTotalEl.textContent = total.toString();
}

// Geolocation handler
function initLocation() {
    const btnUseLocation = document.getElementById("btnUseLocation");
    const locationInfo = document.getElementById("locationInfo");
    const latInput = document.getElementById("lat");
    const lngInput = document.getElementById("lng");

    btnUseLocation.addEventListener("click", () => {
        if (!navigator.geolocation) {
            locationInfo.textContent = "Geolocation is not supported by your browser.";
            return;
        }

        locationInfo.textContent = "Fetching your location...";

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                latInput.value = latitude;
                lngInput.value = longitude;

                const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
                locationInfo.innerHTML = `
          Location captured: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}<br/>
          <a href="${mapsLink}" target="_blank">View on Google Maps</a>
        `;
            },
            (err) => {
                console.error("Geolocation error", err);
                locationInfo.textContent =
                    "Unable to get your location. Please allow location access or enter address manually.";
            }
        );
    });
}

// Submit address + finalize order
function initAddressForm() {
    const form = document.getElementById("addressForm");
    const fullNameEl = document.getElementById("fullName");
    const phoneEl = document.getElementById("phone");
    const addressLineEl = document.getElementById("addressLine");
    const cityEl = document.getElementById("city");
    const pincodeEl = document.getElementById("pincode");
    const latEl = document.getElementById("lat");
    const lngEl = document.getElementById("lng");
    const msgEl = document.getElementById("addressMsg");

    // Prefill name if available
    if (pendingOrder && pendingOrder.customer && pendingOrder.customer.name) {
        fullNameEl.value = pendingOrder.customer.name;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        msgEl.textContent = "";
        msgEl.style.color = "";

        if (
            !fullNameEl.value ||
            !phoneEl.value ||
            !addressLineEl.value ||
            !cityEl.value ||
            !pincodeEl.value
        ) {
            msgEl.textContent = "Please fill all required fields.";
            msgEl.style.color = "#fecaca";
            return;
        }

        const address = {
            fullName: fullNameEl.value,
            phone: phoneEl.value,
            line1: addressLineEl.value,
            city: cityEl.value,
            pincode: pincodeEl.value
        };

        const location = {};
        if (latEl.value && lngEl.value) {
            location.lat = Number(latEl.value);
            location.lng = Number(lngEl.value);
        }

        const payload = {
            items: pendingOrder.items,
            customer: {
                ...pendingOrder.customer,
                address,
                location
            }
        };

        try {
            msgEl.textContent = "Placing your order...";
            const res = await fetch(`${API_BASE_URL}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || data.message || "Failed to place order.");
            }

            msgEl.textContent = `Order placed! ID: ${data.orderId}, Total: ₹${data.total}`;
            msgEl.style.color = "#bbf7d0";

            // Clear pending data
            localStorage.removeItem("liquorLanePendingOrder");
            localStorage.removeItem("liquorLaneCart");

            // Redirect back to home after a short delay
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        } catch (err) {
            console.error(err);
            msgEl.textContent = err.message || "Something went wrong.";
            msgEl.style.color = "#fecaca";
        }
    });
}

function init() {
    loadPendingOrder();
    renderSummary();
    initLocation();
    initAddressForm();
}

document.addEventListener("DOMContentLoaded", init);
