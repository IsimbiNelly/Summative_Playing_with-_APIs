const { createApp, ref, computed, onMounted, nextTick } = Vue;

// Motorcycle data with your specific images
const motorcyclesData = [
  {
    id: 1,
    brand: "Honda",
    model: "Wave 110",
    price: 2500000,
    engineSize: 110,
    year: 2021,
    location: "Kigali",
    image: "honda-wave-110.jpg"
  },
  {
    id: 2,
    brand: "Honda",
    model: "Wave 110S",
    price: 2700000,
    engineSize: 110,
    year: 2022,
    location: "Musanze",
    image: "honda-wave-110s.jpg"
  },
  {
    id: 3,
    brand: "Kawasaki",
    model: "KIX 150",
    price: 3800000,
    engineSize: 150,
    year: 2022,
    location: "Kigali",
    image: "Kawasaki-KLX-150.avif"
  },
  {
    id: 4,
    brand: "KTM",
    model: "Duke 200",
    price: 4500000,
    engineSize: 200,
    year: 2022,
    location: "Rubavu",
    image: "ktm 200.jpeg"
  },
  {
    id: 5,
    brand: "KTM",
    model: "RC 200",
    price: 4800000,
    engineSize: 200,
    year: 2023,
    location: "Kigali",
    image: "KTM RC 200.webp"
  },
  {
    id: 6,
    brand: "Suzuki",
    model: "DR 200",
    price: 4200000,
    engineSize: 200,
    year: 2022,
    location: "Huye",
    image: "suzuki dr 200 cc.jpg"
  },
  {
    id: 7,
    brand: "Suzuki",
    model: "GD 110",
    price: 2600000,
    engineSize: 110,
    year: 2021,
    location: "Musanze",
    image: "suzuki gd 110.webp"
  },
  {
    id: 8,
    brand: "Suzuki",
    model: "GSX-R150",
    price: 4400000,
    engineSize: 150,
    year: 2023,
    location: "Kigali",
    image: "suzuki-gsx-r150.avif"
  },
  {
    id: 9,
    brand: "TVS",
    model: "Apache RTR 310",
    price: 5200000,
    engineSize: 310,
    year: 2023,
    location: "Kigali",
    image: "tvs-apache-rtr-310.jpg"
  }
];

createApp({
  setup() {
    const motorcycles = ref([]);
    const priceHistory = ref([]);
    const selectedBrand = ref('');
    const priceRange = ref(8000000);
    const selectedEngineSize = ref('');
    const selectedMotorcycle = ref(null);
    const priceChart = ref(null);
    const isLoading = ref(false);
    const error = ref(null);

    const fetchData = async () => {
      try {
        isLoading.value = true;
        await new Promise(resolve => setTimeout(resolve, 500));
        motorcycles.value = motorcyclesData;
      } catch (err) {
        error.value = "Failed to load data";
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    };

    const handleImageError = (event) => {
      event.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
    };

    const showPriceHistory = async (motorcycle) => {
      try {
        isLoading.value = true;
        selectedMotorcycle.value = motorcycle;
        
        // Simulate API call for price history
        await new Promise(resolve => setTimeout(resolve, 300));
        const months = 6;
        priceHistory.value = Array.from({ length: months }, (_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - (months - i - 1));
          return {
            id: i + 1,
            motorcycleId: motorcycle.id,
            date: date.toISOString().split('T')[0],
            price: motorcycle.price + (Math.random() * 500000 - 250000)
          };
        });
        
        nextTick(() => {
          createPriceChart();
        });
      } catch (err) {
        error.value = "Failed to load price history";
      } finally {
        isLoading.value = false;
      }
    };

    const createPriceChart = () => {
      if (!selectedMotorcycle.value) return;
      
      const ctx = document.getElementById('priceChart').getContext('2d');
      const history = priceHistory.value
        .filter(item => item.motorcycleId === selectedMotorcycle.value.id)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      
      const labels = history.map(item => new Date(item.date).toLocaleDateString());
      const prices = history.map(item => item.price);
      
      if (priceChart.value) {
        priceChart.value.destroy();
      }
      
      priceChart.value = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Price (RWF)',
            data: prices,
            borderColor: '#008080',
            backgroundColor: 'rgba(0, 128, 128, 0.1)',
            borderWidth: 2,
            fill: true
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false,
              ticks: {
                callback: function(value) {
                  return new Intl.NumberFormat('rw-RW', {
                    style: 'currency',
                    currency: 'RWF'
                  }).format(value);
                }
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return new Intl.NumberFormat('rw-RW', {
                    style: 'currency',
                    currency: 'RWF'
                  }).format(context.raw);
                }
              }
            }
          }
        }
      });
    };

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('rw-RW', {
        style: 'currency',
        currency: 'RWF'
      }).format(amount);
    };

    const resetFilters = () => {
      selectedBrand.value = '';
      priceRange.value = 8000000;
      selectedEngineSize.value = '';
    };

    const brands = computed(() => [...new Set(motorcycles.value.map(m => m.brand))]);
    const engineSizes = computed(() => [...new Set(motorcycles.value.map(m => m.engineSize))].sort((a,b) => a-b));
    
    const filteredMotorcycles = computed(() => {
      return motorcycles.value.filter(moto => {
        const matchesBrand = !selectedBrand.value || moto.brand === selectedBrand.value;
        const matchesPrice = moto.price <= priceRange.value;
        const matchesEngine = !selectedEngineSize.value || moto.engineSize == selectedEngineSize.value;
        return matchesBrand && matchesPrice && matchesEngine;
      });
    });

    const averagePrice = computed(() => {
      if (!selectedMotorcycle.value) return 0;
      const history = priceHistory.value.filter(
        item => item.motorcycleId === selectedMotorcycle.value.id
      );
      if (history.length === 0) return selectedMotorcycle.value.price;
      return Math.round(history.reduce((total, item) => total + item.price, 0) / history.length);
    });

    const lowestPrice = computed(() => {
      if (!selectedMotorcycle.value) return 0;
      const history = priceHistory.value.filter(
        item => item.motorcycleId === selectedMotorcycle.value.id
      );
      if (history.length === 0) return selectedMotorcycle.value.price;
      return Math.min(...history.map(item => item.price), selectedMotorcycle.value.price);
    });

    const highestPrice = computed(() => {
      if (!selectedMotorcycle.value) return 0;
      const history = priceHistory.value.filter(
        item => item.motorcycleId === selectedMotorcycle.value.id
      );
      if (history.length === 0) return selectedMotorcycle.value.price;
      return Math.max(...history.map(item => item.price), selectedMotorcycle.value.price);
    });

    onMounted(fetchData);

    return {
      motorcycles,
      selectedBrand,
      priceRange,
      selectedEngineSize,
      selectedMotorcycle,
      isLoading,
      error,
      brands,
      engineSizes,
      filteredMotorcycles,
      averagePrice,
      lowestPrice,
      highestPrice,
      handleImageError,
      formatCurrency,
      resetFilters,
      showPriceHistory
    };
  }
}).mount('#app');