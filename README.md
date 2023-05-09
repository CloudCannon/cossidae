# CloudCannon Open-Source Standard Info, Docs, and Education

See the [cossidae-template](https://github.com/cloudcannon/cossidae-template) repo for a working example.

Current instances:
- https://pagefind.app

## Expectations

### Dependencies

- This theme expects `alpinejs` to be installed by the site.
- This theme expects [pagefind](https://pagefind.app) to run after a site build.

### General info

Required information can be seen in the `data/meta.yml` file in the [cossidae-template](https://github.com/cloudcannon/cossidae-template) repo. Notable items:

- `project_name`
  - Used for SEO tags, alt text, and similar places
- `default_og_image`
  - Self explanatory
- `logo_image`
  - Self explanatory
- `side_nav_title`
  - Configures the label that sits in the side nav
- `github_url`
  - Used for the top-right nav link to GitHub
- `version_env_var`
  - If the provided environment variable exists, it will be shown beside the GitHub logo.
  - You should start this variable with `HUGO_`, else you will have to configure Hugo security settings.

### Favicon

A favicon bundle is generated from https://realfavicongenerator.net/ 
  - In the bottom-most options, set `Path` to `/meta/`
  - These files are extracted to `static/meta` in your site source
  - The provided `<head>` html does not need to be included anywhere, this is baked into this template.

## Writing documentation

This site template is intended to be used as a documentation site with a landing page.

- `content/_index.md` should be used for the homepage.
- `content/docs/_index.md` represents the `/docs/` page.
- All other pages in `docs` will live at their respective path.
  - i.e. `content/docs/this/that.md` represents `/docs/this/that/`

### Front matter

- `title`
  - Used as the page h1, and in page SEO tags
- `nav_title`
  - Used as a shorter title variant in the side navigation
- `nav_section`
  - Determines which heading this page should be placed under in the side navigation
  - A heading value being referenced here creates it, they are not stored elsewhere
- `weight`
  - Determines the order in which pages appear in the side navigation (lower is higher)

### Navigation

The site side-navigation only supports one level of nesting, and is configured via the `nav_section` front matter.

The top-level groups are in the order that they are first encountered after sorting all pages by `weight`. Lowering a page's weight may move the `nav_section` for that page up the hierarchy.

Pages can be placed outside of a group (alongside the homepage) by assigning them the `nav_section` of `Root`.

### Shortcodes

#### Diffcode

This theme provides a `diffcode` shortcode that can provide source highlighting alongside diff highlighting. This shortcode should wrap a markdown code block that has a tagged language. For example, from the pagefind docs:

````markdown
{{< diffcode >}}
```js
new PagefindUI({
    element: "#search",
+    mergeIndex: [{
+        bundlePath: "https://docs.example.com/_pagefind"
+    }]
})
```
{{< /diffcode >}}
````

The code block will be rendered with the leading `+` removed from each line, and those lines will then be highlighted green to represent a diff.

#### Tree

This theme provides a `tree` shortcode that can help render an ASCII directory tree structure. The given `char` (default `>`) will be replaced with the appropriate box drawing character from the supported set. For example:

```markdown
{{% tree %}}
package.json
_includes/
>> _layouts/
>  >> default.liquid
>  >> page.liquid
>> file.liquid
_site/
>> index.html
{{% /tree %}}
```

Will output:

```text
package.json
_includes/
├─ _layouts/
│  ├─ default.liquid
│  └─ page.liquid
└─ file.liquid
_site/
└─ index.html
```

The `tree` shortcode delegates its output to `diffcode` automatically, so lines can be prepended with a `+` character to represent new files.


### Page links

All headings on doc pages will have a clickable hash link inserted in the left gutter.

## Banner

`data/banner.yml` can be provided to show a banner on the top of each page:

- `html`
  - HTML (placed inside of a `<p>` tag) to show in the banner. Supports adding alpine directives.
- `id`
  - An ID used to store that the banner has been closed in localStorage. Make sure to change this when adding a new banner so that users who dismissed the last one will see it.
- `show_until`
  - A timestamp (in milliseconds), after which the banner should not be shown. Use https://currentmillis.com/ to generate a timestamp.

