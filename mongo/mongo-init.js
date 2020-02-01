db.sessions.insertMany([
  {
    _id: 'session_1',
    nom_promo: 'mock_nom_promo_1',
    annee_promo: '2017-01-31T17:01:07.599Z'
  },
  {
    _id: 'session_2',
    nom_promo: 'mock_nom_promo_2',
    annee_promo: '2018-01-31T17:01:07.599Z'
  }
]);

db.modules.insertMany([
  { 
    _id: 'module_1',
    nom_module: 'mock_module_1',
    date_debut: '2017-01-31T17:01:07.599Z',
    date_fin: '2018-01-31T17:01:07.599Z',
    id_intervenant: 'intervenant_1',
    id_session: 'session_1'
  },
  { 
    _id: 'module_2',
    nom_module: 'mock_module_2',
    date_debut: '2018-01-31T17:01:07.599Z',
    date_fin: '2019-01-31T17:01:07.599Z',
    id_intervenant: 'intervenant_1',
    id_session: 'session_1'
  },
]);

db.users.insertMany([
  {
    _id: 'intervenant_1',
    nom: 'mock_nom_1',
    prenom: 'mock_prenom_1',
    role: 'intervenant',
    pseudo: 'mock_pseudo_1',
    password: 'mock_password_1'
  },
  {
    _id: 'intervenant_2',
    nom: 'mock_nom_2',
    prenom: 'mock_prenom_2',
    role: 'intervenant',
    pseudo: 'mock_pseudo_2',
    password: 'mock_password_2'
  },
  {
    _id: 'etudiant_1',
    nom: 'mock_nom_3',
    prenom: 'mock_prenom_3',
    role: 'etudiant',
    pseudo: 'mock_pseudo_3',
    password: 'mock_password_3'
  },
  {
    _id: 'etudiant_2',
    nom: 'mock_nom_4',
    prenom: 'mock_prenom_4',
    role: 'etudiant',
    pseudo: 'mock_pseudo_4',
    password: 'mock_password_4'
  },
  {
    _id: 'admin_1',
    nom: 'mock_nom_5',
    prenom: 'mock_prenom_5',
    role: 'admin',
    pseudo: 'mock_pseudo_5',
    password: 'mock_password_5'
  }
]);

db.notes.insertMany([
  {
    _id: 'note_1',
    note: 10,
    message: 'mock_message_1',
    id_etudiant: 'etudiant_1',
    id_module: 'module_1'
  },
  {
    _id: 'note_2',
    note: 15,
    message: 'mock_message_1',
    id_etudiant: 'etudiant_1',
    id_module: 'module_2'
  }
]);

