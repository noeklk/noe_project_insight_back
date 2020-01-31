// src/api/controllers/moduleController.js
const mongoose = require('mongoose');
const Module = require('../model/moduleModel');
// /promos/:promo_id/modules

exports.list_all_modules_from_a_session = (req, res) => {
  Module.find({session_id: req.params.session_id}, (error, modules) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."})
    }
    else{
      res.status(200);
      res.json(modules);
    }
  })
}
exports.create_a_module = (req, res) => {
  let new_module = new Module(req.body);
  new_module.session_id = req.params.session_id;
  try {
    new_module.save((error, module) => {
      if(error){
        res.status(400);
        console.log(error);
        res.json({message: "Il manque des infos"});
      }
      else{
        res.status(201);
        res.json(module)
      }
    })
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({message: "Erreur serveur"})
  }
}
exports.get_a_module = (req, res) => {
  try {
    Module.findById(req.params.module_id, (error, module) => {
      if(error){
        res.status(400);
        console.log(error);
        res.json({message: "Id introuvable"});
      }
      else{
        res.status(200);
        res.json(module)
      }
    })
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({message: "Erreur serveur"})
  }
}
exports.update_a_module = (req, res) => {
  try {
    Module.findByIdAndUpdate(req.params.module_id, req.body, {new:true}, (error, module) => {
      if(error){
        res.status(400);
        console.log(error);
        res.json({message: "Id introuvable"});
      }
      else{
        res.status(200);
        res.json(module)
      }
    })
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({message: "Erreur serveur"})
  }
}
exports.delete_a_module = (req, res) => {
  try {
    Module.findByIdAndRemove(req.params.module_id, (error) => {
      if(error){
        res.status(400);
        console.log(error);
        res.json({message: "Id introuvable"});
      }
      else{
        res.status(200);
        res.json({message: "module supprimé"})
      }
    })
  } catch (e) {
    res.status(500);
    console.log(e);
    res.json({message: "Erreur serveur"})
  }
}