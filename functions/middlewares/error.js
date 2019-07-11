module.exports = (err, req, res, next) => {
  if (err.message === 'abc') return res.status(403).send('auth failed')
  res.send(err.message)
}
