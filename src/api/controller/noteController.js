const Note = require('../model/noteModel');
const Module = require('../model/moduleModel');
const errorMessage = 'Erreur Serveur';

exports.GetAllNotesByModuleId = (req, res) => {
    const { id_module } = req.params;

    try {
        Module.findById(id_module, (error, modules) => {
            if (modules) {
                console.log(modules);
                Note.find({ id_module }, (error, notes) => {
                    if (notes) {
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

exports.CreateANoteOnModuleId = (req, res) => { };
