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