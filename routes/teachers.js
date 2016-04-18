var express = require('express');
var router = express.Router();
var teachers = require('../models/teachers');
var courses = require('../models/courses')
var crypto = require('crypto');


/* GET users listing. */
router.route('/teachers')
.post(function(req, res, next) {
  var teachers_data = req.body;
  var salt = (Math.random()*1000000).toFixed(0);
  var pwd = teachers_data.password;
  	  pwd = pwd+salt;
  var md5sum = crypto.createHash('MD5');  
	  md5sum.update(pwd);  
	  pwdMD5 = md5sum.digest('hex');
      teachers_data.salt = salt;
      teachers_data.password = pwdMD5;
      Teachers = new teachers(teachers_data);
      Teachers.save(function(error,data){
      	if(!error){
			res.json({id:data._id,value:true,status:res.statusCode});
		}
		else{
			res.json({value:false,status:res.statusCode});
		}
      });
}).get(function(req,res){
	teachers.find({},function(err,data){
		if(!err){
			res.json({teachers: data,statusCode:'ok'});
		}
		else{
			res.json({statusCode:'false'});
		}
	});
});
router.put('/teachers/:id/',function(req, res, next){
	var id = req.params['id'];
	var data = req.body;
	var salt = (Math.random()*1000000).toFixed(0);
  var pwd = data.password;
  	  pwd = pwd+salt;
  var md5sum = crypto.createHash('MD5');  
	  md5sum.update(pwd);  
	  pwdMD5 = md5sum.digest('hex');
      data.salt = salt;
      data.password = pwdMD5;
	console.log(data);
	teachers.update({_id:id},{$set:{facultyId:data.facultyId,teacherName:data.teacherName,dept:data.dept,email:data.email,password:data.password,salt:data.salt,memo:data.memo,status:data.status}},function(err){
		if(!err){
			res.json({value:true});
		}
		else{
			res.json({value:false});	
		}		
	 });
})
router.delete('/teachers/:id/',function(req, res, next){
	var id = req.params['id'];
	teachers.remove({_id:id},function(err){
		if(!err){
			res.json({value:true});
		}
		else{
			res.json({value:false});	
		}		
	 });
});

router.get('/teachers/name/:teacherName/',function(req,res){
	var name = req.params['teacherName'];
	teachers.find({teacherName:name},function(err,data){
		if(!err){
			res.json({teachers: data,statusCode:'ok'});
		}
		else{
			res.json({statusCode:'false'});
		}
	})
});
router.get('/teachers/id/:facultyId/',function(req,res){
	var facultyId = req.params['facultyId'];
	teachers.find({facultyId:facultyId},function(err,data){
		if(!err){
			res.json({teachers: data,statusCode:'ok'});
		}
		else{
			res.json({statusCode:'false'});
		}
	})
});

router.get('/teachers/id/:facultyId/courses',function(req,res){
	  var facultyId = req.params['facultyId'];
	  console.log(facultyId);
	  teachers.find({facultyId:facultyId},function(err,data){
	  	if(!err){
				/*res.json({teachers: data,statusCode:'ok'});*/
				console.log(data[0]._id);
				courses.find({teacher:{$in:[data[0]._id.toString()]}},function(err,data){
					if(!err){
						res.json({courses: data,statusCode:'ok'});
					}
					else{
						res.json({statusCode:'false'});
						console.log(1)
					}
				})
			}
			else{
				res.json({statusCode:'false'});
			}
	  })
});

router.get('/teachers/id/:facultyId/semester/:semester/courses',function(req,res){
	var facultyId = req.params['facultyId'];
	var semester = req.params['semester'];
	 teachers.find({facultyId:facultyId},function(err,data){
	  	if(!err){
				/*res.json({teachers: data,statusCode:'ok'});*/
				console.log(data[0]._id);
				courses.find({teacher:{$in:[data[0]._id.toString()]},semester:semester},function(err,data){
					if(!err){
						res.json({courses: data,statusCode:'ok'});
					}
					else{
						res.json({statusCode:'false'});
						console.log(1)
					}
				})
			}
			else{
				res.json({statusCode:'false'});
			}
	 });
	
});

router.get('/teachers/id/:facultyId/semester/:semester/courses/:courseName',function(req,res){
	var facultyId = req.params['facultyId'];
	var semester = req.params['semester'];
	var courseName = req.params['courseName'];
	teachers.find({facultyId:facultyId},function(err,data){
	  	if(!err){
				/*res.json({teachers: data,statusCode:'ok'});*/
				console.log(data[0]._id);
				courses.find({teacher:{$in:[data[0]._id.toString()]},semester:semester,course:courseName},function(err,data){
					if(!err){
						res.json({courses: data,statusCode:'ok'});
					}
					else{
						res.json({statusCode:'false'});
						console.log(1)
					}
				})
			}
			else{
				res.json({statusCode:'false'});
			}
	 });
	
})

module.exports = router;
