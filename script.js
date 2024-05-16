document.getElementById('csvFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const output = document.getElementById('csvOutput');
            output.innerHTML = ''; // Clear previous contents
            const rows = e.target.result.split('\n');
            rows.forEach(row => {
                const columns = row.split(',');
                const div = document.createElement('div');
                div.textContent = columns.join(' | '); // Format and display each row
                output.appendChild(div);
            });
        };
        reader.readAsText(file);
    }
});

