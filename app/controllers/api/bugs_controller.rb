class Api::BugsController < ApplicationController
    before_action :set_bug, only: [:destroy, :show]
    before_action :set_project, only: [:index, :create, :update, :show]
    def index
        bugs = @project.bugs
        render json: bugs
    end

    def show
        @bug = @project.bugs.find(params[:id])
        render json: @bug
    end 

    def create
        bug = @project.bugs.new(bug_query_params)
        file = params[:file]
        
        if file
            begin
                ext = File.extname(file.tempfile)
                cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
                bug.screenShots = cloud_image['secure_url']
            rescue => e
                render json: { errors: e }, status: 422
                return
            end
        end
        
        if bug.save
            render json: bug
        else
            render json: {errors: bug.errors, status: 422}
            end 
    end
    
    def update
        @bug = @project.bugs.find(params[:id])
        @bug.update(bug_query_params)
        file = params[:file]

        if file && file != "null"
            begin
              ext = File.extname(file.tempfile)
              cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
              @bug.screenShots = cloud_image['secure_url']
            rescue => e
                debugger
              render json: { errors: e }, status: 422
              return
            end
        end

        if @bug.save
            render json: @bug
        else
            debugger
            render json: {errors: @bug.errors, status: 422}
        end 
    end

    def destroy
        render json: @bug.destroy
    end 

    def all_bugs
        render json: Bug.all
    end 

    private

    def set_bug
        @bug = Bug.find(params[:id])
    end 

    def set_project
        @project = Project.find(params[:project_id])
    end 

    def bug_query_params
        params.permit(
            :title, 
            :description, 
            :steps, 
            :result, 
            :assignedTo, 
            :severity, 
            :screenShots, 
            :startDate, 
            :dueDate,
            :date_assigned,
            :date_work_began,
            :status,
            :current_stage,
            :id,
            :project_id,
        )
    end 
end
