# This Jekyll plugin generates guide pages from JSON files stored in _data/guides/.
# On site initialization, it:
# 1. Creates a _guides directory if it doesn't exist
# 2. Reads each JSON file in _data/guides/ (except template.json)
# 3. Generates a corresponding markdown file in _guides/ with YAML front matter
# 4. The generated markdown files use the guide layout and include metadata from the JSON
# This allows guide content to be managed in JSON while generating proper Jekyll pages.

require 'json'
require 'fileutils'

Jekyll::Hooks.register :site, :after_init do |site|
  begin
    puts '📸 generating guides ...'
    FileUtils.mkdir_p('_guides')
    generate_guides
    puts '✅ done.'
  rescue => e
    puts "\n🛑 Error generating guides: #{e.message}"
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
