class Tag < ActiveRecord::Base
  has_many :things
  validates :keyword, presence: true
  default_scope { order(keyword: :asc) }
end
