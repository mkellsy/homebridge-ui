import { API, DynamicPlatformPlugin, Logging, PlatformAccessory, PlatformConfig } from "homebridge";

const platform: string = "homebridge-config-ui";
const plugin: string = "homebridge-config-ui";

export { platform, plugin };

export class Platform implements DynamicPlatformPlugin {
    private readonly log: Logging;
    private readonly homebridge: API;

    /**
     * Creates an instance to this plugin.
     *
     * @param log A reference to the Homebridge logger.
     * @param config A reference to this plugin's config.
     * @param homebridge A reference to the Homebridge API.
     */
    constructor(log: Logging, config: PlatformConfig, homebridge: API) {
        this.log = log;
        this.homebridge = homebridge;

        this.homebridge.on("didFinishLaunching", () => {});
    }

    /**
     * Function to call when Homebridge findes a cached accessory that is
     * associated to this plugin.
     *
     * Note these accessories do not have extended data, the plugin wwill need
     * to re-initialize the device, and re-bind any listeners.
     *
     * @param accessory A reference to the cached accessory.
     */
    public configureAccessory(accessory: PlatformAccessory): void {
        this.log(`Configuring cached accessory "${accessory.displayName}"`);
    }
}
