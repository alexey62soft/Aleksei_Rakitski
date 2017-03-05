(() => {
    let EventGeneralProto = Object.create(HTMLDivElement.prototype);
    let importDoc = document.currentScript.ownerDocument;

    EventGeneralProto.createdCallback = function () {
        var root = this.createShadowRoot();
        var template = importDoc.querySelector("#event-general");
        root.appendChild(document.importNode(template.content, true));
    };

    document.registerElement("event-general", {
        prototype: EventGeneralProto
    });
})();

(() => {
    let EventAdvancedProto = Object.create(HTMLDivElement.prototype);
    let importDoc = document.currentScript.ownerDocument;

    EventAdvancedProto.createdCallback = function () {
        var template = importDoc.querySelector("#event-advanced");
        var root = this.createShadowRoot();
        root.appendChild(document.importNode(template.content, true));
    };

    document.registerElement("event-advanced", {
        prototype: EventAdvancedProto
    });
})();