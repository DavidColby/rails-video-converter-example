import { Controller } from "stimulus";
import consumer from "channels/consumer";

export default class extends Controller {
  static targets = [ "progressText" ]

  initialize() {
    this.subscription = consumer.subscriptions.create(
      {
        channel: "VideoConversionChannel",
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
    this.updateProgress(data * 100)
  }

  updateProgress = (progress) => {
    let progressPercent = ''
    if (progress >= 100) {
      progressPercent = "100%"
    } else {
      progressPercent = Math.round(progress) + "%"
    }
    this.progressTextTarget.innerHTML = progressPercent
  }
}
