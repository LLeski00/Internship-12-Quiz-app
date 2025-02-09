function decodeHtmlEntities(text) {
    const doc = new DOMParser().parseFromString(text, "text/html");
    return doc.body.textContent;
}

export { decodeHtmlEntities };
