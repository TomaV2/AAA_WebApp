async function DipChoco(){

    document.getElementById("status").innerText =
        "Commande envoyée...";

    await fetch(`/api/dip-choco`,{
        method:"POST"
    });

    document.getElementById("status").innerText =
        `DipChoco lancée`;
}

async function Demo(){

    document.getElementById("status").innerText =
        "Commande envoyée...";

    await fetch(`/api/demo`,{
        method:"POST"
    });

    document.getElementById("status").innerText =
        `Demo lancée`;
}

async function TransportPosition(){

    document.getElementById("status").innerText =
        "Commande envoyée...";

    await fetch(`/api/transport-position`,{
        method:"POST"
    });

    document.getElementById("status").innerText =
        `Position de transport lancée`;
}