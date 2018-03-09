class TagsController < ApplicationController
  def index
    expires_in 1.minute, :public => true
    @tags = Tag.all
    stale?(@tags.maximum(:updated_at))
  end
end
