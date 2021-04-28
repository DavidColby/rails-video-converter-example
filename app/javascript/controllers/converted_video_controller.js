import { Controller } from "stimulus";
import consumer from "channels/consumer";

export default class extends Controller {
  static targets = ["videoContainer"];

  initialize() {
    this.subscription = consumer.subscriptions.create(
      {
        channel: "ConvertedVideoChannel",
        id: this.element.dataset.id,
      },
      {
        connected: this._connected.bind(this),
        disconnected: this._disconnected.bind(this),
        received: this._received.bind(this),
      }
    );
  }

  _connected() {}

  _disconnected() {}

  _received(data) {
    const videoElement = this.videoContainerTarget
    videoElement.innerHTML = data
  }
}
