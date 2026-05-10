const ctxBar = document.getElementById("myChart");
const ctxPie = document.getElementById("myPercentageChart");
const dateFilter = document.getElementById("dateFilter");
const filterBtn = document.getElementById("filterBtn");

let barChart = null;
let pieChart = null;

const API_BASE = "http://localhost:8080/server";

const getData = async (date = null) => {
  try {
    let url = API_BASE + "/get-avui.php";
    if (date) {
      url = API_BASE + "/get-fecha.php?data=" + date;
    }
    const res = await fetch(url);
    const data = await res.json();
    buildCharts(data);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
};

const buildCharts = (apiData) => {
  const estats = apiData.estats || {};
  const percentatges = apiData.percentatges || {};

  const labels = Object.keys(estats);
  const barData = Object.values(estats);
  const pieData = labels.map((emotion) => percentatges[emotion] || 0);

  if (barChart) {
    barChart.data.labels = labels;
    barChart.data.datasets[0].data = barData;
    barChart.update();
  } else {
    barChart = new Chart(ctxBar, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Cantidad de Votos",
            data: barData,
            borderWidth: 1,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  }

  if (pieChart) {
    pieChart.data.labels = labels;
    pieChart.data.datasets[0].data = pieData;
    pieChart.update();
  } else {
    pieChart = new Chart(ctxPie, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Porcentaje de Votos (%)",
            data: pieData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.label || "";
                if (label) {
                  label += ": ";
                }
                label += context.raw + "%";
                return label;
              },
            },
          },
        },
      },
    });
  }
};

filterBtn.addEventListener("click", () => {
  getData(dateFilter.value);
});

setInterval(() => {
  const selectedDate = dateFilter.value;
  getData(selectedDate || null);
}, 5000);

getData();
