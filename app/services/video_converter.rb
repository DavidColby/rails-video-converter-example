class VideoConverter
  def initialize(user_id)
    @user = User.find(user_id)
  end

  def convert!
    return unless @user.convert_video?

    process_video
    update_needs_conversion
    render_processed_video
  end

  private

  def process_video
    @user.profile_video.open(tmpdir: "/tmp") do |file|
      movie = FFMPEG::Movie.new(file.path)
      path = "tmp/video-#{SecureRandom.alphanumeric(12)}.mp4"
      movie.transcode(path, { video_codec: 'libx264', audio_codec: 'aac' }) { |progress| ActionCable.server.broadcast("video_conversion_#{@user.id}", progress) }
      @user.profile_video.attach(io: File.open(path), filename: "video-#{SecureRandom.alphanumeric(12)}.mp4", content_type: 'video/mp4')
    end
  end

  def update_needs_conversion
    @user.update_column(:convert_video, false)
  end

  def render_processed_video
    partial = ApplicationController.render(partial: "users/profile_video", locals: { user: @user })
    ActionCable.server.broadcast("converted_video_#{@user.id}", partial)
  end
end
