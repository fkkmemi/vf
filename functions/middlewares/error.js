module.exports = (err, req, res, next) => {
  console.error(err.message)
  if (err.message === 'abc') return res.status(403).send('auth failed')
  res.status(500).send(err.message)
}
