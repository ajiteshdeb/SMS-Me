module.exports = function(app,router,config,client){
    router.get('/', (req, res) => res.render('index'));

    router.post('/', (req,res)=>{
        let toNumber = req.body.number;
        let text = req.body.text;
        const messageStatus = req.body.MessageStatus;
        

            //Send SMS
            client.messages.create({
            from: config.twilio.twiliophoneNumber,
            to: toNumber,
            body: text
            }, function(err, message) {
                if(err) {
                    console.error(err.message);
                }else{
                    console.log(`Message Sent to ${toNumber}`);
                }
            });

    });
    
	router.use((req, res) =>{
		res.status(404);
		res.render('404');
	});

};


