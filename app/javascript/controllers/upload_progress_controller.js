import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = [ "progress", "progressText", "progressWidth" ]

  initialize() {
  }

  connect() {
    this.element.addEventListener("direct-upload:progress", this.updateProgress.bind(this))

    this.element.addEventListener("direct-upload:error", event => {
      event.preventDefault()
      const { id, error } = event.detail
      console.log(error)
    })
  }

  showProgress() {
    this.progressTarget.style.display = "block"
  }

  updateProgress() {
    const { id, progress } = event.detail
    this.progressWidthTarget.style.width = `${Math.round(progress)}%`
    this.progressTextTarget.innerHTML = `${Math.round(progress)}% complete`
  }

  disconnect() {
    this.element.removeEventListener("direct-upload:progress", this.updateProgress)
  }
}
