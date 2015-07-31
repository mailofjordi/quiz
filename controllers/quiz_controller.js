var models =require('../models/models.js');

// GET /quizes/question
exports.question = function(req, res) {
	models.Quiz.findAll().succes(function(quiz) {
		res.render('quizes/question', {pregunta: quiz[0].pregunta });
	})
};

// GET /quizes/answer
exports.answer = function(req, res) {
	models.Quiz.findAll().succes(function(quiz) {
		if (req.query.respuesta === quiz[0].respuesta) {
			res.render('quizes/answer', {respuesta: 'correcta'});
		} else {
			res.render('quizes/answer', {respuesta: 'incorrecta'});
		}
	})
};