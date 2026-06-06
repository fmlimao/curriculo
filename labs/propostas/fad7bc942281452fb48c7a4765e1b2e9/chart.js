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

    google.charts.load('current', { 'packages': ['gantt'], 'language': 'pt' });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'ID');
        data.addColumn('string', 'Tarefa');
        data.addColumn('string', 'Resource');
        data.addColumn('date', 'Início');
        data.addColumn('date', 'Fim');
        data.addColumn('number', 'Duração');
        data.addColumn('number', 'Completo (%)');
        data.addColumn('string', 'Dependências');

        data.addRows(chartTasks);

        var options = {
            height: 700,
            gantt: {
                // criticalPathEnabled: false,
                arrow: {
                    angle: 100,
                    // width: 2,
                    // color: '#2b6cb0',
                    radius: 0,
                },
            },
        };

        var chart = new google.visualization.Gantt(document.getElementById('chart_div'));

        chart.draw(data, options);
    }
}

var holidays = [];

var tasks = {};

var currentDate = null;
var initialDate = null;
var chartTasks = null;
