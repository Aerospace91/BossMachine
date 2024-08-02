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

const validateIdea = (idea) => {
    const isCorrectType = typeof idea.name === 'string' &&
                          typeof idea.description === 'string' &&
                          typeof idea.numWeeks === 'number' &&
                          typeof idea.weeklyRevenue === 'number';
    
    const isValid = idea.numWeeks >= 0 && idea.weeklyRevenue >= 0;

    return isCorrectType && isValid
}

const validateId = (id) => {
    return !isNaN(id);
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
    if (!validateId(minionId)) {
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
    const idea = req.body

    if (validateIdea(idea)) {
        const addedIdea = addToDatabase('ideas', idea)
        res.status(201).send(addedIdea)
    } else {
        res.status(400).send("Incorrect Information")
    }
})

apiRouter.get('/ideas/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId
    const idea = getFromDatabaseById('ideas', ideaId)

    if (idea) {
        res.status(200).send(idea)
    } else {
        res.status(404).send('Idea not found')
    }
})

apiRouter.put('/ideas/:ideaId', (req, res, next) => {
    const idea = req.body
    idea.id = req.params.ideaId

    if (validateIdea(idea)) {
        const updatedIdea = updateInstanceInDatabase('ideas', idea)
        res.status(200).send(updatedIdea)
    } else {
        res.status(404).send()
    }
})

apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    if (!validateId(ideaId)) {
        return res.status(404).send("Invalid Idea ID")
    }

    const deleted = deleteFromDatabasebyId('ideas', ideaId);


    if (deleted) {
        res.status(204).send()
    } else {
        res.status(404).send("Idea not found")
    }
})

//Meeting Routes
apiRouter.get('/meetings', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    res.status(200).send(meetings)
})

apiRouter.post('/meetings', (req, res, next) => {
    const newMeeting = createMeeting()

    const addedMeeting = addToDatabase('meetings', newMeeting)
    if (addedMeeting) {
        res.status(201).send(addedMeeting)
    } else {
        res.status(400).send("Failed")
    }
})

apiRouter.delete('/meetings', (req, res, next) => {
    const deleted = deleteAllFromDatabase('meetings')
    if(deleted){
        res.status(204).send()
    } else {
        res.status(404).send("Error")
    }
})


module.exports = apiRouter;
