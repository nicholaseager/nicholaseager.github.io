# This plugin generates metadata files for similar content recommendations
# It runs after Jekyll site initialization and:
# 1. Creates similarity scores between guides based on shared tags
# 2. Creates similarity scores between photos based on shared tags
# 3. Saves the results as JSON files in _data/metadata/ for use in templates
#
# Output files:
# - _data/metadata/similar_guides.json: Guide similarities based on tag overlap
# - _data/metadata/similar_photos.json: Photo similarities based on tag overlap

require 'json'
require 'csv'
require 'fileutils'

Jekyll::Hooks.register :site, :after_init do |site|
  begin
    puts '📸 generating metadata ...'
    FileUtils.mkdir_p('_data/metadata')
    generate_metadata
    puts '📸 done.'
  rescue => e
    puts "\nError generating metadata: #{e.message}"
  end
end

# Generates metadata files for similar guides and photos
# Creates JSON files with similarity scores based on shared tags
def generate_metadata
  # Get all guide JSON filenames, excluding the template file
  guide_names = Dir.glob('_data/guides/*.json')
    .reject { |f| File.basename(f) == 'template.json' }
    .map { |f| File.basename(f, '.json') }

  # Initialize hash to store guide similarities
  similar_guides = {}
  guide_names.each do |guide1|
    similar = []
    guide_names.each do |guide2|
      next if guide1 == guide2 # Skip comparing guide to itself

      # Load JSON data for both guides being compared
      data1 = JSON.parse(File.read("_data/guides/#{guide1}.json"))
      data2 = JSON.parse(File.read("_data/guides/#{guide2}.json"))

      # Calculate number of shared tags between guides
      similar_tags = (data1['tags'] & data2['tags']).count
      if similar_tags >= 1
        # Add guide2 as similar if they share at least 1 tag
        similar << { 'name' => guide2, 'simularity' => similar_tags }
      end
    end
    similar_guides[guide1] = similar
  end

  # Save the similar guides data to a JSON file
  File.write('_data/metadata/similar_guides.json', JSON.generate(similar_guides))

  # Load photo data from CSV file
  photos = []
  CSV.foreach('_data/photos.csv', headers: true) do |row|
    photos << { 'name' => row[0], 'tags' => row[2].split(' ') }
  end

  # Initialize hash to store photo similarities
  similar_photos = {}
  photos.each do |photo1|
    similar = []
    photos.each do |photo2|
      next if photo1['name'] == photo2['name'] # Skip comparing photo to itself

      # Calculate shared tags, excluding 'showcase' tag
      similar_tags = (photo1['tags'] & photo2['tags'] - ['showcase']).count
      if similar_tags >= 1
        # Add photo2 as similar if they share at least 1 tag
        similar << { 'name' => photo2['name'], 'simularity' => similar_tags }
      end
    end
    similar_photos[photo1['name']] = similar
  end

  # Save the similar photos data to a JSON file
  File.write('_data/metadata/similar_photos.json', JSON.generate(similar_photos))
end
