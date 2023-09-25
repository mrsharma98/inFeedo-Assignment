const express = require('express')
const router = express.Router()

const { getAllTasks, createTask, updateTask, getCountTaskOnStatus, getTotalTaskCountonMonth } = require('../controllers/handlers')

// Create task
router.post("/task/create", createTask)

router.get('/tasks', getAllTasks)

router.put('/task/update/:taskId', updateTask)

router.get('/task/count', getTotalTaskCountonMonth)

module.exports = router;