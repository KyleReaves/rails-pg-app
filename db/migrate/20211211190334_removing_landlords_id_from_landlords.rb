class RemovingLandlordsIdFromLandlords < ActiveRecord::Migration[6.1]
  def change
    change_table :properties do |t|
      t.remove :landlords_id
    end
  end
end
