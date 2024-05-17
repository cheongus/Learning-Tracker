document.getElementById('csvFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const text = event.target.result;
        const rows = text.split('\n').map(row => row.split(','));
        if (rows.length < 5) {
            console.error('CSV does not have enough rows to update the charts.');
            return;
        }

        // Labels from the second row, ignoring the first value
        const labels = rows[1].slice(1);

        // Third row for the first dataset
        const thirdRow = rows[2];
        const datasetLabel1 = thirdRow[0];
        const datasetData1 = thirdRow.slice(1).map(Number);

        // Fourth row for the second dataset
        const fourthRow = rows[3];
        const datasetLabel2 = fourthRow[0];
        const datasetData2 = fourthRow.slice(1).map(Number);

        // Fifth row for the third dataset
        const fifthRow = rows[4];
        const datasetLabel3 = fifthRow[0];
        const datasetData3 = fifthRow.slice(1).map(Number);

        updateChart('chart', labels, datasetLabel1, datasetData1, 'green');
        updateChart('chart2', labels, datasetLabel2, datasetData2, 'blue');
        updateChart('chart3', labels, datasetLabel3, datasetData3, 'red');

        document.getElementById('chartTitle').style.display = 'block';
        document.getElementById('chartTitle2').style.display = 'block';
        document.getElementById('chartTitle3').style.display = 'block';
    };

    reader.readAsText(file);
});

function updateChart(chartId, labels, datasetLabel, datasetData, borderColor) {
    const chartUrl = `https://quickchart.io/chart?c={type:'line',data:{labels:${JSON.stringify(labels)},datasets:[{label:'${datasetLabel}',data:${JSON.stringify(datasetData)},fill:false,borderColor:'${borderColor}'}]}}`;
    const chartElement = document.getElementById(chartId);
    chartElement.src = chartUrl;
    chartElement.style.display = 'block'; // Make the chart visible
}

