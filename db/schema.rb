# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_11_25_185105) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "landlords", force: :cascade do |t|
    t.string "name"
    t.string "mailing_address"
    t.string "city_state_zip"
    t.string "full_mailing_address"
    t.integer "number_properties_owned"
    t.string "list_properties_owned", array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "properties_id", null: false
    t.index ["properties_id"], name: "index_landlords_on_properties_id"
  end

  create_table "properties", force: :cascade do |t|
    t.string "street_address"
    t.string "owner_name"
    t.string "owner_mailing_address"
    t.string "city_state_zip"
    t.string "property_full_address"
    t.integer "units_at_property"
    t.text "g_code"
    t.float "latitude"
    t.float "longitude"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "list_properties_owned", array: true
    t.integer "number_properties_owned"
    t.string "owner_full_mailing_address"
    t.bigint "landlord_id"
    t.index ["landlord_id"], name: "index_properties_on_landlord_id"
  end

  add_foreign_key "landlords", "properties", column: "properties_id"
  add_foreign_key "properties", "landlords"
end
