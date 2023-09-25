exports.groupDataByDate = (data) => {
  const groupedData = {};

  data.forEach((item) => {
    const date = `${item.task_month} ${item.task_year}`;
    if (!groupedData[date]) {
      groupedData[date] = {
        date: `${item.task_month} ${item.task_year}`,
        metrics: {
          open_tasks: 0,
          inprogress_tasks: 0,
          completed_tasks: 0
        }
      };
    }

    // Update the metrics based on the status
    switch (item.status) {
      case 'open':
        groupedData[date].metrics.open_tasks += item.task_count;
        break;
      case 'inprogress':
        groupedData[date].metrics.inprogress_tasks += item.task_count;
        break;
      case 'completed':
        groupedData[date].metrics.completed_tasks += item.task_count;
        break;
    }
  });

  return Object.values(groupedData);
}

exports.getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // Create the formatted date string
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}