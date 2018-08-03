
const handleProfileGet = (knex) => (req, res) => {
	const {id} = req.params;
	knex.select('*').from('users').where({id})
	.then(user => {
		if(user.length) {
			res.json(user[0])
		} else { res.status(400).json('User not found') }
	}).catch(err => res.status(400).json('User not found'))
}

module.exports = {handleProfileGet: handleProfileGet}