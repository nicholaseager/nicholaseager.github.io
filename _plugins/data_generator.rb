require 'csv'
require 'json'
require 'fileutils'

# This Jekyll hook runs after the site is initialized
# It generates various data files and pages from CSV/JSON source files
Jekyll::Hooks.register :site, :after_init do |site|
  # Create necessary directories if they don't exist
  FileUtils.mkdir_p('_photos')
  FileUtils.mkdir_p('_galleries')
  FileUtils.mkdir_p('_guides')
  FileUtils.mkdir_p('_data/metadata')

  # Run the generators to create pages and metadata
  generate_photos     # Generates photo pages from photos.csv
  generate_galleries  # Generates gallery pages from galleries.csv
  generate_guides    # Generates guide pages from JSON files
  generate_metadata  # Generates similarity metadata for photos and guides
end

# Generates individual photo pages from photos.csv
# Each row creates a markdown file with YAML front matter
def generate_photos
  # Parse CSV with headers and process each row
  CSV.foreach('_data/photos.csv', headers: true) do |row|
    next unless row[0] # Skip if first column is nil

    # Generate markdown filename from first column
    filename = "_photos/#{row[0]}.md"
    FileUtils.mkdir_p(File.dirname(filename))

    # Extract path and convert to title
    path = row[0]
    parts = path.split('/')
    title = parts.last.to_s.gsub('-', ' ').split.map(&:capitalize).join(' ')

    # Parse location from path by:
    # 1. Reversing parts array
    # 2. Removing filename
    # 3. Removing 'photos' and 'countries' directories
    # 4. Joining remaining parts with commas
    # 5. Formatting text (replace hyphens, capitalize)
    location_parts = parts.reverse
    location_parts.delete(parts.last)
    location_parts.delete('photos')
    location_parts.delete('countries')
    location = location_parts.join(', ').gsub('-', ' ').split.map(&:capitalize).join(' ')

    # Use provided description or generate from title and location
    description = (row[1].to_s.empty?) ? "#{title} (#{location})" : row[1].to_s

    # Convert space-separated tags into quoted, comma-separated list
    tags = (row[2] || "").split(' ').map { |t| %("#{t}") }.join(', ')

    # Extract optional Darkroom and YouTube IDs
    darkroom_id = row[3].to_s.strip
    youtube_id = row[4].to_s.strip

    # Generate YAML front matter with conditional darkroom/youtube fields
    content = <<~YAML
      ---
      layout: photo
      jsonld: article
      sitemap: false
      image: #{path}
      title: #{title}
      location: #{location}
      description: #{description}
      tags: [#{tags}]
      #{darkroom_id.empty? ? '' : "darkroomid: #{darkroom_id}"}
      #{youtube_id.empty? ? '' : "youtubeid: #{youtube_id}"}
      ---

      <!--    This YAML front matter is auto-generated.
              Do not edit it directly, but instead edit the CSV (_data/photos.csv)
              and regenerate the site. -->
    YAML

    # Write generated content to file
    File.write(filename, content)
  end
end

# Generates gallery pages from galleries.csv
# Each row creates a markdown file with YAML front matter
def generate_galleries
  # Loop through each row in galleries.csv, treating first row as headers
  CSV.foreach('_data/galleries.csv', headers: true) do |row|
    # Convert gallery name to lowercase and replace spaces with hyphens for filename
    name = row[0].downcase.gsub(' ', '-')
    # Construct full path for new markdown file
    filename = "_galleries/#{name}.md"
    # Create _galleries directory if it doesn't exist
    FileUtils.mkdir_p(File.dirname(filename))

    # Format tags as quoted strings separated by commas
    tags = row[1].split(' ').map { |t| %("#{t}") }.join(', ')

    # Create YAML front matter content
    content = <<~YAML
      ---
      layout: print-gallery
      jsonld: article
      header: transparent
      title: #{row[0]}
      tags: [#{tags}]
      description: #{row[2]}
      image: #{row[3]}
      ---

      <!--    This YAML front matter is auto-generated.
              Do not edit it directly, but instead edit the CSV (_data/galleries.csv)
              and regenerate the site. -->
    YAML

    # Write the content to the markdown file
    File.write(filename, content)
  end
end

# Generates guide pages from JSON files in _data/guides/
# Each JSON file creates a markdown file with YAML front matter
def generate_guides
  # Iterate through all JSON files in _data/guides directory
  Dir.glob('_data/guides/*.json').each do |file|
    # Skip template file if it exists
    next if File.basename(file) == 'template.json'

    # Parse JSON data from file
    data = JSON.parse(File.read(file))
    # Get guide name by removing .json extension
    guidename = File.basename(file, '.json')
    # Construct output markdown filename with date prefix
    filename = "_guides/#{data['date']}-#{guidename}.md"
    # Create directories in path if they don't exist
    FileUtils.mkdir_p(File.dirname(filename))

    # Generate markdown content with YAML front matter
    content = <<~YAML
      ---
      layout: guide
      jsonld: article
      header: transparent
      title: #{data['title']}
      date: #{data['date']}
      modified_date: #{data['modified_date']}
      description: #{data['description']}
      image: #{data['image']}
      tags: #{data['tags'].to_json}
      guide: #{guidename}
      redirect_from: /g/#{data['short_name']}
      ---

      <!--    This YAML front matter is auto-generated.
              Do not edit it directly, but instead edit the json (_data/guides/#{guidename}.json)
              and regenerate the site. -->
    YAML

    # Write generated content to markdown file
    File.write(filename, content)
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
  File.write('_data/metadata/similar_guides.json', JSON.pretty_generate(similar_guides))

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
  File.write('_data/metadata/similar_photos.json', JSON.pretty_generate(similar_photos))
end
