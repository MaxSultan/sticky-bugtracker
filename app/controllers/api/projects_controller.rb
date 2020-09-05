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

    def get_bug_count
        render json: Project.all.map { |project| project.bugs.all.size}
    end 

    def bugs_by_days_worked
        less_than_7_days_bugs = Project.all.map {|project| project.bugs.count {|bug| bug.date_work_began > Date.today - 5}} 
        seven_to_30_days_bugs = Project.all.map {|project| project.bugs.count {|bug| bug.date_work_began <= Date.today - 5 && bug.date_work_began >= Date.today - 30}}
        thirty_plus_days_bugs = Project.all.map {|project| project.bugs.count {|bug| bug.date_work_began < Date.today - 30}}
        render json: {seven_less: less_than_7_days_bugs, seven_thirty: seven_to_30_days_bugs, thirty_more: thirty_plus_days_bugs}
    end 

    def get_active_bug_count
        count = Project.all.select {|project| project.status != "inactive" }.map { |project| project.bugs.select{|bug| bug.status != "complete" && bug.current_stage != "fixed"}.size}
        render json: count
    end 

    private
    def project_params
        params.require(:project).permit(:name, :status)
    end 
end
