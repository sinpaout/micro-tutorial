const dbToken = process.env.DB_TOKEN

module.exports = async (req, res) => {
  const data = {
    atricles: [{
      id: 1
    }, {
      id: 2
    }],
  }

  return data;
}

