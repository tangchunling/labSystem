var express = require('express');
var router = express.Router();
var bookings = require('../models/bookings');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

router.route('/bookings')
.post(function(req,res,next){
	var bookings_data = req.body;
	if(!bookings_data.semester || !bookings_data.week || !bookings_data.dayOfWeek || !bookings_data.classOfDay ||
	!bookings_data.lab || !bookings_data.course || !bookings_data.teacher){
		res.json({value:false,status:res.statusCode});
	}
	else{
		var Bookings = new bookings(bookings);
		Bookings.save(function(err,data){
			if(!err){
							res.json({id:data._id,value:true,status:res.statusCode});
						}
						else{
							res.json({value:false,status:res.statusCode});
						}
		});
		
	}
	
});

router.put('/bookings/:id',function(req,res,next){
	var id = req.param["id"];
	var bookings_u = req.body;
	bookings.update({_id:id},{$set:{semester:bookings_u.semester,week:bookings_u.week,dayOfWeek:bookings_u.dayOfWeek,classOfDay:bookings_u.classOfDay,lab:bookings_u.lab,
	course:bookings_u.course,teacher:bookings_u.teacher,memo:bookings_u.memo,memo:bookings_u.memo}},function(err,data){
		if(!err){
			res.json({value:true});
		}
		else{
			res.json({value:false});	
		}		
	})
});

router.delete('/bookings/:id',function(req,res,next){
	var id = req.param["id"];
	bookings.remove({_id:id},function(err){
		if(!err){
			res.json({value:true});
		}
		else{
			res.json({value:false});	
		}		
	 });
})
module.exports = router;
