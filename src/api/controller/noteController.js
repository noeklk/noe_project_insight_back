const Note = require('../model/noteModel');
const Module = require('../model/moduleModel');
const User = require('../model/userModel');

const errorMessage = 'Erreur Serveur';

exports.CreateANoteOnModuleIdAndStudentId = (req, res) => { // ++
    let new_note = new Note(req.body);
    const { id_module } = req.params;
    const { id_etudiant } = req.params;
    new_note.id_module = id_module;
    new_note.id_etudiant = id_etudiant;


    try {
        User.find({ _id: id_etudiant, role: 'etudiant' }, (error, users) => {

            if (users.length) {

                Module.findById(id_module, (error, users) => {

                    if (!error && users) {

                        new_note.save((error, notes) => {

                            if (!error && notes) {
                                res.status(201);
                                res.json(notes);
                            } else {
                                res.status(400);
                                console.log(error);
                                res.json({ message: 'Il manque des informations' });
                            }
                        });
                    } else {
                        res.status(400);
                        console.log(error);
                        res.json({ message: `L'id du module: ${id_module} est introuvable` });
                    }
                });
            } else {
                res.status(400);
                console.log(error);
                res.json({ message: `L'id de l'etudiant: ${id_etudiant} est introuvable` });
            }
        })
    } catch (e) {
        res.status(500);
        res.json({ message: errorMessage })
    }
};


exports.GetAllNotesByModuleId = (req, res) => {// ++
    const { id_module } = req.params;

    try {
        Module.findById(id_module, (error, modules) => {
            if (!error && modules) {
                console.log(modules);
                Note.find({ id_module }, (error, notes) => {
                    if (notes.length) {
                        res.status(200);
                        res.json(notes);
                    } else {
                        res.status(400);
                        console.log(error);
                        res.json({ message: `Aucune note portant pour id module: ${id_module} trouvée` });
                    }
                });
            } else {
                res.status(400);
                console.log(error);
                res.json({ message: `L'id de module: ${id_module} est introuvable` });
            }
        });
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: errorMessage });
    }
};
