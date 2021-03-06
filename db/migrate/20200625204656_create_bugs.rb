class CreateBugs < ActiveRecord::Migration[6.0]
  def change
    create_table :bugs do |t|
      t.belongs_to :project, null: false, foreign_key: true
      t.string :title
      t.text :description
      t.text :steps
      t.string :result
      t.string :assignedTo
      t.string :severity
      t.string :screenShots
      t.string :startDate
      t.string :dueDate

      t.timestamps
    end
  end
end
