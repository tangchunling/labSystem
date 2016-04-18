var express = require('express');
var router = express.Router();
var labs = require('../models/labs');
var labType = require('../models/labType');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

/*实验室*/
router.route('/labs')
.get(function(req, res) {
		labs.find({},function(err,data){
			if(!err){
				res.json({labs: data,value:true,status:res.statusCode});
			}
			else{
				res.json({});
			}
		});
})
.post(function(req,res,next){
	var lab_data = req.body;
	
	if(!lab_data.labName || !lab_data.roomNum || !lab_data.seats || !lab_data.labType){
		res.json({value:false,status:res.statusCode});
	}
	else{
		labType.findOne({labTypeName:lab_data.labType},function(err,data){
		 if(!err && data != null)
		 {
		 		lab_data.labType = data._id;
		 		lab = new labs(lab_data);
				lab.save(function(error,data){
					labType.update({_id:data.labType},{$push:{labs:data._id,}},function(err){
						
					});
					res.json({id:data._id,value:true,status:res.statusCode});
				});
		 }
		 else
		 {
		 	res.json({value:false,status:res.statusCode});
		 }
		});
	}
	
});

router.get('/labs/:id/',function(req,res){
	var id = req.params['id'];
	labs.find({_id:id},function(err,data){
			if(!err){
				res.json({labs: data,statusCode:'ok'});
			}
			else{
				res.json({});
			}
		});
});


router.delete('/labs/:id/',function(req,res,next){
	var id = req.params['id'];
	labs.remove({_id:id},function(err){
		if(!err){
			res.json({value:true});
		}
		else{
			res.json({value:false});	
		}		
	 });
});

router.put('/labs/:id/',function(req,res,next){
	var id = req.params['id'];
	var data = req.body;
	labs.update({_id:id},{$set:{labName:data.labName,roomNum:data.roomName,seats:data.seats,software:data.software,hardware:data.hardware,intro:data.intro}},function(err){
		if(!err){
			res.json({value:true});
		}
		else{
			res.json({value:false});	
		}		
	 });
});

/*实验室类型*/
router.route('/labType')
.get(function(req, res) {
		labType.find({},function(err,data){
			if(!err){
				res.json({labType: data,statusCode:'ok'});
			}
			else{
				res.json({});
			}
		});
})
.post(function(req,res,next){
	var labTypeName = req.body.labTypeName;
	if(!labTypeName){
		res.json({value:false,status:res.statusCode});
	}
	else{
		labType.find({labTypeName:labTypeName},function(err,data){
			if(!err && data.length != 0)
			{
				res.json({value:false,status:res.statusCode});
			}
		else{
				labtype = new labType(req.body);
				labtype.save(function(error,data){
						if(!error){
							res.json({id:data._id,value:true,status:res.statusCode});
						}
						else{
							res.json({value:false,status:res.statusCode});
						}
				
				});
		}
		});
		
	}
	
});

router.get('/labType/:id/',function(req,res){
	var id = req.params['id'];
	labType.find({_id:id},function(err,data){
			if(!err){
				res.json({labType: data,statusCode:'ok'});
			}
			else{
				res.json({});
			}
		});
});


router.delete('/labType/:id/',function(req,res,next){
	var id = req.params['id'];
	labType.remove({_id:id},function(err){
		if(!err){
			res.json({value:true});
		}
		else{
			res.json({value:false});	
		}		
	 });
});

router.put('/labType/:id/',function(req,res,next){
	var id = req.params['id'];
	var data = req.body;
	labType.update({_id:id},{$set:{labTypeName:data.labTypeName}},function(err){
		if(!err){
			res.json({value:true});
		}
		else{
			res.json({value:false});	
		}		
	 });
});
/*根据实验室类型查询实验室*/
router.get('/labs/lab-types/:labTypeName/',function(req,res){
	var labTypeName = req.params['labTypeName'];
	console.log(labTypeName);
	labType.findOne({labTypeName:labTypeName},function(err,data){
		if(!err){
				labs.find({_id:{$in:data.labs}},function(err,data){
					if(!err){
						
						res.json({data:data,value:true});
					}
					else{
						res.json({value:false});
					}
					
				});
		}
		else{
			res.json({value:false});
		}
	});
})



module.exports = router;
