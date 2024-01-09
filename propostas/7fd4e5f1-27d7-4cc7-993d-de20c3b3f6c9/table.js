var tableRows = [];
var showNewPrice = true;
var installments = [];
var discount = 0;

function showPriceTable() {
  var totals = {
    site: [0, 0, 0, 0],
    system: [0, 0, 0, 0],
    services: [0, 0, 0, 0],
    general: [0, 0, 0, 0],
  };

  var totalsBySumGroup = []

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

    if (typeof totalsBySumGroup[row.sumGroup] === 'undefined') totalsBySumGroup[row.sumGroup] = 0
    totalsBySumGroup[row.sumGroup] += row.deadline

    $tbody.append($tr);
  }

  $foot1 = $(`<tr>
    <th colspan="2">
      SUB TOTAL SITE
    </th>
    <th class="text-right" nowrap>
      ${totals.site[0]} dias <span class="text-danger">**</span>
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
      ${totals.system[0]} dias <span class="text-danger">**</span>
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
      ${/* totals.general[2] */ Math.max(...totalsBySumGroup) } dias
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

  $('#loadingInvestiments').addClass('hide');
  $('#contentInvestiments').removeClass('hide');

  var totalsGeneral = totals.general[showNewPrice ? 3 : 1];

  var payments = [];

  if (discount) {
    payments.push(`À vista com ${discount * 100}% de desconto = <b>R$ ${number_format(totalsGeneral * (1 - discount), 2, ',', '.')}</b>`)
  } else {
    payments.push(`À vista por <b>R$ ${number_format(totalsGeneral, 2, ',', '.')}</b>`)
  }

  payments.push(`<b>R$ ${number_format(totalsGeneral / 2, 2, ',', '.')}</b> no aceite + <b>R$ ${number_format(totalsGeneral / 2, 2, ',', '.')}</b> na entrega`)
  // payments.push(`<b>R$ ${number_format(totalsGeneral / 3, 2, ',', '.')}</b> no aceite + <b>R$ ${number_format(totalsGeneral / 3, 2, ',', '.')}</b> na entrega + <b>R$ ${number_format(totalsGeneral / 3, 2, ',', '.')}</b> 30 dias depois`)

  for (var i in installments) {
    const installment = installments[i];

    const amounts = `${installment.first ? '1 + ' : ''}${installment.amount - (installment.first ? 1 : 0)}`
    const value = (totalsGeneral * (1 + installment.tax)) / installment.amount
    const total = value * installment.amount

    payments.push(`${amounts} de <b>R$ ${number_format(value, 2, ',', '.')}</b>${installment.tax ? ` (juros de ${installment.tax * 100}%)` : ''}, totalizando <b>R$ ${number_format(total, 2, ',', '.')}</b>`);
  }

  $listPayments = $('#listPayments');
  for (var i in payments) {
    var payment = payments[i];
    $listPayments.append(`<li>${payment}</li>`);
  }

  $('#loadingPayments').addClass('hide');
  $('#contentPayments').removeClass('hide');
}
