class Api::ProjectsController < ApplicationController

    def index 
        render json: @projects = Project.all
    end 

    def show
        project = Project.find(params[:id])
        render json: project
    end 

    def create
       project = Project.new(project_params)
       if project.save
        render json: project
       else
        render json: {errors: project.errors, status: 422}
       end 
    end

    def update
        project = Project.find(params[:id])
        if project.update(project_params)
         render json: project
        else
         render json: {errors: project.errors, status: 422}
        end 
    end 

    def destroy
        project = Project.find(params[:id])
        render json: project.destroy
    end 

    private
    def project_params
        params.require(:project).permit(:name, :status)
    end 
end
