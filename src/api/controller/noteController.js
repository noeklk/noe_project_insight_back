const Note = require('../model/noteModel');
const Module = require('../model/moduleModel');
const User = require('../model/userModel');

const errorMessage = 'Erreur Serveur';

exports.CreateANoteByStudentIdAndModuleId = (req, res) => { // ++
    let new_note = new Note(req.body);
    const { id_module } = req.params;
    const { id_etudiant } = req.params;
    new_note.id_module = id_module;
    new_note.id_etudiant = id_etudiant;

    try {
        User.find({ _id: id_etudiant, role: 'etudiant' }, (error, users) => {
            if (!error && users.length) {
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

exports.GetAllNotes = (req, res) => { // ++
    try {
        Note.find((error, notes) => {
            if (!error && notes) {
                res.status(200);
                res.json(notes);
            } else {
                res.status(400);
                console.log(error);
                res.json({ message: 'Aucune note existante' });
            }
        });
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: errorMessage });
    }
}

exports.GetANoteById = (req, res) => {
    const { id_note } = req.params;

    try {
        Note.findById(id_note, (error, notes) => {
            if (!error && notes) {
                res.status(200);
                res.json(notes);
            } else {
                res.status(400);
                console.log(error);
                res.json({ message: `Aucune note portant pour id: ${id_note} existante` });
            }
        });
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: errorMessage });
    }
}

exports.GetAllNotesByModuleId = (req, res) => { // ++
    const { id_module } = req.params;

    try {
        Note.find({ id_module }, (error, notes) => {
            if (!error && notes.length) {
                res.status(200);
                res.json(notes);
            } else {
                res.status(400);
                console.log(error);
                res.json({ message: `Aucune note portant pour id module: ${id_module} trouvée` });
            }
        });
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: errorMessage });
    }
};

exports.GetAllNotesByModuleIdAndStudentId = (req, res) => { // ++
    const { id_module } = req.params;
    const { id_etudiant } = req.params;

    try {
        Note.find({ id_module, id_etudiant }, (error, notes) => {
            if (!error && notes.length) {
                res.status(200);
                res.json(notes);
            } else {
                res.status(400);
                console.log(error);
                res.json({ message: `Aucune note portant pour id module: ${id_module} et id etudiant: ${id_etudiant} trouvée` });
            }
        });
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: errorMessage });
    }
}

exports.UpdateANoteById = (req, res) => { // ++
    const { id_note } = req.params;

    try {
        Note.findByIdAndUpdate(id_note, req.body, { new: true }, (error, notes) => {
            if (!error && notes) {
                res.status(200);
                res.json(notes);
            } else {
                res.status(400);
                console.log(error);
                res.json({ message: `L'id de note: ${id_note} n'existe pas` });
            }
        })
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: errorMessage });
    }
}

exports.UpdateANoteByModuleIdAndStudentIdAndNoteId = (req, res) => { // ++
    const { id_etudiant } = req.params;
    const { id_module } = req.params;
    const { id_note } = req.params;

    try {
        Note.findOneAndUpdate({ _id: id_note, id_etudiant, id_module }, req.body, { new: true }, (error, notes) => {
            if (!error && notes) {
                res.status(200);
                res.json(notes);
            } else {
                res.status(400);
                console.log(error);
                res.json({ message: `L'id de note: ${id_note} avec l'id etudiant: ${id_etudiant} et l'id module: ${id_module} n'existe pas` });
            }
        })
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: errorMessage });
    }
}



exports.DeleteANoteById = (req, res) => { // ++
    const { id_note } = req.params;

    try {
        Note.findByIdAndDelete(id_note, (error, notes) => {
            if (!error && notes) {
                res.status(200);
                res.json({ message: `La note avec l'id: ${id_note} a été correctement supprimé` });
            } else {
                res.status(400);
                console.log(error);
                res.json({ message: `L'id de note: ${id_note} est introuvable` });
            }
        })
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: errorMessage });
    }
}