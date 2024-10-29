<template>
    <div class="dashboard-container">
      <header class="dashboard-header d-flex justify-content-between align-items-center p-3">
        <h1 class="fw-bold">Tableau de bord</h1>
        <div class="actions">
          <button class="btn btn-primary">Ajouter une Salle</button>
          <button class="btn btn-secondary">Nouvelle Réservation</button>
        </div>
      </header>
      <div class="dashboard-content row p-4">
        <div class="col-md-6 col-lg-3 mb-4" v-for="card in cards" :key="card.title">
          <div class="card p-3 shadow-sm text-center">
            <h3 class="fw-bold">{{ card.title }}</h3>
            <p>{{ card.value }}</p>
          </div>
        </div>
      </div>
    </div>

    
  </template>
  
  <script setup>
  const cards = [
    { title: "Réservations Totales", value: "150" },
    { title: "Salles Disponibles", value: "30" },
    { title: "Utilisateurs Actifs", value: "75" },
    { title: "Clients", value: "120" },
  ];
  </script>
  
  <style scoped>
  .dashboard-container {
    background-color: #f4f6f8;
  }
  .dashboard-header {
    background-color: #007bff;
    color: #fff;
    border-bottom: 2px solid #0056b3;
  }
  .card {
    border-radius: 10px;
    background-color: #ffffff;
    transition: transform 0.3s ease;
  }
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  