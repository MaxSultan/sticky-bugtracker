Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  
  namespace :api do
    resources :users, only: [:index]
  end 

  namespace :api do
    resources :projects do
      resources :bugs do
        resources :chats
      end 
    end
  end 
end
