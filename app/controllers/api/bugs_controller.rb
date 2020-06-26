class Api::BugsController < ApplicationController

    def index
        bugs = Project.find(params[:project_id]).bugs
        render json: bugs
    end

    def create
        @project = Project.find(params[:project_id])
        bug = @project.bugs.new(bug_params)
        if bug.save
            render json: bug
        else
            render json: {errors: bug.errors, status: 422}
        end 
    end

    def destroy
        bug = Bug.find(params[:id])
        render json: bug.destroy
    end 

    private
    def bug_params
        params.require(:bug).permit(
            :title, 
            :description, 
            :steps, 
            :result, 
            :assignedTo, 
            :severity, 
            :screenShots, 
            :startDate, 
            :dueDate
        )
    end 
end
