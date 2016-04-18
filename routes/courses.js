var express = require('express');
var router = express.Router();
var courses = require('../models/courses');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

router.route('/courses')
	.post(function(req,res,next){
		var courses_data = req.body;
		var teacher_id = req.query.teacherId;
		console.log(teacher_id);
		if(!courses_data.semester || !courses_data.course || !courses_data.software ||
		!courses_data.isOpenSourceCourse || !courses_data.courseType || !courses_data.classes || !courses_data.studentNum
		|| !courses_data.hours || !courses_data.campus){
			res.json({value:false,status:res.statusCode});
			
		}
		else{
			courses.findOne({course:courses_data.courses},function(err,data){
				if(!err && data != null)
	 			{
		 				res.json({value:false,status:res.statusCode});
	 			}
	 			else{	
	 				var Courses = new courses(courses_data);
						Courses.save(function(error,data){
				      	if(!error){
				      		courses.update({_id:data._id},{$push:{teacher:teacher_id}},function(err){
				      			console.log("1");
				      		});
									res.json({id:data._id,value:true,status:res.statusCode});
								}
								else{
									res.json({value:false,status:res.statusCode});
								}
				      });
	 			}
			})
		}
		
	})
	.get(function(req,res){
		courses.find({},function(err,data){
		if(!err){
			res.json({courses: data,statusCode:'ok'});
		}
		else{
			res.json({statusCode:'false'});
		}
	});
	});

module.exports = router;
