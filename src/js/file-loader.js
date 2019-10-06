class FileLoader {

    /**
     * Constructor
     */
    constructor() {
        this.files = new Set();
        this.sources = new Map();
        this.onload = null;
    }

    /**
     * Clears the file loader
     */
    clear() {
        this.files.clear();
        this.sources.clear();
        this.onload = null;
    }

    /**
     * Adds the file
     * @param {String} file the relative file path
     */
    addFile(file) {
        this.files.add(file);
    }

    /**
     * Gets the file source
     * @param {String} file the relative file path
     * @return {String}
     */
    getSource(file) {
        return this.sources.get(file);
    }

    /**
     * Loads the files asynchronously
     */
    loadFiles() {
        let instance = this;

        this.files.forEach( function (currentValue, currentKey, set) {
            let file = currentValue;

            let request = new XMLHttpRequest();

            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        instance.sources.set(file, request.responseText);

                        if (instance.sources.size === instance.files.size && instance.onload instanceof Function) instance.onload();
                    }
                    else {
                        throw `Loader.load: the request for the file "${file}" completed with a response code ${request.status}`;
                    }
                }
            };

            request.open("GET", file);
            request.setRequestHeader("Cache-Control", "no-cache");
            request.send();
        });
    }

}