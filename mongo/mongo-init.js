// Sessions
db.sessions.insertMany([
  {
    _id: ObjectId("5e3609dd3a957000387b4eda"),
    nom_promo: "mock_nom_promo_1",
    annee_promo: new Date("2017"),
    created_at: Date.now.apply()
  },
  {
    _id: ObjectId("5e3609dd3a957000387b4edb"),
    nom_promo: "mock_nom_promo_2",
    annee_promo: new Date("2018"),
    created_at:  Date.now.apply()
  },
  {
    _id: ObjectId("5e3659dd3a957000387b4edb"),
    nom_promo: "mock_nom_promo_3",
    annee_promo: new Date("2019"),
    created_at: Date.now.apply()
  }
]);

// Modules
db.modules.insertMany([
  {
    _id: ObjectId("5e3609dd3a957000387b4edc"),
    nom_module: "mock_module_1",
    date_debut: new Date("2017-01-01"),
    date_fin: new Date("2017-06-01"),
    id_intervenant: "5e3609dd3a957000387b4ede",
    id_session: "5e3609dd3a957000387b4eda",
    created_at: Date.now.apply()
  },
  {
    _id: ObjectId("5e3609dd3a957000387b4edd"),
    nom_module: "mock_module_2",
    date_debut: new Date("2017-06-01"),
    date_fin: new Date("2017-12-01"),
    id_intervenant: "5e3609dd3a957000387b4ede",
    id_session: "5e3609dd3a957000387b4eda",
    created_at: Date.now.apply()
  },
]);

// Utilisateurs
db.users.insertMany([
  // Intervenant
  {
    _id: ObjectId("5e3609dd3a957000387b4ede"),
    nom: "mock_nom_1",
    prenom: "mock_prenom_1",
    role: "intervenant",
    pseudo: "mock_pseudo_1",
    password: "$2a$10$zInvz8bjJCBXR9CkQw7q7O6UKQVqgrmrSLR48fS09FO7VdAWnDCn6",
    created_at: Date.now.apply()
  },
  {
    _id: ObjectId("5e3609dd3a957000387b4edf"),
    nom: "mock_nom_2",
    prenom: "mock_prenom_2",
    role: "intervenant",
    pseudo: "mock_pseudo_2",
    password: "mock_password_2",
    created_at: Date.now.apply()
  },
  // Etudiant
  {
    _id: ObjectId("5e3609dd3a957000387b4eef"),
    nom: "mock_nom_3",
    prenom: "mock_prenom_3",
    role: "etudiant",
    pseudo: "mock_pseudo_3",
    password: "mock_password_3",
    created_at: Date.now.apply()
  },
  {
    _id: ObjectId("5e3609dd3a957000387b4eff"),
    nom: "mock_nom_4",
    prenom: "mock_prenom_4",
    role: "etudiant",
    pseudo: "mock_pseudo_4",
    password: "mock_password_4",
    created_at: Date.now.apply()
  },
  // Admin
  {
    _id: ObjectId("5e3609dd3a957000387b4fff"),
    nom: "mock_nom_5",
    prenom: "mock_prenom_5",
    role: "admin",
    pseudo: "admin",
    password: "$2a$10$uDlj0JXL9AUp6ZJkTesOt.qYf5KUzITch6T8CEP0my0lgOCRpGHh6", // mdp = admin
    created_at: Date.now.apply()
  }
]);

// Notes
db.notes.insertMany([
  {
    _id: ObjectId("5e3609dd3a957000387b5fff"),
    note: 10,
    message: "mock_message_1",
    id_etudiant: "5e3609dd3a957000387b4eef",
    id_module: "5e3609dd3a957000387b4edc",
    created_at: Date.now.apply()
  },
  {
    _id: ObjectId("5e3609dd3a957000387b6fff"),
    note: 15,
    message: "mock_message_1",
    id_etudiant: "5e3609dd3a957000387b4eef",
    id_module: "5e3609dd3a957000387b4edd",
    created_at: Date.now.apply()
  }
]);

