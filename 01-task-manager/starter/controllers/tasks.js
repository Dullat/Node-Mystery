const Task = require('../models/task');
const mongoose = require('mongoose');
const asyncWrapper = require('../middleware/asyncWrapper')
const {createCustomError} = require('../errors/customError')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json({ status: 'success', data: { tasks, nbHabits: tasks.length } })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, task });
})

const getTask = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'Invalid task ID format' });
    }
    const task = await Task.findById(id);
    if (!task) {
        return next(createCustomError("No task Found with this ID", 404))
    }
    res.status(200).json({ success: true, task });
})

const updateTask = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    
    const task = await Task.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });

    if (!task) {
        const error = new Error('No task with this ID...')
        error.status = 404
        return next(error)
    }

    res.status(200).json({ success: true, task });
    res.status(500).json({ msg: error.message })
})

const editTask = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'Invalid task ID format' });
    }

    try {
        const task = await Task.findOneAndReplace({ _id: id }, req.body, {
            new: true,
            runValidators: true
        });

        if (!task) {
            return res.status(404).json({ msg: 'No task found to replace' });
        }

        res.status(200).json({ success: true, task, replaced: true });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const deleteTask = asyncWrapper(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'Invalid task ID format' });
    }
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
        return res.status(404).json({ msg: 'No task found to delete' });
    }
    res.status(200).json({ success: true, msg: 'Task deleted', task });
    res.status(500).json({ msg: err.message });
});

module.exports = { getAllTasks, createTask, getTask, editTask, updateTask, deleteTask }