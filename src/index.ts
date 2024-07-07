import { API } from "homebridge";
import { Platform, platform, plugin } from "./Platform";

export = (homebridge: API) => {
    homebridge.registerPlatform(plugin, platform, Platform);
};
