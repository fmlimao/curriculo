$(function () {
    var tableRows = [

        {
            fase: 'Planejamento',
            description: '<p>Elaboração de proposta para o projeto</p>',
            deadline: 2,
            price: 0,
            type: 'services',
            realDeadline: 2,
            newPrice: 0,
        },

        {
            fase: 'Desenvolvimento do Site',
            description: '<p>Criação da identidade visual (logomarca, layout, fontes, imagens, etc)</p>',
            deadline: 7,
            price: 500,
            type: 'site',
            realDeadline: 0,
            newPrice: 300,
        },

        {
            fase: 'Desenvolvimento do Site',
            description: `<p> Codificação completa do site em linguagem de programação (html/css/php) compatível com os principais navegadores</p><p>Configuração do gerenciador de conteúdo (WordPress) para a Galeria de Fotos e Página Inicial</p>`,
            deadline: 20,
            price: 1800,
            type: 'site',
            realDeadline: 0,
            newPrice: 1500,
        },

        {
            fase: 'Desenvolvimento do Sistema',
            description: `<p>Criação do painel adminstrativo</p><p>Criação dos todos os móludos</p><p>Codificação em linguagem programação compatível com os principais navegadores</p>`,
            deadline: 37,
            price: 15540,
            type: 'system',
            realDeadline: 37,
            newPrice: 12210,
        },

        {
            fase: 'Implantação',
            description: '<p>Contratação do serviço de hospedagem + Publicação do site na hospedagem contratada</p>',
            deadline: 2,
            price: 0,
            type: 'services',
            realDeadline: 2,
            newPrice: 0,
        },

        {
            fase: 'Entrega',
            description: '<p>Criação de conta no Analytics para monitorar visitantes + treinamento da ferramenta</p>',
            deadline: 2,
            price: 0,
            type: 'services',
            realDeadline: 2,
            newPrice: 0,
        },

    ];

    var showNewPrice = true;

    var totals = {
        site: [0, 0, 0, 0],
        system: [0, 0, 0, 0],
        services: [0, 0, 0, 0],
        general: [0, 0, 0, 0],
    };

    $tableInvestment = $('#tableInvestment');
    $thead = $tableInvestment.find('thead');
    $tbody = $tableInvestment.find('tbody');

    $tbody.empty();

    if (showNewPrice) {
        $thead.find('tr').append(`<th>Novo Valor (R$)</td>`);
    }

    for (var i in tableRows) {
        var row = tableRows[i];


        $tr = $(`<tr>
            <td>
                ${row.fase}
            </td>
            <td>
                ${row.description}
            </td>
            <td class="text-right" nowrap>
                ${row.deadline}
            </td>
            <td class="text-right ${showNewPrice ? 'text-danger' : ''}" style="${showNewPrice ? 'text-decoration: line-through;' : ''}" nowrap>
                ${number_format(row.price, 2, ',', '.')}
            </td>
        </tr>`);

        if (showNewPrice) {
            $tr.append($(`<td class="text-right" nowrap>
                ${number_format(row.newPrice, 2, ',', '.')}
            </td>`));
        }

        totals[row.type][0] += row.deadline;
        totals[row.type][1] += row.price;
        totals[row.type][2] += row.realDeadline;
        totals[row.type][3] += row.newPrice;

        totals.general[0] += row.deadline;
        totals.general[1] += row.price;
        totals.general[2] += row.realDeadline;
        totals.general[3] += row.newPrice;

        $tbody.append($tr);
    }

    $foot1 = $(`<tr>
        <th colspan="2">
            SUB TOTAL SITE
        </th>
        <th class="text-right" nowrap>
            ${totals.site[0]} dias <span class="text-danger">*</span>
        </th>
        <th class="text-right ${showNewPrice ? 'text-danger' : ''}" style="${showNewPrice ? 'text-decoration: line-through;' : ''}" nowrap>
            ${number_format(totals.site[1], 2, ',', '.')}
        </th>
    </tr>`);

    if (showNewPrice) {
        $foot1.append(`<th class="text-right" nowrap>
            ${number_format(totals.site[3], 2, ',', '.')}
        </th>`);
    }

    $foot2 = $(`<tr>
        <th colspan="2">
            SUB TOTAL SISTEMA
        </th>
        <th class="text-right" nowrap>
            ${totals.system[0]} dias <span class="text-danger">*</span>
        </th>
        <th class="text-right ${showNewPrice ? 'text-danger' : ''}" style="${showNewPrice ? 'text-decoration: line-through;' : ''}" nowrap>
            ${number_format(totals.system[1], 2, ',', '.')}
        </th>
    </tr>`);

    if (showNewPrice) {
        $foot2.append(`<th class="text-right" nowrap>
            ${number_format(totals.system[3], 2, ',', '.')}
        </th>`);
    }

    $foot3 = $(`<tr>
        <th colspan="2">
            SUB TOTAL SERVIÇOS
        </th>
        <th class="text-right" nowrap>
            ${totals.services[0]} dias
        </th>
        <th class="text-right ${showNewPrice ? 'text-danger' : ''}" style="${showNewPrice ? 'text-decoration: line-through;' : ''}" nowrap>
            ${number_format(totals.services[1], 2, ',', '.')}
        </th>
    </tr>`);

    if (showNewPrice) {
        $foot3.append(`<th class="text-right" nowrap>
            ${number_format(totals.services[3], 2, ',', '.')}
        </th>`);
    }

    $foot4 = $(`<tr class="color-blue">
        <th colspan="2">
            TOTAL
        </th>
        <th class="text-right" nowrap>
            ${totals.general[2]} dias
        </th>
        <th class="text-right ${showNewPrice ? 'text-danger' : ''}" style="${showNewPrice ? 'text-decoration: line-through;' : ''}" nowrap>
            ${number_format(totals.general[1], 2, ',', '.')}
        </th>
    </tr>`);

    if (showNewPrice) {
        $foot4.append(`<th class="text-right" nowrap>
            ${number_format(totals.general[3], 2, ',', '.')}
        </th>`);
    }

    $tbody.append($foot1);
    $tbody.append($foot2);
    $tbody.append($foot3);
    $tbody.append($foot4);

    var totalsGeneral = totals.general[1];
    var totalsGeneral5 = totalsGeneral * 1.05;
    var totalsGeneral10 = totalsGeneral * 1.10;

    var payments = [
        `R$ ${number_format(totalsGeneral / 2, 2, ',', '.')} no aceite + R$ ${number_format(totalsGeneral / 2, 2, ',', '.')} na entrega`,
        `R$ ${number_format(totalsGeneral / 3, 2, ',', '.')} no aceite + R$ ${number_format(totalsGeneral / 3, 2, ',', '.')} na entrega + R$ ${number_format(totalsGeneral / 3, 2, ',', '.')} 30 dias depois`,
        `1 + 3 de R$ ${number_format(totalsGeneral5 / 4, 2, ',', '.')} (juros de 5%)`,
        `1 + 5 de R$ ${number_format(totalsGeneral10 / 6, 2, ',', '.')} (juros de 10%)`,
    ];

    $listPayments = $('#listPayments');
    for (var i in payments) {
        var payment = payments[i];
        $listPayments.append(`<li>${payment}</li>`);
    }
});