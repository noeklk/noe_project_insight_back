const Note = require("../model/noteModel");
const Module = require("../model/moduleModel");
const User = require("../model/userModel");

const config = require("../../config");
const { errorMessage } = config;


exports.CreateANoteByStudentIdAndModuleId = async (req, res) => {
    let new_note = new Note(req.body);
    const { id_module } = req.params;
    const { id_etudiant } = req.params;
    new_note.id_module = id_module;
    new_note.id_etudiant = id_etudiant;

    try {
        await User.findOne({ _id: id_etudiant }, (error, user) => {
            if (!user) {
                return res.status(400).json({ message: "L'utilisateur n'existe pas" });
            } else if (user.role !== "etudiant") {
                return res.status(400).json({ message: "L'utilisateur n'est pas un étudiant" });
            }
        });

        await Module.findById(id_module, (error, users) => {
            if (!users) {
                return res.status(400).json({ message: "Le module n'existe pas" });
            }
        });

        await new_note.save((error, notes) => {
            if (!error && notes) {
                res.status(201);
                res.json(notes);
            } else {
                res.status(400);
                console.log(error);
                res.json({ message: "Il manque des informations" });
            }
        });

    } catch (e) {
        res.status(500);
        res.json({ message: errorMessage })
    }
};

exports.GetAllNotes = (req, res) => {
    try {
        Note.find((error, notes) => {
            if (!error && notes) {
                res.status(200);
                res.json(notes);
            } else {
                res.status(400);
                console.log(error);
                res.json({ message: "Aucune note trouvée" });
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
                res.json({ message: "Aucune note sur cet id" });
            }
        });
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: errorMessage });
    }
}

exports.GetAllNotesByModuleId = (req, res) => {
    const { id_module } = req.params;

    try {
        Note.find({ id_module }, (error, notes) => {
            if (!error && notes.length) {
                res.status(200);
                res.json(notes);
            } else {
                res.status(400);
                console.log(error);
                res.json({ message: "Acuune note trouvé sur ce module" });
            }
        });
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: errorMessage });
    }
};

exports.GetAllNotesByStudentId = async (req, res) => {
    const { id_etudiant } = req.params;

    try {
        await User.findOne({ _id: id_etudiant }, (error, user) => {
            if (!user) {
                return res.status(400).json({ message: "L'utilisateur n'existe pas" });
            } else if (user.role !== "etudiant") {
                return res.status(400).json({ message: "L'utilisateur n'est pas un étudiant" });
            }
        });

        await Note.find({ id_etudiant }, (error, notes) => {
            if (!error && notes.length) {
                res.status(200);
                res.json(notes);
            } else {
                res.status(400);
                console.log(error);
                res.json({ message: "Aucune note trouvé sur cet étudiant" });
            }
        });
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: errorMessage });
    }
};

exports.GetAllNotesByModuleIdAndStudentId = async (req, res) => {
    const { id_module } = req.params;
    const { id_etudiant } = req.params;

    try {
        await User.findOne({ _id: id_etudiant }, (error, user) => {
            if (!user) {
                return res.status(400).json({ message: "L'utilisateur n'existe pas" });
            } else if (user.role !== "etudiant") {
                return res.status(400).json({ message: "L'utilisateur n'est pas un étudiant" });
            }
        });

        await Note.find({ id_module, id_etudiant }, (error, notes) => {
            if (!error && notes.length) {
                res.status(200);
                res.json(notes);
            } else {
                res.status(400);
                console.log(error);
                res.json({ message: "Aucune note trouvée pour cette utilisateur sur ce module" });
            }
        });
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: errorMessage });
    }
}

exports.GetANoteByModuleIdAndStudentIdAndNoteId = async (req, res) => {
    const { id_module } = req.params;
    const { id_etudiant } = req.params;
    const { id_note } = req.params;

    try {
        await User.findOne({ _id: id_etudiant }, (error, user) => {
            if (!user) {
                return res.status(400).json({ message: "L'utilisateur n'existe pas" });
            } else if (user.role !== "etudiant") {
                return res.status(400).json({ message: "L'utilisateur n'est pas un étudiant" });
            }
        });

        await Note.findOne({ _id: id_note, id_module, id_etudiant }, (error, notes) => {
            if (!error && notes) {
                res.status(200);
                res.json(notes);
            } else {
                res.status(400);
                console.log(error);
                res.json({ message: "Aucune note trouvée pour cette utilisateur sur ce module" });
            }
        });
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: errorMessage });
    }
}

exports.UpdateANoteById = (req, res) => {
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

exports.UpdateANoteByModuleIdAndStudentIdAndNoteId = async (req, res) => {
    const { id_etudiant } = req.params;
    const { id_module } = req.params;
    const { id_note } = req.params;

    try {
        await User.findOne({ _id: id_etudiant }, (error, user) => {
            if (!user) {
                return res.status(400).json({ message: "L'utilisateur n'existe pas" });
            } else if (user.role !== "etudiant") {
                return res.status(400).json({ message: "L'utilisateur n'est pas un étudiant" });
            }
        });

        await Note.findOneAndUpdate({ _id: id_note, id_etudiant, id_module }, req.body, { new: true }, (error, notes) => {
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

exports.DeleteANoteByModuleIdAndStudentIdAndNoteId = async (req, res) => {
    const { id_etudiant } = req.params;
    const { id_module } = req.params;
    const { id_note } = req.params;

    try {
        await User.findOne({ _id: id_etudiant }, (error, user) => {
            if (!user) {
                return res.status(400).json({ message: "L'utilisateur n'existe pas" });
            } else if (user.role !== "etudiant") {
                return res.status(400).json({ message: "L'utilisateur n'est pas un étudiant" });
            }
        });

        await Note.findOneAndDelete({ _id: id_note, id_etudiant, id_module }, req.body, { new: true }, (error, notes) => {
            if (!error && notes) {
                res.status(200);
                res.json({ message: "Note supprimé avec succès" });
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

exports.DeleteANoteById = (req, res) => {
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