class ConvertVideoJob < ApplicationJob
  queue_as :default

  def perform(user_id)
    VideoConverter.new(user_id).convert!
  end
end
