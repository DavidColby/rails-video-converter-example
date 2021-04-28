class VideoConversionChannel < ApplicationCable::Channel
  def subscribed
    stream_from "video_conversion_#{params[:id]}"
  end
end
