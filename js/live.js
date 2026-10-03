// Function to show a random notification toast
function triggerToast() {
    var credits = "18,000 50,000 100,000".split(" ");
    var names = "LilSheep Stefani4 EmileQueen BeverlyK ElenaGreat Artur98 WorstGomer03 Abraham99 IrisBerry".split(" ");

    var randomName = names[Math.floor(Math.random() * names.length)];
    var randomCredit = credits[Math.floor(Math.random() * credits.length)];

    VanillaToasts.create({
        title: randomName,
        text: randomCredit + " Spin",
        icon: "images/profile.png", 
        type: "success",
        timeout: 4000
    });
}

// Trigger one immediately after 1 second, then repeat every 6 seconds
setTimeout(function() {
    triggerToast();
    setInterval(triggerToast, 6000); 
}, 1000);