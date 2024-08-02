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
    const minion = req.body
    
    const isCorrectType = typeof minion.name === 'string' &&
                          typeof minion.title === 'string' &&
                          typeof minion.weaknesses === 'string' &&
                          typeof minion.salary === 'number';
    
    const isValid = minion.salary >= 0;

    if(isCorrectType && isValid) {
        addToDatabase('minions', minion)
        res.status(201).send(minion)
    } else {
        res.status(400).send("Incorrect Information")
    }
})

apiRouter.get('/minions/:minionId', (req, res, next) => {
    const minionId = req.params.minionId
    const minion = getFromDatabaseById('minions', minionId)

    if (minion){
        res.status(200).send(minion)
    } else {
        res.status(404).send('Minion not found')
    }
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
