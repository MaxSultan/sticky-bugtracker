class Api::ChatsController < ApplicationController
    before_action :set_project, only: [:index, :create]
    before_action :set_bug, only: [:index, :create]
    def index
        render json: @chats = @bug.chats.all
     end

     def create
        chat = @bug.chat.new(chat_params)
        render json: chat
     end 

     private
     def set_project
        @project = Project.find(params[:project_id])
     end

     def set_bug
        @bug = @project.bugs.find(params[:bug_id])
     end

     def chat_params
        params.require(:chat).permit(:username, :content, :postTime)
     end 
end
