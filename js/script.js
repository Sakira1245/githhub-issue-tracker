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

const displayIssues = (issues) => {
    manageSpinner(false);
    const container = document.getElementById('case-container');
    container.innerHTML = ""; //it will filter the open and close cases inside the container
    issues.forEach(issue => {

        // img change based on issue status
        let imgSrc = "";

        if (issue.status === "open") {
            imgSrc = "assets/Open-Status.png";
        } else {
            imgSrc = "assets/Closed.png";
        }
        // flex grow is used here in line 50 for the border to stay position same on all cards

        container.innerHTML += `<div onclick="loadIssueDetail(${issue.id})" class="cases border-t-4 ${issue.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]"} p-4 bg-white shadow-sm rounded-lg flex flex-col gap-3 cursor-pointer">

                    <!-- Top Section -->
                    <div class="border-b border-[#E4E4E7] pb-3 flex-grow"> 
                    
                    <div class="bar mb-3 flex justify-between items-center mt-2">
                                    <img src="${imgSrc}" alt="">
                                    <span class="bug rounded-full py-[6px] font-medium text-xs px-4 !border-none priority-${issue.priority}">${issue.priority.toUpperCase()}</span>
                                </div>
                    
                        <p class="primary-color font-semibold">
                            ${issue.title}
                        </p>

                        <p class="secondary-color text-sm mt-2">
                             ${issue.description}
                        </p>

                        <!-- Tags -->
                        <div class="flex flex-wrap gap-2 mt-2">
                            ${createElements(issue.labels)}
                        </div>
                    </div>

                    <!-- Bottom Section -->
                    <div class="flex-wrap justify-between text-sm text-gray-500">
                        <p class="secondary-color">#1 by ${issue.author}</p>
                        <p class="secondary-color mt-2">${new Date(issue.createdAt).toLocaleDateString()}</p>
                    </div>

                </div>`;
    })
}

// search functionality

document.getElementById('input-search').addEventListener('input', () => {
    const input = document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase();

    const container = document.getElementById('case-container');
    container.innerHTML = ""; //  clear UI (IMPORTANT)

    const filtered = allIssues.filter(issue =>
        issue.title.toLowerCase().includes(searchValue)
    );

    displayIssues(filtered);
    manageSpinner(false);
});
