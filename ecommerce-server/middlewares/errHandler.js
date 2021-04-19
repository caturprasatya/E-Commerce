const errorHandler = (err, req, res, next) =>{
    if (err.status === 400) {
        if (Array.isArray(err.errors)) {
            let errors = err.errors.map(error => error.message)

            res.status(400).json(errors)
        } else {
            res.status(400).json({ message: 'Bad Request' })
        }
    } else if(err.status === 401) {
        res.status(401).json({ message: 'Unauthorized' })
    } else if(err.status === 404) {
        res.status(404).json({ message: 'Not Found' })
    } else {
        res.status(500).json({message: err.message || 'Internal Server Error' })
    }
}

module.exports = errorHandler