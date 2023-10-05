Rails.application.routes.draw do
  get 'performance/performance'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "home#index"
  get "home", to: "home#index"
  get "team", to: "team#index"
  get "performance", to: "performance#index"
end
