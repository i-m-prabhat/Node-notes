const express = require('express');
const runWorkerTask = require('../workers');
const queue = require('../queue/queue');

const router = express.Router();

// Light route
router.get('/light', (req, res) =>
{
    res.send(`Light response 🚀 from worker ${process.pid}`);
});

// Heavy route (offload to Worker Thread)
router.get('/heavy', async (req, res) =>
{
    try
    {
        const result = await runWorkerTask(1e9);
        res.send(`Heavy result from worker ${process.pid}: ${result}`);
    } catch (err)
    {
        res.status(500).send(err.message);
    }
});

// Queue route (offload to BullMQ background worker)
router.get('/queue', async (req, res) =>
{
    const job = await queue.add('heavyTask', { num: 1e7 }); // smaller number for demo
    res.send(`Job queued with ID ${job.id} ✅`);
});

module.exports = router;
