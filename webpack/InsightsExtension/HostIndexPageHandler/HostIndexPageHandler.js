const HostIndexPageHandler = () => {
  const table = document.querySelector('#content > table');
  const thead = table.children[0];
  const tbody = table.children[1];
  const theadRow = thead.firstElementChild;
  const insightsTableIndex = 3;

  theadRow.insertAdjacentHTML(
    'beforeend',
    '<th classname="ca"><a>Insights</a></th>'
    // insightsTDHead
    // theadRow.cells[insightsTableIndex]
  );

  const rows = [...tbody.children];
  rows.forEach((row, rowIndex) => {
    const hostName = row.cells[2].innerText.trim();
    tbody.children[rowIndex].insertAdjacentHTML(
      'beforeend',
      `<td><span>zzz${hostName}zzz</span></th>`
    );
    // tbody.children[rowIndex].insertBefore(
    //   tdNode,
    //   row.cells[insightsTableIndex]
    // );
  });
};

export default HostIndexPageHandler;
