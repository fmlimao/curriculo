var holidays = [
    '2020-9-7',
    '2020-10-12',
    '2020-11-02',
    '2020-11-15',
    '2020-12-25',
    '2020-12-31',
];

var tasks = {



    'Planning': {
        id: 'Planning',
        tag: 'Planejamento',
        initial: null,
        final: null,
        rest: 0,
        duration: 2,
        complete: 0,
        dependence: null,
        resource: 'services',
    },



    'Logo': {
        id: 'Logo',
        tag: 'Identidade Visual',
        initial: null,
        final: null,
        rest: 0,
        duration: 7,
        complete: 0,
        dependence: 'Planning',
        resource: 'logo',
    },



    'SiteInstitutional': {
        id: 'SiteInstitutional',
        tag: 'Site: Área institucional',
        initial: null,
        final: null,
        rest: 0,
        duration: 4,
        complete: 0,
        dependence: 'Logo',
        resource: 'site',
    },
    'SiteContact': {
        id: 'SiteContact',
        tag: 'Site: Área de contato',
        initial: null,
        final: null,
        rest: 0,
        duration: 4,
        complete: 0,
        dependence: 'SiteInstitutional',
        resource: 'site',
    },
    'SiteBanner': {
        id: 'SiteBanner',
        tag: 'Site: Banner rotativo',
        initial: null,
        final: null,
        rest: 0,
        duration: 4,
        complete: 0,
        dependence: 'SiteContact',
        resource: 'site',
    },
    'SiteGallery': {
        id: 'SiteGallery',
        tag: 'Site: Galeria de fotos',
        initial: null,
        final: null,
        rest: 0,
        duration: 4,
        complete: 0,
        dependence: 'SiteBanner',
        resource: 'site',
    },
    'SiteAuth': {
        id: 'SiteAuth',
        tag: 'Site: Autenticação de usuário',
        initial: null,
        final: null,
        rest: 0,
        duration: 4,
        complete: 0,
        dependence: 'SiteGallery',
        resource: 'site',
    },



    'SystemAuth': {
        id: 'SystemAuth',
        tag: 'Sistema: Autenticação e Permissões',
        initial: null,
        final: null,
        rest: 0,
        duration: 2,
        complete: 0,
        dependence: null,
        resource: 'system',
    },

    'SystemCast': {
        id: 'SystemCast',
        tag: 'Sistema: Cadastro de Elenco',
        initial: null,
        final: null,
        rest: 0,
        duration: 4,
        complete: 0,
        dependence: 'SystemAuth',
        resource: 'system',
    },

    'Filter': {
        id: 'Filter',
        tag: 'Sistema: Tela de Filtro de Elenco',
        initial: null,
        final: null,
        rest: 0,
        duration: 5,
        complete: 0,
        dependence: 'SystemCast',
        resource: 'system',
    },

    'SystemMedias': {
        id: 'SystemMedias',
        tag: 'Sistema: Cadastro de Mídias',
        initial: null,
        final: null,
        rest: 0,
        duration: 6,
        complete: 0,
        dependence: 'Filter',
        resource: 'system',
    },

    'SystemClients': {
        id: 'SystemClients',
        tag: 'Sistema: Cadastro de Clientes',
        initial: null,
        final: null,
        rest: 0,
        duration: 6,
        complete: 0,
        dependence: 'SystemMedias',
        resource: 'system',
    },

    'SystemProposals': {
        id: 'SystemProposals',
        tag: 'Sistema: Cadastro de Propostas',
        initial: null,
        final: null,
        rest: 0,
        duration: 6,
        complete: 0,
        dependence: 'SystemClients',
        resource: 'system',
    },



    'Deploy': {
        id: 'Deploy',
        tag: 'Publicação',
        initial: null,
        final: null,
        rest: 0,
        duration: 2,
        complete: 0,
        dependence: 'SystemProposals',
        resource: 'services',
    },
    'Finish': {
        id: 'Finish',
        tag: 'Analytics + Treinamento',
        initial: null,
        final: null,
        rest: 0,
        duration: 2,
        complete: 0,
        dependence: 'Deploy',
        resource: 'services',
    },



};

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

    if (result.getDay() == 6 || result.getDay() == 0 || holidays.indexOf([
        result.getFullYear(),
        result.getMonth() + 1,
        result.getDate()].join('-')) !== -1) {
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

var initialDate = [2020, 8, 8];
var chartTasks = generateTasks(initialDate, tasks);

displayChart(chartTasks)


