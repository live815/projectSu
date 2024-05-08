import { Quill } from "@vueup/vue-quill";

const BlockEmbed = Quill.import("blots/block/embed");
const Link = Quill.import("formats/link");

const ATTRIBUTES = ["height", "width"];

class Video extends BlockEmbed {
  static create(value) {
    const node = super.create(value);
    node.setAttribute("controls", "controls");
    node.setAttribute("type", "video/mp4");
    node.setAttribute("style", "object-fit:fill;width: 100%;");
    node.setAttribute("preload", "auto");
    node.setAttribute("webkit-playsinline", "true");
    node.setAttribute("playsinline", "true");
    node.setAttribute("x-webkit-airplay", "allow");
    node.setAttribute("x5-video-orientation", "portraint");
    node.setAttribute("x5-playsinline", "true");
    node.setAttribute("x5-video-player-fullscreen", "true");
    node.setAttribute("src", this.sanitize(value));
    return node;
  }

  static formats(domNode) {
    return ATTRIBUTES.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  static sanitize(url) {
    return Link.sanitize(url);
  }

  static value(domNode) {
    return domNode.getAttribute("src");
  }

  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }

  html() {
    const { video } = this.value();
    return `<a href="${video}">${video}</a>`;
  }
}
Video.blotName = "video";
Video.className = "ql-video";
Video.tagName = "video";
export default Video;
