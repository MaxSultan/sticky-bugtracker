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
    # :title, 
    # :description, 
    # :steps, 
    # :result, 
    # :assignedTo, 
    # :severity, 
    # :screenShots, 
    # :startDate, 
    # :dueDate,
    # :date_assigned,
    # :date_work_began,
    # :status,
    # :current_stage,
    
    def update
        # @project = Project.find(params[:project_id])
        bug = Bug.find(params[:id])
        bug.title = params[:title] ? params[:title] : bug.title
        bug.description = params[:description] ? params[:description] : bug.description
        bug.steps = params[:steps] ? params[:steps] : bug.steps
        bug.result = params[:result] ? params[:result] : bug.result
        bug.assignedTo = params[:assignedTo] ? params[:assignedTo] : bug.assignedTo
        bug.severity = params[:severity] ? params[:severity] : bug.severity
        bug.startDate = params[:startDate] ? params[:startDate] : bug.startDate
        bug.dueDate = params[:dueDate] ? params[:dueDate] : bug.dueDate
        bug.date_assigned = params[:date_assigned] ? params[:date_assigned] : bug.date_assigned
        bug.date_work_began = params[:date_work_began] ? params[:date_work_began] : bug.date_work_began
        bug.status = params[:status] ? params[:status] : bug.status
        bug.current_stage = params[:current_stage] ? params[:current_stage] : bug.current_stage
    
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
            :dueDate,
            :date_assigned,
            :date_work_began,
            :status,
            :current_stage,
        )
    end 
end
