require 'csv'
require 'json'
require 'fileutils'

Jekyll::Hooks.register :site, :after_init do |site|
  # Create necessary directories
  FileUtils.mkdir_p('_photos')
  FileUtils.mkdir_p('_galleries')
  FileUtils.mkdir_p('_guides')
  FileUtils.mkdir_p('_data/metadata')

  # Run the generators
  generate_photos
  generate_galleries
  generate_guides
  generate_metadata
end

def generate_photos
  CSV.foreach('_data/photos.csv', headers: true) do |row|
    next unless row[0] # Skip if first column is nil

    filename = "_photos/#{row[0]}.md"
    FileUtils.mkdir_p(File.dirname(filename))

    path = row[0]
    parts = path.split('/')
    title = parts.last.to_s.gsub('-', ' ').split.map(&:capitalize).join(' ')

    location_parts = parts.reverse
    location_parts.delete(parts.last)
    location_parts.delete('photos')
    location_parts.delete('countries')
    location = location_parts.join(', ').gsub('-', ' ').split.map(&:capitalize).join(' ')

    description = (row[1].to_s.empty?) ? "#{title} (#{location})" : row[1].to_s

    tags = (row[2] || "").split(' ').map { |t| %("#{t}") }.join(', ')

    darkroom_id = row[3].to_s.strip
    youtube_id = row[4].to_s.strip

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

    File.write(filename, content)
  end
end

def generate_galleries
  CSV.foreach('_data/galleries.csv', headers: true) do |row|
    name = row[0].downcase.gsub(' ', '-')
    filename = "_galleries/#{name}.md"
    FileUtils.mkdir_p(File.dirname(filename))

    tags = row[1].split(' ').map { |t| %("#{t}") }.join(', ')

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

    File.write(filename, content)
  end
end

def generate_guides
  Dir.glob('_data/guides/*.json').each do |file|
    next if File.basename(file) == 'template.json'

    data = JSON.parse(File.read(file))
    guidename = File.basename(file, '.json')
    filename = "_guides/#{data['date']}-#{guidename}.md"
    FileUtils.mkdir_p(File.dirname(filename))

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

    File.write(filename, content)
  end
end

def generate_metadata
  # Generate similar guides metadata
  guide_names = Dir.glob('_data/guides/*.json')
    .reject { |f| File.basename(f) == 'template.json' }
    .map { |f| File.basename(f, '.json') }

  similar_guides = {}
  guide_names.each do |guide1|
    similar = []
    guide_names.each do |guide2|
      next if guide1 == guide2

      data1 = JSON.parse(File.read("_data/guides/#{guide1}.json"))
      data2 = JSON.parse(File.read("_data/guides/#{guide2}.json"))

      similar_tags = (data1['tags'] & data2['tags']).count
      if similar_tags >= 1
        similar << { 'name' => guide2, 'simularity' => similar_tags }
      end
    end
    similar_guides[guide1] = similar
  end

  File.write('_data/metadata/similar_guides.json', JSON.pretty_generate(similar_guides))

  # Generate similar photos metadata
  photos = []
  CSV.foreach('_data/photos.csv', headers: true) do |row|
    photos << { 'name' => row[0], 'tags' => row[2].split(' ') }
  end

  similar_photos = {}
  photos.each do |photo1|
    similar = []
    photos.each do |photo2|
      next if photo1['name'] == photo2['name']

      similar_tags = (photo1['tags'] & photo2['tags'] - ['showcase']).count
      if similar_tags >= 1
        similar << { 'name' => photo2['name'], 'simularity' => similar_tags }
      end
    end
    similar_photos[photo1['name']] = similar
  end

  File.write('_data/metadata/similar_photos.json', JSON.pretty_generate(similar_photos))
end
