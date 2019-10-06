class LinkNode {
    constructor(title, curDepth, url, links) {
        this.title = title;
        this.depth = curDepth;
        this.url = url;
        this.links = links;
    }
}

module.exports = LinkNode;