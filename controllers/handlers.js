const con = require('../connection')

const { groupDataByDate, getCurrentDateTime } = require('../helper/helper')


// GET ALL TASK
exports.getAllTasks = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 5;

  const offset = (page - 1) * perPage; // Calculate the offset

  const query = `SELECT * FROM infeedo LIMIT ?, ?`;

  con.query(query, [offset, perPage], (err, results) => {
    if (err) {
      console.error('Error retrieving tasks:', err);
      return res.status(500).json({ error: 'Unable to fetch tasks' });
    }

    const tasks = results;
    res.status(200).json({ tasks });
  });
}

// CREATE A TASK
exports.createTask = (req, res) => {
  let { name, status: state, date } = req.body
  if (!name) {
    return res.status(400).json({
      error: "Please provide a name to the task."
    })
  }

  if (!['open', 'inprogress', 'completed'].includes(state.toLowerCase())) {
    return res.status(400).json({
      error: "Not a valid status"
    })
  }

  if (!date) {
    date = getCurrentDateTime()
  }

  const sql = `INSERT INTO infeedo (name, status, date) VALUES ("${name}", "${state.toLowerCase()}", "${date}")`

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Unable to process the request"
      })
    }

    res.status(200).json(result)
  })
}

// UPDATE A TASK
exports.updateTask = async (req, res, id) => {
  const { name, status: state } = req.body
  const taskId = req.params.taskId

  if (state && !['open', 'inprogress', 'completed'].includes(state.toLowerCase())) {
    return res.status(400).json({
      error: "Not a valid status"
    })
  }

  let updateQuery = "UPDATE infeedo SET ";
  const updateValues = [];

  if (name) {
    updateQuery += "name = ?, ";
    updateValues.push(name);
  }

  if (state) {
    updateQuery += "status = ?, ";
    updateValues.push(state);
  }

  // Remove the trailing comma and space
  updateQuery = updateQuery.slice(0, -2);

  updateQuery += " WHERE id = ?";
  updateValues.push(taskId);

  con.query(updateQuery, updateValues, (err, result) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to update the task"
      })
    }
    console.log("result ->", result);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "No task found"
      })
    }

    res.status(200).json({
      "message": "Task has been updated."
    })
  });
}


// GET ALL TASK STATUS MONTHLY BASED
exports.getTotalTaskCountonMonth = (req, res) => {
  const query = "SELECT YEAR(ifo.date) AS task_year, MONTHNAME(ifo.date) AS task_month, ifo.status, COUNT(*) AS task_count FROM infeedo as ifo GROUP BY YEAR(ifo.date), MONTHNAME(ifo.date), ifo.status ORDER BY YEAR(ifo.date), MONTHNAME(ifo.date), ifo.status;"

  con.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        "error": "Something went wrong"
      })
    }

    const transformedData = groupDataByDate(result)
    res.status(200).json(transformedData)
  })
}


