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
        user.payload.forEach(async(data)=> {
            if(data.input_data === req.body.input_data) {
                return res.end();
            }else{
                user.payload.push(newData);
                await user.save();
                return res.status(201).send("Success")
            }
        })
        
    } catch (err) {
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
