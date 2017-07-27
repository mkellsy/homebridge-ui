var npm = require("../npm");
var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    if (req.user) {
        next();
    } else {
        req.session.referer = "/plugins";
        res.redirect("/login");
    }
}, function (req, res, next) {
    if (req.query.search && req.query.search != "") {
        npm.search(req.query.search, function (err, pkgs) {
            res.render("plugins", {
                controller: "plugins",
                title: "Plugins",
                user: req.user,
                search: (req.query.search) ? req.query.search : "",
                packages: pkgs
            });
        });
    } else {
        npm.installed(function (err, pkgs) {
            res.render("plugins", {
                controller: "plugins",
                title: "Plugins",
                user: req.user,
                packages: pkgs
            });
        });
    }
});

router.get("/upgrade", function (req, res, next) {
    if (req.user) {
        next();
    } else {
        req.session.referer = "/plugins";
        res.redirect("/login");
    }
}, function (req, res, next) {
    npm.update(req.query.package, function (err, stdout, stderr) {
        app.get("log")("Paket " + req.query.package + " aktualisiert.");
        res.redirect("/plugins");
    });
});

router.get("/uninstall", function (req, res, next) {
    if (req.user) {
        next();
    } else {
        req.session.referer = "/plugins";
        res.redirect("/login");
    }
}, function (req, res, next) {
    var config = require(hb.config);

    var server = {
        name: (config.bridge.name || "Homebridge"),
        mac: (config.bridge.username || "CC:22:3D:E3:CE:30"),
        port: (config.bridge.port || 51826),
        pin: (config.bridge.pin || "031-45-154")
    };

    var platforms = [];

    for (var i = 0; i < config.platforms.length; i++) {
        if (!config.platforms[i].npm_package || config.platforms[i].npm_package != req.query.package) {
            platforms.push(config.platforms[i]);
        }
    }

    config.platforms = [];

    for (var i = 0; i < platforms.length; i++) {
        config.platforms.push(platforms[i]);
    }

    var accessories = [];

    for (var i = 0; i < config.accessories.length; i++) {
        if (!config.accessories[i].npm_package || config.accessories[i].npm_package != req.query.package) {
            accessories.push(config.accessories[i]);
        }
    }

    config.accessories = [];

    for (var i = 0; i < accessories.length; i++) {
        config.accessories.push(accessories);
    }

    fs.renameSync(hb.config, hb.config + "." + Math.floor(new Date() / 1000));
    fs.appendFileSync(hb.config, JSON.stringify(config, null, 4));

    delete require.cache[require.resolve(hb.config)];

    npm.uninstall(req.query.package, function (err, stdout, stderr) {
        app.get("log")("Paket " + req.query.package + " entfernt.");
        res.redirect("/plugins");
    });
});

router.get("/install", function (req, res, next) {
    if (req.user) {
        next();
    } else {
        req.session.referer = "/plugins";
        res.redirect("/login");
    }
}, function (req, res, next) {
    var platform = {
        "platform": "[PLATFORM eingeben]",
        "npm_package": req.query.package
    }

    res.render("install", {
        controller: "plugins",
        title: "Plugins",
        user: req.user,
        package: req.query.package,
        platform_json: JSON.stringify(platform, null, 4)
    });
});

router.post("/install", function (req, res, next) {
    if (req.user) {
        next();
    } else {
        req.session.referer = "/plugins";
        res.redirect("/login");
    }
}, function (req, res, next) {
    var config = require(hb.config);

    if (req.body["platform-code"] != "" && req.body["platform-name"] != "") {
        var platform = JSON.parse(req.body.platform_json);

        platform.name = req.body["platform-name"];

        if (!config.platforms) {
            config.platforms = [];
        }

        config.platforms.push(platform);
    }

    for (var i = 0; i < req.body.accessory.length; i++) {
        if (req.body[req.body.accessory[i] + "-delete"] == "false") {
            var accessory = JSON.parse(req.body[req.body.accessory[i] + "-code"]);

            accessory.name = req.body[req.body.accessory[i] + "-name"];
            config.accessories.push(accessory);
        }
    }

    fs.renameSync(hb.config, hb.config + "." + Math.floor(new Date() / 1000));
    fs.appendFileSync(hb.config, JSON.stringify(config, null, 4));

    delete require.cache[require.resolve(hb.config)];

    npm.uninstall(req.body.package, function (err, stdout, stderr) {
        app.get("log")("Paket " + req.body.package + " installiert.");
        res.redirect("/plugins");
    });
});

module.exports = router;
