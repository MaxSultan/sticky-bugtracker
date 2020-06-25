class CreateChats < ActiveRecord::Migration[6.0]
  def change
    create_table :chats do |t|
      t.belongs_to :bug, null: false, foreign_key: true
      t.string :username
      t.text :content
      t.string :postTime

      t.timestamps
    end
  end
end
