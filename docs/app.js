document.getElementById('stateForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const state = document.getElementById('state').value;

    const response = await fetch('/lookup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: state })
    });

    const data = await response.json();
    document.getElementById('result').innerText = `The capital is: ${data.capital}`;
});
