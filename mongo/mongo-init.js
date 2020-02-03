// Sessions
db.sessions.insertMany([
  {
    _id: ObjectId('5e3609dd3a957000387b4eda'),
    nom_promo: 'mock_nom_promo_1',
    annee_promo: '2017-01-31T17:01:07.599Z'
  },
  {
    _id: ObjectId('5e3609dd3a957000387b4edb'),
    nom_promo: 'mock_nom_promo_2',
    annee_promo: '2018-01-31T17:01:07.599Z'
  }
]);

// Modules
db.modules.insertMany([
  { 
    _id: ObjectId('5e3609dd3a957000387b4edc'),
    nom_module: 'mock_module_1',
    date_debut: '2017-01-31T17:01:07.599Z',
    date_fin: '2018-01-31T17:01:07.599Z',
    id_intervenant: '5e3609dd3a957000387b4ede',
    id_session: '5e3609dd3a957000387b4eda'
  },
  { 
    _id: ObjectId('5e3609dd3a957000387b4edd'),
    nom_module: 'mock_module_2',
    date_debut: '2018-01-31T17:01:07.599Z',
    date_fin: '2019-01-31T17:01:07.599Z',
    id_intervenant: '5e3609dd3a957000387b4ede',
    id_session: '5e3609dd3a957000387b4eda'
  },
]);

// Utilisateurs
db.users.insertMany([
  {
    _id: ObjectId('5e3609dd3a957000387b4ede'),
    nom: 'mock_nom_1',
    prenom: 'mock_prenom_1',
    role: 'intervenant',
    pseudo: 'mock_pseudo_1',
    password: 'mock_password_1'
  },
  {
    _id: ObjectId('5e3609dd3a957000387b4edf'),
    nom: 'mock_nom_2',
    prenom: 'mock_prenom_2',
    role: 'intervenant',
    pseudo: 'mock_pseudo_2',
    password: 'mock_password_2'
  },
  {
    _id: ObjectId('5e3609dd3a957000387b4eef'),
    nom: 'mock_nom_3',
    prenom: 'mock_prenom_3',
    role: 'etudiant',
    pseudo: 'mock_pseudo_3',
    password: 'mock_password_3'
  },
  {
    _id: ObjectId('5e3609dd3a957000387b4eff'),
    nom: 'mock_nom_4',
    prenom: 'mock_prenom_4',
    role: 'etudiant',
    pseudo: 'mock_pseudo_4',
    password: 'mock_password_4'
  },
  {
    _id: ObjectId('5e3609dd3a957000387b4fff'),
    nom: 'mock_nom_5',
    prenom: 'mock_prenom_5',
    role: 'admin',
    pseudo: 'mock_pseudo_5',
    password: 'mock_password_5'
  }
]);

// Notes
db.notes.insertMany([
  {
    _id: ObjectId('5e3609dd3a957000387b5fff'),
    note: 10,
    message: 'mock_message_1',
    id_etudiant: '5e3609dd3a957000387b4eef',
    id_module: '5e3609dd3a957000387b4edc'
  },
  {
    _id: ObjectId('5e3609dd3a957000387b6fff'),
    note: 15,
    message: 'mock_message_1',
    id_etudiant: '5e3609dd3a957000387b4eef',
    id_module: '5e3609dd3a957000387b4edd'
  }
]);

