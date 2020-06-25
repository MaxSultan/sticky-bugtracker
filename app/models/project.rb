class Project < ApplicationRecord
    has_many :bugs, dependent: :destroy
end
