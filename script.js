// ==========================================
// DATA
// ==========================================

const insuranceCompanies = [
    {
        name: "Orient Insurance",
        value: "orient"
    },
    {
        name: "Abu Dhabi National Insurance Company (ADNIC)",
        value: "adnic"
    },
    {
        name: "Sukoon Insurance (formerly Oman Insurance)",
        value: "sukoon"
    },
    {
        name: "Dubai Insurance Company",
        value: "dubai-insurance"
    },
    {
        name: "Liva Insurance (formerly RSA)",
        value: "liva"
    },
    {
        name: "National General Insurance (NGI)",
        value: "ngi"
    },
    {
        name: "Al Ain Ahlia Insurance",
        value: "al-ain-ahlia"
    },
    {
        name: "Emirates Insurance Company",
        value: "emirates-insurance"
    }
];


const networks = [
    {
        name: "GN PLUS",
        file: "GN-PLUS.xlsx"
    },
    {
        name: "GN",
        file: "GN.xlsx"
    },
    {
        name: "RNE",
        file: "RNE.xlsx"
    },
    {
        name: "RN",
        file: "RN.xlsx"
    },
    {
        name: "RN2",
        file: "RN2.xlsx"
    },
    {
        name: "RN3",
        file: "RN3.xlsx"
    },
    {
        name: "PCP",
        file: "PCP.xlsx"
    },
    {
        name: "PCP-C",
        file: "PCP-C.xlsx"
    },
    {
        name: "PCP-AUH",
        file: "PCP-AUH.xlsx"
    },
    {
        name: "PCP DENTAL",
        file: "PCP-DENTAL.xlsx"
    },
    {
        name: "SEHA PROVIDERS",
        file: "SEHA-PROVIDERS.xlsx"
    },
    {
        name: "TPA-PHM",
        file: "TPA-PHM.xlsx"
    },
    {
        name: "REGIONAL",
        file: "REGIONAL.xlsx"
    },
    {
        name: "ADNIC NETWORK ONLY",
        file: "ADNIC-NETWORK-ONLY.xlsx"
    }
];


// ==========================================
// SELECTED VALUES
// ==========================================

let selectedCompany = null;
let selectedNetwork = null;


// ==========================================
// ELEMENTS
// ==========================================

const companyDropdown =
    document.getElementById("companyDropdown");

const networkDropdown =
    document.getElementById("networkDropdown");

const companyButton =
    document.getElementById("companyButton");

const networkButton =
    document.getElementById("networkButton");

const companySearch =
    document.getElementById("companySearch");

const networkSearch =
    document.getElementById("networkSearch");

const companyOptions =
    document.getElementById("companyOptions");

const networkOptions =
    document.getElementById("networkOptions");

const downloadButton =
    document.getElementById("downloadButton");

const selectedInfo =
    document.getElementById("selectedInfo");

const selectedCompanyText =
    document.getElementById("selectedCompany");

const selectedNetworkText =
    document.getElementById("selectedNetwork");

const message =
    document.getElementById("message");


// ==========================================
// OPEN / CLOSE DROPDOWNS
// ==========================================

companyButton.addEventListener("click", function (event) {

    event.stopPropagation();

    networkDropdown.classList.remove("open");

    companyDropdown.classList.toggle("open");

    if (companyDropdown.classList.contains("open")) {

        companySearch.value = "";

        renderCompanies("");

        setTimeout(() => {
            companySearch.focus();
        }, 100);
    }
});


networkButton.addEventListener("click", function (event) {

    event.stopPropagation();

    companyDropdown.classList.remove("open");

    networkDropdown.classList.toggle("open");

    if (networkDropdown.classList.contains("open")) {

        networkSearch.value = "";

        renderNetworks("");

        setTimeout(() => {
            networkSearch.focus();
        }, 100);
    }
});


// Prevent dropdown closing when clicking inside it

document
    .querySelectorAll(".dropdown-menu")
    .forEach(menu => {

        menu.addEventListener("click", function (event) {
            event.stopPropagation();
        });

    });


// Close when clicking outside

document.addEventListener("click", function () {

    companyDropdown.classList.remove("open");

    networkDropdown.classList.remove("open");

});


// ==========================================
// RENDER COMPANIES
// ==========================================

function renderCompanies(search = "") {

    companyOptions.innerHTML = "";

    const filtered = insuranceCompanies.filter(company =>

        company.name
            .toLowerCase()
            .includes(search.toLowerCase())

    );


    if (filtered.length === 0) {

        companyOptions.innerHTML = `
            <div class="no-results">
                No company found
            </div>
        `;

        return;
    }


    filtered.forEach(company => {

        const option = document.createElement("div");

        option.className = "dropdown-option";

        if (
            selectedCompany &&
            selectedCompany.value === company.value
        ) {
            option.classList.add("selected");
        }

        option.textContent = company.name;


        option.addEventListener("click", function () {

            selectedCompany = company;

            companyButton.querySelector("span").textContent =
                company.name;

            companyDropdown.classList.remove("open");

            updateInterface();

        });


        companyOptions.appendChild(option);

    });
}


// ==========================================
// RENDER NETWORKS
// ==========================================

function renderNetworks(search = "") {

    networkOptions.innerHTML = "";

    const filtered = networks.filter(network =>

        network.name
            .toLowerCase()
            .includes(search.toLowerCase())

    );


    if (filtered.length === 0) {

        networkOptions.innerHTML = `
            <div class="no-results">
                No network found
            </div>
        `;

        return;
    }


    filtered.forEach(network => {

        const option = document.createElement("div");

        option.className = "dropdown-option";

        if (
            selectedNetwork &&
            selectedNetwork.file === network.file
        ) {
            option.classList.add("selected");
        }

        option.textContent = network.name;


        option.addEventListener("click", function () {

            selectedNetwork = network;

            networkButton.querySelector("span").textContent =
                network.name;

            networkDropdown.classList.remove("open");

            updateInterface();

        });


        networkOptions.appendChild(option);

    });
}


// ==========================================
// SEARCH
// ==========================================

companySearch.addEventListener("input", function () {

    renderCompanies(this.value);

});


networkSearch.addEventListener("input", function () {

    renderNetworks(this.value);

});


// ==========================================
// UPDATE INTERFACE
// ==========================================

function updateInterface() {

    message.textContent = "";
    message.className = "";

    if (selectedCompany && selectedNetwork) {

        selectedInfo.style.display = "block";

        selectedCompanyText.textContent =
            selectedCompany.name;

        selectedNetworkText.textContent =
            selectedNetwork.name;

        downloadButton.disabled = false;

    } else {

        selectedInfo.style.display = "none";

        downloadButton.disabled = true;

    }
}


// ==========================================
// DOWNLOAD
// ==========================================

downloadButton.addEventListener("click", async function () {

    if (!selectedCompany || !selectedNetwork) {

        message.textContent =
            "Please select an insurance company and network.";

        message.className = "error";

        return;
    }


    const filePath =
        `./networks/${encodeURIComponent(selectedNetwork.file)}`;


    downloadButton.disabled = true;

    downloadButton.textContent =
        "Preparing Download...";


    try {

        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error("File not found");
        }

        const blob = await response.blob();

        const fileURL =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = fileURL;

        link.download =
            selectedNetwork.file;

        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(fileURL);


        message.textContent =
            "Your download has started.";

        message.className = "success";

    } catch (error) {

        message.textContent =
            "The selected network file could not be found.";

        message.className = "error";

    } finally {

        downloadButton.disabled = false;

        downloadButton.textContent =
            "Download Network File";

    }

});


// ==========================================
// INITIALIZE
// ==========================================

renderCompanies();
renderNetworks();
updateInterface();
