export class AudioDevice {
    constructor() {
        this.input_device_name = "CABLE Input"
        this.output_device_name = "CABLE Output"
    }

    setInputDeviceName(deviceName){
        this.input_device_name = deviceName
    }

    setOutputDeviceName(deviceName){
        this.output_device_name = deviceName
    }
}