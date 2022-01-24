# README

Frontend: React and TypeScript,
Backend: Rails,
Database: Postgres

This app uses data I collected and cleaned from my [landlord_project](https://github.com/kylemichaelreaves/landlord_data).

I am building essentially the same app, but in Python/Django, to get a sense for the strengths and limitations of both.

That project can be found at [django-pg-app](https://github.com/kylemichaelreaves/django-pg-app).

### Create a Rails with Postgres, React, and TypeScript:

```
rails new [application name] -d postgresql --webpack=react
```

#### cd inside the Rails app:

#### adding TypeScript via webpacker

```
bundle exec rake webpacker:install:typescript
```

### Running this app locally requires some boilerplate:

- cd into the directory.
- `touch config/boot.rb`
- Inside of config/boot.rb, include the following:

```ruby
ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require 'bundler/setup' # Set up gems listed in the Gemfile.
require 'bootsnap/setup' # Speed up boot time by caching expensive operations.
```

### Create .node-versions and .ruby-versions:

In the project folder create two files:
`touch .node-version` with `16.13.1`
`touch .ruby-version` with `3.1.0`
This is necessary in order to get the app to run locally.

### Create Models

```ruby
rails generate model ${model}
```

### Create db

```ruby
bin/rails db:create
```

### Make migrations

```ruby
rails generate migrations AddToProperty somethingsomething, somethingelse:integer, else_array:string, array:true
```

```ruby
bin/rails db:migrate
```

### Adding TypeScript/Webpack support

```
yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-preact @types/webpack-env eslint-plugin-react -D
```

```
yarn add babel-plugin-transform-react-jsx
```

```
yarn add @types/react @types/react-dom
```

### MVC / ResponseRequest Cycle

- generate a model, or two
- generate a controller for one or more of the models
- update the route in `config/routes.rb`
- update the controller with new actions

### Loading the Data into the Database

Create a Rakefile task to load the .csv into a postgres table.
CSV_PATH refers to the local path of the .csv.
Inside Rakefile:

```ruby
require 'csv'
namespace :db do
  task :import_csv => :environment do
    CSV.foreach("#{CSV_PATH}/jersey_city_private_property.csv", :headers => true) do |row|
      Property.create!(row.to_hash)
    end
  end
end

```

### Updating to the latest Rails version

```
bundle update
```

## ActiveRecord

#### Finding landlords with the most property

- Start the rails console
  ```shell
  bin/rails console
  ```
- Return the number of records with `Property.count`
  ```ruby
  irb(main):017:0> Property.count
  Property Count (15.4ms)  SELECT COUNT(*) FROM "properties"
  => 42030
  ```
- Return the number of times a landlords appeared in properties: with `Property.distinct(:owner_name).count`
  ```ruby
  irb(main):021:0> Property.distinct.count(:owner_name)
  Property Count (592.1ms)  SELECT COUNT(DISTINCT "properties"."owner_name") FROM "properties"
  => 37494
  ```
- Return an array of unique landlords
  ```ruby
  Property.distinct(:owner_name).pluck(:owner_name)
  ```
- Return an array of arrays representing the tally of 'owner_name` in properties
  ```ruby
  Property.pluck(:owner_name).tally.sort_by { |k, v|v }
  ```

#### Return malformed (strings including more than two spaces) owner_name

- ```ruby
  irb(main):136:1* Property.distinct.pluck(:owner_name).each_with_index do |el, i|
  irb(main):137:0>   puts el, i if el.match?(/\s+{2}/) end;nil
  ```

- ```ruby
  Property.distinct.pluck(:owner_name).each_with_index { |el, i| puts el, i if el.match?(/\s+{2}/) }.to_h;nil
  ```
