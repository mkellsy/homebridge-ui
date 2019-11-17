module.exports = (homebridge) => {
    homebridge.registerPlatform("homebridge-config-ui", "config", Upgrade, true);
};

function Upgrade(log) {
    log("HOOBS is Installed");
    log("----------------------------------");
    log("HOOBS has a new UI!");
    log(`Please redirect your browser to http://hoobs.local`)
    log("or the domain you have setup. after rebooting.")
    log("----------------------------------");
    log("Please reboot to continue.");
}

Upgrade.prototype.accessories = function (callback) {
    callback([]);
}
