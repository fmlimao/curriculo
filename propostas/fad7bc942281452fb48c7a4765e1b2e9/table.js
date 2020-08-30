$(function () {
    var tableRows = [

        [
            'Planejamento',
            '<p>Elaboração de proposta para o projeto</p>',
            2,
            0,
            'services',
            2,
        ],

        [
            'Desenvolvimento do Site',
            '<p>Criação da identidade visual (logomarca, layout, fontes, imagens, etc)</p>',
            7,
            500,
            'site',
            0,
        ],

        [
            'Desenvolvimento do Site',
            `<p> Codificação completa do site em linguagem de programação (html/css/php) compatível com os principais navegadores</p>
            <p>Configuração do gerenciador de conteúdo (WordPress) para a Galeria de Fotos e Página Inicial</p>`,
            20,
            1800,
            'site',
            0,
        ],

        [
            'Desenvolvimento do Sistema',
            `<p>Criação do painel adminstrativo</p>
            <p>Criação dos todos os móludos</p>
            <p>Codificação em linguagem programação compatível com os principais navegadores</p>`,
            37,
            12000,
            'system',
            37,
        ],

        [
            'Implantação',
            '<p>Contratação do serviço de hospedagem + Publicação do site na hospedagem contratada</p>',
            2,
            0,
            'services',
            2,
        ],

        [
            'Entrega',
            '<p>Criação de conta no Analytics para monitorar visitantes + treinamento da ferramenta</p>',
            2,
            0,
            'services',
            2,
        ],

    ];

    var totals = {
        site: [0, 0, 0],
        system: [0, 0, 0],
        services: [0, 0, 0],
        general: [0, 0, 0],
    };

    $tableInvestment = $('#tableInvestment');
    $tbody = $tableInvestment.find('tbody');

    $tbody.empty();
    for (var i in tableRows) {
        var row = tableRows[i];


        $tr = $(`<tr>
            <td>
                ${row[0]}
                </td>
            <td>
                ${row[1]}
            </td>
            <td class="text-right" nowrap>
                ${row[2]}
            </td>
            <td class="text-right" nowrap>
                ${number_format(row[3], 2, ',', '.')}
            </td>
        </tr>`);

        totals[row[4]][0] += row[2];
        totals[row[4]][1] += row[3];
        totals[row[4]][2] += row[5];

        totals.general[0] += row[2];
        totals.general[1] += row[3];
        totals.general[2] += row[5];

        $tbody.append($tr);
    }


    $tbody.append(`
        <tr>
            <th colspan="2">
                SUB TOTAL SITE
            </th>
            <th class="text-right" nowrap>
                ${totals.site[0]} dias <span class="text-danger">*</span>
            </th>
            <th class="text-right" nowrap>
                ${number_format(totals.site[1], 2, ',', '.')}
            </th>
        </tr>
        <tr>
            <th colspan="2">
                SUB TOTAL SISTEMA
            </th>
            <th class="text-right" nowrap>
                ${totals.system[0]} dias <span class="text-danger">*</span>
            </th>
            <th class="text-right" nowrap>
                ${number_format(totals.system[1], 2, ',', '.')}
            </th>
        </tr>
        <tr>
            <th colspan="2">
                SUB TOTAL SERVIÇOS
            </th>
            <th class="text-right" nowrap>
                ${totals.services[0]} dias
            </th>
            <th class="text-right" nowrap>
                ${number_format(totals.services[1], 2, ',', '.')}
            </th>
        </tr>
        <tr class="color-blue">
            <th colspan="2">
                TOTAL
            </th>
            <th class="text-right" nowrap>
                ${totals.general[2]} dias
            </th>
            <th class="text-right" nowrap>
                ${number_format(totals.general[1], 2, ',', '.')}
            </th>
        </tr>
    `);

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