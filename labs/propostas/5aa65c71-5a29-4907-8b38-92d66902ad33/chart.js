function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return [
    result.getFullYear(),
    result.getMonth(),
    result.getDate(),
  ];
}

function getNextDate(date) {
  var result = new Date(date[0], date[1], date[2]);

  if (
    result.getDay() == 6
    || result.getDay() == 0
    // || result.getDay() == 1
    // || result.getDay() == 2
    || holidays.indexOf([result.getFullYear(), result.getMonth() + 1, result.getDate()].join('-')) !== -1
  ) {
    date[2]++;
    return getNextDate(date);
  }

  return [
    result.getFullYear(),
    result.getMonth(),
    result.getDate(),
    result.getDay() + 1,
  ];
}

function generateTasks(initialDate, tasks) {
  var chartTasks = [];

  for (var i in tasks) {
    var task = tasks[i];

    if (!task.initial) {
      if (!task.dependence)
        task.initial = getNextDate(initialDate);
      else if (typeof tasks[task.dependence] !== 'undefined')
        task.initial = getNextDate(tasks[task.dependence].final);
      else
        task.initial = getNextDate(initialDate);
    }

    if (task.rest) {
      task.initial[2] += task.rest;
      task.initial = getNextDate(task.initial);
    }

    if (task.initial) {
      task.final = [task.initial[0], task.initial[1], task.initial[2]];
      for (var j = 0; j < task.duration; j++) {
        task.final = getNextDate([task.final[0], task.final[1], task.final[2] + 1]);
      }
    }

    chartTasks.push([
      task.id,
      task.tag,
      task.resource,
      new Date(task.initial[0], task.initial[1], task.initial[2]),
      new Date(task.final[0], task.final[1], task.final[2]),
      null,
      task.complete,
      task.dependence,
    ]);
  }

  return chartTasks;
}

function displayChart(chartTasks) {

  $('#loadingSchedule').addClass('hide');
  $('#contentSchedule').removeClass('hide');

  google.charts.load('current', { 'packages': ['gantt', 'table', 'timeline'], 'language': 'pt' });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {

    // var chartData = new google.visualization.DataTable();
    // chartData.addColumn('string', 'ID');
    // chartData.addColumn('string', 'Tarefa');
    // chartData.addColumn('string', 'Resource');
    // chartData.addColumn('date', 'Início');
    // chartData.addColumn('date', 'Fim');
    // chartData.addColumn('number', 'Duração');
    // chartData.addColumn('number', 'Completo (%)');
    // chartData.addColumn('string', 'Dependências');

    // chartData.addRows(chartTasks);

    // var chart = new google.visualization.Gantt(document.getElementById('chart_div'));
    // chart.draw(chartData, {
    //   height: 700,
    //   gantt: {
    //     // criticalPathEnabled: false,
    //     arrow: {
    //       // angle: 100,
    //       // width: 2,
    //       // color: '#2b6cb0',
    //       // radius: 0,
    //     },
    //   },
    // });



    // Tabela
    var tableData = new google.visualization.DataTable();
    tableData.addColumn('string', 'Tarefa');
    tableData.addColumn('date', 'Início');
    tableData.addColumn('date', 'Fim');

    tableData.addRows(chartTasks.map(item => {
      return [
        item[1],
        item[3],
        item[4],
      ]
    }));

    var table = new google.visualization.Table(document.getElementById('chart_div2'));
    table.draw(tableData, {showRowNumber: true, width: '100%', height: '100%'});



    // Timeline
    var container = document.getElementById('chart_div3');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();

    // dataTable.addColumn({ type: 'string', id: 'Term' });
    dataTable.addColumn({ type: 'string', id: 'Tarefa' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });

    // var timelineIndex = 0

    const timelineData = chartTasks.map(item => {
      return [
        // String(++timelineIndex),
        item[1],
        item[3],
        item[4],
      ]
    })

    /**/console.log('timelineData', timelineData)

    dataTable.addRows(timelineData);

    chart.draw(dataTable, {
      height: 700,
      width: '100%',
      timeline: {
        // groupByRowLabel: true,
        // showBarLabels: false,
        // showRowLabels: false,
        // colorByRowLabel: true
        singleColor: '#2b8fac'
        // singleColor: '#e76600'
      },
      // avoidOverlappingGridLines: false
    });
  }
}

var holidays = [];

var tasks = {};

var currentDate = null;
var initialDate = null;
var chartTasks = null;
