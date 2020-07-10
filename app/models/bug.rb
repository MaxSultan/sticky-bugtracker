class Bug < ApplicationRecord
  belongs_to :project
  has_many :chats, dependent: :destroy

  def self.get_bug_with_project
    # SELECT name as project_name, b.title, b.description, b.severity, b.status, b.current_stage, b."assignedTo"
    # FROM projects
    # INNER JOIN bugs b ON b.project_id = projects.id

    select('name as project_name, b.title, b.description, b.severity, b.status, b.current_stage, b.date_work_began, b."assignedTo"')
    .from('projects')
    .joins('INNER JOIN bugs b ON b.project_id = projects.id')
  end 
end
