const motorcycleApi = {
  predefinedMotorcycles: [
    {
      id: 1,
      brand: "Honda",
      model: "CG 125",
      price: 2500000,
      engineSize: 125,
      year: 2021,
      location: "Kigali",
      dealer: "Rwanda Honda Center",
      image: "https://moto-data.net/images/honda-cg-125.jpg"
    },
    {
      id: 2,
      brand: "TVS",
      model: "Apache RTR 160",
      price: 3200000,
      engineSize: 160,
      year: 2022,
      location: "Kigali",
      dealer: "TVS Rwanda",
      image: "https://imgd.aeplcdn.com/1280x720/bw/models/tvs-apache-rtr-160-4v-bs-vi-2020.jpg"
    },
    {
      id: 3,
      brand: "Bajaj",
      model: "Boxer 150",
      price: 2800000,
      engineSize: 150,
      year: 2020,
      location: "Musanze",
      dealer: "Bajaj Rwanda",
      image: "https://www.bajajauto.com/-/media/Assets/BajajAuto/Boxer150/Boxer150-Gallery-01-Desktop.ashx"
    },
    {
      id: 4,
      brand: "Suzuki",
      model: "DR 200",
      price: 3800000,
      engineSize: 200,
      year: 2022,
      location: "Huye",
      dealer: "Suzuki Rwanda",
      image: "https://www.suzukicycles.com/-/media/Suzuki-Cycles/Product/Images/2022/DR200SE/DR200SE_Blue_Studio_01.ashx"
    },
    {
      id: 5,
      brand: "Yamaha",
      model: "XTZ 125",
      price: 3100000,
      engineSize: 125,
      year: 2021,
      location: "Rubavu",
      dealer: "Yamaha Rwanda",
      image: "https://www.yamaha-motor.eu/content/dam/yamaha-motor/nmb/models/xtz125/overview/XTZ125_Studio_01.jpg"
    },
    {
      id: 6,
      brand: "Honda",
      model: "XR 250L",
      price: 4800000,
      engineSize: 250,
      year: 2022,
      location: "Kigali",
      dealer: "Rwanda Honda Center",
      image: "https://www.honda.co.jp/XR250L/images/hero01.jpg"
    },
    {
      id: 7,
      brand: "TVS",
      model: "Star City Plus",
      price: 2700000,
      engineSize: 110,
      year: 2020,
      location: "Musanze",
      dealer: "TVS Rwanda",
      image: "https://www.tvsmotor.com/-/media/Features/Star-City-Plus/Star-City-Plus-New.ashx"
    },
    {
      id: 8,
      brand: "Bajaj",
      model: "Pulsar 150",
      price: 3500000,
      engineSize: 150,
      year: 2021,
      location: "Huye",
      dealer: "Bajaj Rwanda",
      image: "https://www.bajajauto.com/-/media/Assets/BajajAuto/Pulsar150/Pulsar150-Gallery-01-Desktop.ashx"
    },
    {
      id: 9,
      brand: "Suzuki",
      model: "GSX-R150",
      price: 4200000,
      engineSize: 150,
      year: 2022,
      location: "Rubavu",
      dealer: "Suzuki Rwanda",
      image: "https://www.suzukicycles.com/-/media/Suzuki-Cycles/Product/Images/2022/GSX-R150/GSXR150_Black_Studio_01.ashx"
    },
    {
      id: 10,
      brand: "Yamaha",
      model: "YZF-R15",
      price: 4500000,
      engineSize: 150,
      year: 2022,
      location: "Kigali",
      dealer: "Yamaha Rwanda",
      image: "https://www.yamaha-motor.eu/content/dam/yamaha-motor/nmb/models/yzf-r15/overview/YZF-R15_Studio_01.jpg"
    }
  ],

  async getMotorcycles() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.predefinedMotorcycles;
  },

  async getPriceHistory(motorcycleId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const basePrice = this.predefinedMotorcycles.find(m => m.id === motorcycleId)?.price || 3000000;
    const months = 6;
    
    return Array.from({ length: months }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (months - i - 1));
      
      return {
        id: i + 1,
        motorcycleId,
        date: date.toISOString().split('T')[0],
        price: basePrice + (Math.random() * 500000 - 250000)
      };
    });
  }
};

export default motorcycleApi;