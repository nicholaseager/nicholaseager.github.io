# This Jekyll plugin generates individual markdown pages for photos based on a CSV data source.
# It runs after site initialization and:
# - Creates a _photos directory if it doesn't exist
# - Reads photo data from _data/photos.csv
# - Generates a markdown file for each photo with YAML front matter containing:
#   - Layout and metadata settings
#   - Image path and title derived from filename
#   - Location extracted from directory structure
#   - Description (provided or auto-generated)
#   - Tags (space-separated in CSV, converted to array)
#   - Optional Darkroom and YouTube IDs
#
# The generated files are used by Jekyll to create individual photo pages on the site.

require 'csv'
require 'fileutils'

Jekyll::Hooks.register :site, :after_init do |site|
  begin
    puts '📸 generating photos ...'
    FileUtils.mkdir_p('_photos')
    generate_photos
    puts '✅ done.'
  rescue => e
    puts "\n🛑 Error generating photos: #{e.message}"
  end
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
