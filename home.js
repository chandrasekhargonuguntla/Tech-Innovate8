function signUp() {
    alert("Welcom to Tech Innovate! Stay tuned for updates.");
}

function search() {
    const query = document.getElementById('searchBar').value;
    if (query) {
        alert(`Searching for: ${query}`);
    } else {
        alert("Please enter a search query.");
    }
}

