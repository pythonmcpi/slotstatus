// Functions shared by status and info

module.exports = {
    loadConfig: (ignoreDev) => {
        let conf;
        
        // Load main config
        try {
            conf = require('./config.js');
        } catch (e) {
            throw new Error('Missing config.js');
        }
        
        // Load dev config, if it exists
        if (!ignoreDev)
            try {
                Object.assign(conf, require('./config.dev.js')); // Merges the two objects, with keys from the second overwriting keys from the first
            } catch (e) {
                // No action necessary
            }
        
        // Validate config
        for (const requiredKey of ['token', 'status', 'statusMsg', 'prefix', 'infoText', 'notFoundText']) {
            if (conf[requiredKey] == null) throw new Error(`Missing required config key ${requiredKey}`);
        }
        
        return conf;
    }
}
