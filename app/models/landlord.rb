class Landlord < ApplicationRecord
    # no two Landlords can share the same Landlord.name
    validates :name, uniqueness: true
    has_and_belongs_to_many :properties
end
