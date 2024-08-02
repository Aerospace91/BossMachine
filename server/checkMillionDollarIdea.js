const checkMillionDollarIdea = (req, res, next) => {
    const idea = req.body;
    idea.numWeeks = Number(idea.numWeeks)
    idea.weeklyRevenue = Number(idea.weeklyRevenue)
    if (typeof idea.numWeeks !== 'number' || typeof idea.weeklyRevenue !== 'number') {
        return res.status(400).send("numWeeks and weeklyRevenue must be numbers")
    }
    //console.log(`Idea: ${idea}`)
    //console.log(`numWeeks: ${numWeeks}`)
    //console.log(`weeklyRevenue: ${weeklyRevenue}`)
    const totalValue = idea.numWeeks * idea.weeklyRevenue;

    if (totalValue >= 1000000){
        next();
    } else {
        res.status(400).send("Idea must be worth at least one million dollars.")
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
