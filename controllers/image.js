const Clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey: 'c327f8406bb64d5aa4ae488fa9730973'
});

const handleImage = (knex) => (req, res) => {
	const {id} = req.body;
	knex('users').where('id','=', id).increment('entries', 1).returning('entries').then(entries => res.json(entries[0]))
	.catch(err => res.status(400).json('unable to get entries'));
}

const handleAPICall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with API'))
}

module.exports = {handleImage, handleAPICall}