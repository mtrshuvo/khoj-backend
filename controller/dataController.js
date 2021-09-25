const { Data } = require("../models/data");
module.exports.createData = async (req, res) => {
    try {
        const { _id } = req.user;
        let user = await Data.findOne({ user: _id });

        const newData = {
            input_data: req.body.input_data,
            timestamps: new Date(),
        };
        if (!user) {
            let userData = new Data({
                user: _id,
                payload: newData,
            });
            await userData.save();
            return res.status(201).send("Success");
        }
        //checking data string already in payload array.
        let alreadyInData = false;
        for(let i = 0; i < user.payload.length; i++){
            if (user.payload[i].input_data === req.body.input_data){
                alreadyInData = true;
                break;
            }
        }
       if(!alreadyInData){ 
        user.payload.push(newData);
        await user.save();
        return res.status(201).send("Success");
       } 
       return res.end();
           
    } catch (err) {
        console.log(err);
        return res.status(400).send("Something Wrong");
    }
};

module.exports.getData = async (req, res) => {
    let id = req.params.id;
    let data = await Data.find({ user: id }).populate({
        path: "user",
        select: "input_data",
    });
    res.status(200).json(data);
};
