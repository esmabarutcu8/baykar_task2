window.onload = function () {
  const selectedSeatsData = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeatsData) {
    selectedSeats = selectedSeatsData.length;
    selectedSeatsData.forEach((seatIndex) => {
      const seat = document.querySelectorAll(".seat")[seatIndex];
      if (seat && !seat.classList.contains("unavailable")) {
        seat.classList.add("selected");
      }
    });
    document.getElementById(
      "message"
    ).innerText = `${selectedSeats} koltuk seçildi.`;
    updateTotalCost();
  }
};

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    const users = data.slice(0, 10);

    console.log("users:", users);

    document.querySelectorAll(".seat.unavailable").forEach((seat, index) => {
      if (users[index]) {
        const fullName = `${users[index].name}`;
        seat.setAttribute("data-tooltip", fullName);
      }
    });
  })
  .catch((error) => console.log("API Error:", error));

let selectedSeats = 0;
let selectionTimeout;
function selectSeat(seat) {
  console.log("data:", seat);
  if (seat.classList.contains("unavailable")) {
    alert("Bu koltuk zaten dolu! Lütfen başka bir koltuk seçin.");
    return;
  }

  if (seat.classList.contains("selected")) {
    seat.classList.remove("selected");
    selectedSeats--;
  } else {
    if (selectedSeats >= 3) {
      document.getElementById("message").innerText =
        "En fazla 3 koltuk seçebilirsiniz!";
      return;
    }

    seat.classList.add("selected");
    selectedSeats++;
  }
  document.getElementById(
    "message"
  ).innerText = `${selectedSeats} koltuk seçildi.`;
  updateTotalCost();
  resetSelectionTimeout();
  saveSelectedSeats();
}
function saveSelectedSeats() {
  const selectedSeatsArray = [];
  document.querySelectorAll(".seat.selected").forEach((seat, index) => {
    const seatIndex = Array.from(document.querySelectorAll(".seat")).indexOf(
      seat
    );
    selectedSeatsArray.push(seatIndex);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeatsArray));
}
function updateTotalCost() {
  let totalCost = selectedSeats * 1000;
  document.getElementById(
    "totalCost"
  ).innerText = `Toplam Ücret: ${totalCost} TL`;
}

document.getElementById("toggleButton").addEventListener("click", function () {
  console.log("click");
  const formSection = document.getElementById("passenger-details1");
  const icon = document.getElementById("icon");

  if (formSection.style.display === "none") {
    formSection.style.display = "block";
    icon.classList.remove("fa-angle-down");
    icon.classList.add("fa-angle-right");
  } else {
    formSection.style.display = "none";
    icon.classList.remove("fa-angle-right");
    icon.classList.add("fa-angle-down");
  }
});
document.getElementById("toggleButton2").addEventListener("click", function () {
  const formSection = document.getElementById("passenger-details2");
  const icon = document.getElementById("icon");
  if (formSection.style.display === "none") {
    formSection.style.display = "block";
    icon.classList.remove("fa-angle-down");
    icon.classList.add("fa-angle-right");
  } else {
    formSection.style.display = "none";
    icon.classList.remove("fa-angle-down");
    icon.classList.add("fa-angle-right");
  }
});
document.getElementById("toggleButton3").addEventListener("click", function () {
  const formSection = document.getElementById("passenger-details3");
  const icon = document.getElementById("icon");

  if (formSection.style.display === "none") {
    formSection.style.display = "block";
    icon.classList.remove("fa-angle-down");
    icon.classList.add("fa-angle-right");
  } else {
    formSection.style.display = "none";
    icon.classList.remove("fa-angle-right");
    icon.classList.add("fa-angle-down");
  }
});

function resetSelectionTimeout() {
  clearTimeout(selectionTimeout);
  clearTimeout(warningTimeout);

  warningTimeout = setTimeout(function () {
    alert("İşleme devam etmek istiyor musunuz?");
  }, 30000);

  selectionTimeout = setTimeout(function () {
    location.reload();
  }, 35000);
}
