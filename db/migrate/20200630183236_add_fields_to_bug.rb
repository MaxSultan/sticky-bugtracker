class AddFieldsToBug < ActiveRecord::Migration[6.0]
  def change
    add_column :bugs, :date_assigned, :datetime
    add_column :bugs, :date_work_began, :datetime
    add_column :bugs, :status, :string
    add_column :bugs, :current_stage, :string
  end
end
