const dbToken = process.env.DB_TOKEN

module.exports = async (req, res) => {
  const data = {
    message: 'Custom json message.',
  }

  return data;
}
