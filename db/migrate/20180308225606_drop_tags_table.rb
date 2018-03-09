class DropTagsTable < ActiveRecord::Migration
  def up
  	drop_table :thing_tags
  	drop_table :tags
  end

  def down
  	raise ActiveRecord::IrreversibleMigration
  end
end
