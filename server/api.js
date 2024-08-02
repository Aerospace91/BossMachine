const express = require('express');
const apiRouter = express.Router();
const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require('./db.js');

//Minions Routes
apiRouter.get('/minions', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    res.status(200).send(minions)
})

apiRouter.post('/minions', (req, res, next) => {
    res.status(501).send("Not Implemented")
})

apiRouter.get('/minions/:minionId', (req, res, next) => {
    res.status(501).send("Not Implemented")
})

apiRouter.put('/minions/:minionId', (req, res, next) => {
    res.status(501).send("Not Implemented")
})

apiRouter.delete('/minions/:minionId', (req, res, next) => {
    res.status(501).send("Not Implemented")
})

//Ideas Routes
apiRouter.get('/ideas', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.status(200).send(ideas)
})

apiRouter.post('/ideas', (req, res, next) => {
    res.status(501).send("Not Implemented")
})

apiRouter.get('/ideas/:ideaId', (req, res, next) => {
    res.status(501).send("Not Implemented")
})

apiRouter.put('/ideas/:ideaId', (req, res, next) => {
    res.status(501).send("Not Implemented")
})

apiRouter.delete('/idea/:ideaId', (req, res, next) => {
    res.status(501).send("Not Implemented")
})

//Meeting Routes
apiRouter.get('/meetings', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    res.status(200).send(meetings)
})

apiRouter.post('/meetings', (req, res, next) => {
    res.status(501).send("Not Implemented")
})

apiRouter.delete('/meetings', (req, res, next) => {
    res.status(501).send("Not Implemented")
})


module.exports = apiRouter;
