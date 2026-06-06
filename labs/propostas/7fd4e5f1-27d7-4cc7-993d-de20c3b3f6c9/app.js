$(function () {
    $.ajax({
        url: 'db.json',
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            // console.log('success', response);

            tableRows = response.services.items;
            showNewPrice = response.services.showNewPrice;
            installments = response.payments.items;
            discount = response.payments.discount;
            showPriceTable();

            holidays = response.chart.holidays;
            tasks = response.chart.tasks.items;

            if (response.chart.useNextDateOnInitialDate) {
                currentDate = new Date();
                initialDate = getNextDate([currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 5]);
            } else {
                initialDate = response.chart.initialDate;
            }

            chartTasks = generateTasks(initialDate, tasks);
            displayChart(chartTasks)
        },
        error: function (error) {
            console.log('error', error);
        },
    });
});
