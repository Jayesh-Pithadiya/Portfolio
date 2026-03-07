const loadBtn = document.getElementById('loadBtn');
const clearBtn = document.getElementById('clearBtn');
const output = document.getElementById('output');
const timestamp = document.getElementById('timestamp');

loadBtn.addEventListener('click', async () => {
    loadBtn.textContent = 'Loading...';
    loadBtn.disabled = true;

    try {
        const response = await fetch('/login/private');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Add a slight delay for better visual feedback of the transition
        setTimeout(() => {
            output.textContent = JSON.stringify(data, null, 4);
            timestamp.textContent = 'Last updated: ' + new Date().toLocaleTimeString();
            loadBtn.textContent = 'Fetch Private Data';
            loadBtn.disabled = false;
        }, 300);

    } catch (error) {
        output.textContent = 'Error: ' + error.message;
        timestamp.textContent = 'Failed to fetch';
        loadBtn.textContent = 'Retry Fetch';
        loadBtn.disabled = false;
        console.error('Fetch error:', error);
    }
});

clearBtn.addEventListener('click', () => {
    output.textContent = '// Data cleared';
    timestamp.textContent = 'No data loaded';
});
