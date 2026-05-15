require "bibtex"

module Jekyll
  class PublicationSearchData < Generator
    safe true
    priority :normal

    def generate(site)
      site.data["publication_search_entries"] = publication_entries(site)
    rescue StandardError => e
      Jekyll.logger.warn "Publication search:", e.message
      site.data["publication_search_entries"] = []
    end

    private

    def publication_entries(site)
      config = site.config["scholar"] || {}
      source = (config["source"] || "/_bibliography/").sub(%r{\A/}, "")
      bibliography = config["bibliography"] || "papers.bib"
      path = File.join(site.source, source, bibliography)
      return [] unless File.file?(path)

      BibTeX.open(path).filter_map do |entry|
        next unless entry.respond_to?(:key) && entry.key

        title = clean(entry[:title])
        authors = author_names(entry).join(", ")
        venue = clean(entry[:venue]) || clean(entry[:booktitle]) || clean(entry[:journal])
        year = clean(entry[:year])
        venue_year = [venue, year].compact.join(", ")

        {
          "id" => entry.key,
          "title" => title,
          "description" => [authors, venue_year].reject(&:empty?).join(" - "),
        }
      end
    end

    def author_names(entry)
      return [] unless entry.respond_to?(:author) && entry.author

      entry.author.map do |author|
        clean([author.first, author.last].compact.join(" "))
      end.compact
    rescue StandardError
      clean(entry[:author]).to_s.split(/\s+and\s+/).map do |name|
        clean(name).sub(/\A([^,]+),\s*(.+)\z/, "\\2 \\1")
      end
    end

    def clean(value)
      value = value.to_s.gsub(/[{}]/, "").gsub(/\s+/, " ").strip
      value.empty? ? nil : value
    end
  end
end
