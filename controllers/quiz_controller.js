var models =require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.findById(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error);});
};


// GET /quizes
exports.index = function(req, res) {
	var buscar = req.query.search || '';

	// No nos pasan nigun filtro
	if (buscar === '') {
		models.Quiz.findAll().then(
			function(quizes) {
				res.render('quizes/index', {quizes: quizes, errors: []});
			}
		);

	} else {
		// Reemplazamos los espacions por %
		// De esta forma, si busca "uno dos" ("%uno%dos%"),
		// mostrará todas las preguntas que tengan "uno" seguido de "dos",
		// independientemente de lo que haya entre "uno" y "dos".
		buscar = buscar.replace(/ /g, '%');

		models.Quiz.findAll({where: ["pregunta like ?", '%' + buscar + '%'], order: 'pregunta'}).then(
			function(quizes) {
				res.render('quizes/index', {quizes: quizes, errors: []});

			}
		);		
	}
};

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz });
};

// GET /quizes//:id/answer
exports.answer = function(req, res) {
	var resultado = 'incorrecta';
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = 'correcta';
	}
	
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};