class AddConvertVideoToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :convert_video, :boolean, default: false
  end
end
