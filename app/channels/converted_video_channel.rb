class ConvertedVideoChannel < ApplicationCable::Channel
  def subscribed
    stream_from "converted_video_#{params[:id]}"
  end
end
