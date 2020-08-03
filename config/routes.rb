Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  
  namespace :api do
    resources :users, only: [:index]
  end 

  namespace :api do
    get 'projects/getBugNumbers', to: 'projects#get_bug_count'
    get 'projects/bugsByDaysWorked', to: 'projects#bugs_by_days_worked' 
  end 

  namespace :api do
    resources :projects do
      resources :bugs do
        resources :chats
      end 
    end
  end 
end
