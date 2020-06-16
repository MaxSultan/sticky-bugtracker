# Instructions for getting to basic project

### Clone/ Git
1. `git clone git@github.com:MaxSultan/react-rails-router-starter.git <ProjectName>` in terminal
2. in terminal run `cd <ProjectName>`
3. `git remote rm origin`
4. create a new repo and add new origin 

## Rails instructions 
1. in terminal run 'bundle'
2. open project in editor. in config/database.yml cmd f and replace all previous db names with name of current project
    - in this case the db name is react-rails-router-starter...
3. `rails db:create db:migrate db:seed`
4. run `rails s -p 3001`
5. go to http://localhost:3001/api/products and see that the db has been seeded with product data 

### React instructions
1.  in terminal run `cd <ProjectName>/client`
2. in terminal run `yarn`
3. in terminal run `yarn start`
4. go to http://localhost:3000
