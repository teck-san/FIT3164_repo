// Code using $ as usual goes here.

const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'line',
    data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
    }]
    },
    options: {
        
    responsive: true,
    scales: {
        y: {
        beginAtZero: true
        }
    }
    }
});



const ctx2 = document.getElementById('myChart2');

new Chart(ctx2, {
    type: 'bar',
    data: {
    labels: ['dog', 'cat', 'fish', 'lion', 'whale', 'monkey'],
    datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
    }]
    },
    options: {
        
    responsive: true,
    scales: {
        y: {
        beginAtZero: true
        }
    }
    }
});



const ctx3 = document.getElementById('myChart3');

new Chart(ctx3, {
    type: 'bar',
    data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
    }]
    },
    options: {
        
    responsive: true,
    scales: {
        y: {
        beginAtZero: true
        }
    }
    }
});








