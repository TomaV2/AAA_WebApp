const checkboxBiscuitInDispenser = document.getElementById("BiscuitInDispenser");
console.log(document.getElementById("BiscuitInDispenser"));
checkboxBiscuitInDispenser.addEventListener("change", async () => {

    try {

        await fetch("/api/BiscuitInDispenser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                enabled: checkboxBiscuitInDispenser.checked
            })
        });
    } catch (error) {
        console.error("Erreur lors de la requête :", error);
    }

});

const checkboxBiscuitInHolder = document.getElementById("BiscuitInHolder");
checkboxBiscuitInHolder.addEventListener("change", async () => {

    await fetch("/api/BiscuitInHolder", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            enabled: checkboxBiscuitInHolder.checked
        })
    });

});