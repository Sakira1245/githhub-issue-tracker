const manageSpinner = (status) => {
    // return true;
    if (status == true) {
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('case-container').classList.add('hidden');
    } else {
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('case-container').classList.remove('hidden');
    }
}

const loadIssues = () => {
    manageSpinner(true);
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then((res) => res.json())
        .then((json) => {
            allIssues = json.data;
            document.getElementById('total-issues').innerText = allIssues.length; //total issues count
            displayIssues(allIssues);
        });

}
loadIssues();
