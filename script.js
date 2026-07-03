// =====================================================
// INSURANCE COMPANIES
// =====================================================

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


// =====================================================
// TPA DATA
// =====================================================

const tpas = [

    {
        name: "NextCare",
        value: "nextcare"
    },

    {
        name: "NAS Neuron Health Services",
        value: "nas-neuron"
    },

    {
        name: "MedNet UAE",
        value: "mednet-uae"
    },

    {
        name: "FMC Network UAE",
        value: "fmc-network-uae"
    },

    {
        name: "Aafiya Medical Billing Services",
        value: "aafiya"
    },

    {
        name: "E-Care",
        value: "e-care"
    }

];

// =====================================================
// NETWORK DATA
// =====================================================

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


// =====================================================
// SELECTED VALUES
// =====================================================

let selectedCompany = null;

let selectedTpa = null;

let selectedNetwork = null;


// =====================================================
// GET ELEMENTS
// =====================================================

const companyDropdown =
    document.getElementById("companyDropdown");

const tpaDropdown =
    document.getElementById("tpaDropdown");

const networkDropdown =
    document.getElementById("networkDropdown");


const companyButton =
    document.getElementById("companyButton");

const tpaButton =
    document.getElementById("tpaButton");

const networkButton =
    document.getElementById("networkButton");


const companySearch =
    document.getElementById("companySearch");

const tpaSearch =
    document.getElementById("tpaSearch");

const networkSearch =
    document.getElementById("networkSearch");


const companyOptions =
    document.getElementById("companyOptions");

const tpaOptions =
    document.getElementById("tpaOptions");

const networkOptions =
    document.getElementById("networkOptions");


const downloadButton =
    document.getElementById("downloadButton");

const selectedInfo =
    document.getElementById("selectedInfo");


const selectedCompanyText =
    document.getElementById("selectedCompany");

const selectedTpaText =
    document.getElementById("selectedTpa");

const selectedNetworkText =
    document.getElementById("selectedNetwork");


const message =
    document.getElementById("message");


// =====================================================
// CLOSE ALL DROPDOWNS
// =====================================================

function closeAllDropdowns() {

    companyDropdown.classList.remove("open");

    tpaDropdown.classList.remove("open");

    networkDropdown.classList.remove("open");

}


// =====================================================
// COMPANY DROPDOWN
// =====================================================

companyButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        const isOpen =
            companyDropdown.classList.contains("open");

        closeAllDropdowns();


        if (!isOpen) {

            companyDropdown.classList.add("open");

            companySearch.value = "";

            renderCompanies("");

            setTimeout(() => {

                companySearch.focus();

            }, 100);

        }

    }
);


// =====================================================
// TPA DROPDOWN
// =====================================================

tpaButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        const isOpen =
            tpaDropdown.classList.contains("open");

        closeAllDropdowns();


        if (!isOpen) {

            tpaDropdown.classList.add("open");

            tpaSearch.value = "";

            renderTpas("");

            setTimeout(() => {

                tpaSearch.focus();

            }, 100);

        }

    }
);


// =====================================================
// NETWORK DROPDOWN
// =====================================================

networkButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        const isOpen =
            networkDropdown.classList.contains("open");

        closeAllDropdowns();


        if (!isOpen) {

            networkDropdown.classList.add("open");

            networkSearch.value = "";

            renderNetworks("");

            setTimeout(() => {

                networkSearch.focus();

            }, 100);

        }

    }
);


// =====================================================
// PREVENT MENU FROM CLOSING WHEN CLICKING INSIDE
// =====================================================

document
    .querySelectorAll(".dropdown-menu")
    .forEach(menu => {

        menu.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );

    });


// =====================================================
// CLOSE WHEN CLICKING OUTSIDE
// =====================================================

document.addEventListener(
    "click",
    closeAllDropdowns
);


// =====================================================
// RENDER COMPANIES
// =====================================================

function renderCompanies(search = "") {

    companyOptions.innerHTML = "";


    const filtered =
        insuranceCompanies.filter(company =>

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

        const option =
            document.createElement("div");


        option.className =
            "dropdown-option";


        if (
            selectedCompany &&
            selectedCompany.value === company.value
        ) {

            option.classList.add("selected");

        }


        option.textContent =
            company.name;


        option.addEventListener(
            "click",
            function () {

                selectedCompany =
                    company;


                companyButton
                    .querySelector("span")
                    .textContent =
                    company.name;


                companyDropdown
                    .classList
                    .remove("open");


                updateInterface();

            }
        );


        companyOptions.appendChild(option);

    });

}


// =====================================================
// RENDER TPAs
// =====================================================

function renderTpas(search = "") {

    tpaOptions.innerHTML = "";


    const filtered =
        tpas.filter(tpa =>

            tpa.name
                .toLowerCase()
                .includes(search.toLowerCase())

        );


    if (filtered.length === 0) {

        tpaOptions.innerHTML = `

            <div class="no-results">
                No TPA found
            </div>

        `;

        return;

    }


    filtered.forEach(tpa => {

        const option =
            document.createElement("div");


        option.className =
            "dropdown-option";


        if (
            selectedTpa &&
            selectedTpa.value === tpa.value
        ) {

            option.classList.add("selected");

        }


        option.textContent =
            tpa.name;


        option.addEventListener(
            "click",
            function () {

                selectedTpa =
                    tpa;


                tpaButton
                    .querySelector("span")
                    .textContent =
                    tpa.name;


                tpaDropdown
                    .classList
                    .remove("open");


                updateInterface();

            }
        );


        tpaOptions.appendChild(option);

    });

}


// =====================================================
// RENDER NETWORKS
// =====================================================

function renderNetworks(search = "") {

    networkOptions.innerHTML = "";


    const filtered =
        networks.filter(network =>

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

        const option =
            document.createElement("div");


        option.className =
            "dropdown-option";


        if (
            selectedNetwork &&
            selectedNetwork.file === network.file
        ) {

            option.classList.add("selected");

        }


        option.textContent =
            network.name;


        option.addEventListener(
            "click",
            function () {

                selectedNetwork =
                    network;


                networkButton
                    .querySelector("span")
                    .textContent =
                    network.name;


                networkDropdown
                    .classList
                    .remove("open");


                updateInterface();

            }
        );


        networkOptions.appendChild(option);

    });

}


// =====================================================
// SEARCH EVENTS
// =====================================================

companySearch.addEventListener(
    "input",
    function () {

        renderCompanies(this.value);

    }
);


tpaSearch.addEventListener(
    "input",
    function () {

        renderTpas(this.value);

    }
);


networkSearch.addEventListener(
    "input",
    function () {

        renderNetworks(this.value);

    }
);


// =====================================================
// UPDATE PAGE
// =====================================================

function updateInterface() {

    message.textContent = "";

    message.className = "";


    if (
        selectedCompany &&
        selectedTpa &&
        selectedNetwork
    ) {

        selectedInfo.style.display =
            "block";


        selectedCompanyText.textContent =
            selectedCompany.name;


        selectedTpaText.textContent =
            selectedTpa.name;


        selectedNetworkText.textContent =
            selectedNetwork.name;


        downloadButton.disabled =
            false;

    }

    else {

        selectedInfo.style.display =
            "none";


        downloadButton.disabled =
            true;

    }

}


// =====================================================
// DOWNLOAD FILE
// =====================================================

downloadButton.addEventListener(
    "click",
    async function () {

        if (
            !selectedCompany ||
            !selectedTpa ||
            !selectedNetwork
        ) {

            message.textContent =
                "Please select an insurance company, TPA, and network.";


            message.className =
                "error";


            return;

        }


        const filePath =
            `./networks/${
                encodeURIComponent(
                    selectedNetwork.file
                )
            }`;


        downloadButton.disabled =
            true;


        downloadButton.textContent =
            "Preparing Download...";


        try {

            const response =
                await fetch(filePath);


            if (!response.ok) {

                throw new Error(
                    "File not found"
                );

            }


            const blob =
                await response.blob();


            const fileURL =
                URL.createObjectURL(blob);


            const link =
                document.createElement("a");


            link.href =
                fileURL;


            link.download =
                selectedNetwork.file;


            document.body.appendChild(link);


            link.click();


            link.remove();


            URL.revokeObjectURL(fileURL);


            message.textContent =
                "Your download has started.";


            message.className =
                "success";

        }

        catch (error) {

            message.textContent =
                "The selected network file could not be found.";


            message.className =
                "error";

        }

        finally {

            downloadButton.disabled =
                false;


            downloadButton.textContent =
                "Download Network File";

        }

    }
);


// =====================================================
// INITIALIZE
// =====================================================

renderCompanies();

renderTpas();

renderNetworks();

updateInterface();
