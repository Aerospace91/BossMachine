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

const validateMinion = (minion) => {
    const isCorrectType = typeof minion.name === 'string' &&
                          typeof minion.title === 'string' &&
                          typeof minion.weaknesses === 'string' &&
                          typeof minion.salary === 'number';
    
    const isValid = minion.salary >= 0;

    return isCorrectType && isValid
}

const validateMinionId = (minionId) => {
    return !isNaN(minionId);
}

//Minions Routes
apiRouter.get('/minions', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    res.status(200).send(minions)
})

apiRouter.post('/minions', (req, res, next) => {
    const minion = req.body

    if(validateMinion(minion)) {
        const addedMinion = addToDatabase('minions', minion)
        res.status(201).send(addedMinion)
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
    const minion = req.body
    minion.id = req.params.minionId

    if (validateMinion(minion)) {
        const updatedMinion = updateInstanceInDatabase('minions', minion)
        res.status(200).send(updatedMinion)
    } else {
        res.status(404).send()
    }
})

apiRouter.delete('/minions/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    if (!validateMinionId(minionId)) {
        return res.status(404).send("Invalid Minion ID");
    }

    const deleted = deleteFromDatabasebyId('minions', minionId);

    if (deleted) {
        res.status(204).send()
    } else {
        res.status(404).send("Minion not found")
    }
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
