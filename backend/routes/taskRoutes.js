const express = require('express');
const router = express.Router();
let tasks = [];
router.get('/', (req,res) => res.json(tasks));
router.post('/', (req,res) => { const t = {_id: Date.now(), title: req.body.title}; tasks.push(t); res.json(t); });
router.delete('/:id', (req,res) => { tasks = tasks.filter(t => t._id != req.params.id); res.json({}); });
module.exports = router;