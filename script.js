// ======================================
// INSURANCE COMPANY DATA
// ======================================


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



// ======================================
// NETWORK DATA
// ======================================


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



// ======================================
// GET HTML ELEMENTS
// ======================================


const companySearch =
    document.getElementById("companySearch");


const companySelect =
    document.getElementById("companySelect");


const networkSearch =
    document.getElementById("networkSearch");


const networkSelect =
    document.getElementById("networkSelect");


const downloadButton =
    document.getElementById("downloadButton");


const message =
    document.getElementById("message");


const selectedInfo =
    document.getElementById("selectedInfo");


const selectedCompany =
    document.getElementById("selectedCompany");


const selectedNetwork =
    document.getElementById("selectedNetwork");



// ======================================
// LOAD INSURANCE COMPANIES
// ======================================


function loadCompanies(searchText = "") {


    const currentValue =
        companySelect.value;


    companySelect.innerHTML = `

        <option value="">

            -- Select insurance company --

        </option>

    `;


    const search =
        searchText
            .toLowerCase()
            .trim();


    const filteredCompanies =
        insuranceCompanies.filter(company =>

            company.name
                .toLowerCase()
                .includes(search)

        );


    filteredCompanies.forEach(company => {


        const option =
            document.createElement("option");


        option.value =
            company.value;


        option.textContent =
            company.name;


        companySelect.appendChild(option);


    });


    if (filteredCompanies.length === 0) {


        const option =
            document.createElement("option");


        option.textContent =
            "No insurance company found";


        option.disabled = true;


        companySelect.appendChild(option);


    }


    if (
        filteredCompanies.some(
            company =>
                company.value === currentValue
        )
    ) {

        companySelect.value =
            currentValue;

    }


}



// ======================================
// LOAD NETWORKS
// ======================================


function loadNetworks(searchText = "") {


    const currentValue =
        networkSelect.value;


    networkSelect.innerHTML = `

        <option value="">

            -- Select network --

        </option>

    `;


    const search =
        searchText
            .toLowerCase()
            .trim();


    const filteredNetworks =
        networks.filter(network =>

            network.name
                .toLowerCase()
                .includes(search)

        );


    filteredNetworks.forEach(network => {


        const option =
            document.createElement("option");


        option.value =
            network.file;


        option.textContent =
            network.name;


        networkSelect.appendChild(option);


    });


    if (filteredNetworks.length === 0) {


        const option =
            document.createElement("option");


        option.textContent =
            "No network found";


        option.disabled = true;


        networkSelect.appendChild(option);


    }


    if (
        filteredNetworks.some(
            network =>
                network.file === currentValue
        )
    ) {

        networkSelect.value =
            currentValue;

    }


}



// ======================================
// SEARCH INSURANCE COMPANIES
// ======================================


companySearch.addEventListener(
    "input",
    function () {


        loadCompanies(
            companySearch.value
        );


        updateInterface();


    }
);



// ======================================
// SEARCH NETWORKS
// ======================================


networkSearch.addEventListener(
    "input",
    function () {


        loadNetworks(
            networkSearch.value
        );


        updateInterface();


    }
);



// ======================================
// COMPANY SELECTION
// ======================================


companySelect.addEventListener(
    "change",
    function () {


        message.textContent = "";

        message.className = "";


        updateInterface();


    }
);



// ======================================
// NETWORK SELECTION
// ======================================


networkSelect.addEventListener(
    "change",
    function () {


        message.textContent = "";

        message.className = "";


        updateInterface();


    }
);



// ======================================
// UPDATE INTERFACE
// ======================================


function updateInterface() {


    const companyValue =
        companySelect.value;


    const networkFile =
        networkSelect.value;


    const company =
        insuranceCompanies.find(
            item =>
                item.value === companyValue
        );


    const network =
        networks.find(
            item =>
                item.file === networkFile
        );


    if (company && network) {


        downloadButton.disabled = false;


        selectedInfo.style.display =
            "block";


        selectedCompany.textContent =
            company.name;


        selectedNetwork.textContent =
            network.name;


    } else {


        downloadButton.disabled = true;


        selectedInfo.style.display =
            "none";


    }


}



// ======================================
// DOWNLOAD NETWORK FILE
// ======================================


downloadButton.addEventListener(
    "click",
    async function () {


        const selectedFile =
            networkSelect.value;


        const companyValue =
            companySelect.value;


        if (
            !selectedFile ||
            !companyValue
        ) {


            message.textContent =
                "Please select an insurance company and network.";


            message.className =
                "error";


            return;


        }


        const filePath =
            `./networks/${encodeURIComponent(selectedFile)}`;


        downloadButton.disabled = true;


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


            const downloadLink =
                document.createElement("a");


            downloadLink.href =
                fileURL;


            downloadLink.download =
                selectedFile;


            document.body.appendChild(
                downloadLink
            );


            downloadLink.click();


            downloadLink.remove();


            URL.revokeObjectURL(
                fileURL
            );


            message.textContent =
                "Your download has started.";


            message.className =
                "success";


        } catch (error) {


            message.textContent =
                "The selected network file could not be found.";


            message.className =
                "error";


        } finally {


            downloadButton.disabled =
                false;


            downloadButton.textContent =
                "Download Network File";


        }


});



// ======================================
// INITIALIZE PAGE
// ======================================


loadCompanies();

loadNetworks();

updateInterface();
