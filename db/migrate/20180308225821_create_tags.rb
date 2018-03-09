class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :keyword

      t.timestamps null: false
    end
    add_reference :things, :tag, index: true
    add_foreign_key :things, :tags
  end
end
