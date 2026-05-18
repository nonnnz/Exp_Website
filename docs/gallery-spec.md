# Gallery Page UX Functional Spec

## Page Name

Gallery

## Page Purpose

The Gallery page is a visual showcase for **projects, events, and achievements**. It should work as an immersive archive where visitors can browse visual proof of the brand’s activity, milestones, missions, and creative output.

The page should feel like a dark-mode space archive: cinematic, minimal, technical, and organized. It should not feel like a generic photo grid. Each gallery item should feel like a recorded signal, mission artifact, or documented moment.

---

## Primary User Goals

Users should be able to:

1. Browse all gallery content visually.
2. Filter gallery items by category.
3. Open a gallery item for a larger preview.
4. Understand what each item represents.
5. Discover related projects, events, or achievements.
6. Navigate back to the main site or continue exploring.

---

## Content Types

The Gallery supports three main content types:

### 1. Projects

Visual documentation of creative or technical projects.

Examples:
- Space patch drops
- Website launches
- Design systems
- Mission concepts
- Experimental visuals
- Archive collections

### 2. Events

Visual documentation of moments or activities.

Examples:
- Launch events
- Exhibitions
- Online showcases
- Community drops
- Campaign moments
- Special releases

### 3. Achievements

Milestones, recognitions, and important progress markers.

Examples:
- Collection milestones
- Featured work
- Awards
- Collaborations
- Press mentions
- Community growth markers

---

## Page Structure

The Gallery page should include the following sections:

1. Header / Navigation
2. Gallery Hero
3. Category Filter Bar
4. Featured Gallery Item
5. Gallery Grid
6. Item Detail Modal
7. Empty / Loading / Error States
8. Final CTA

---

## Section 1: Header / Navigation

### Purpose

Provide clear navigation while maintaining the minimal [EXP] identity.

### Layout

- Fixed or sticky top header.
- Left: `[EXP]` logo.
- Center: navigation links.
- Right: compact CTA or icon button.

### Navigation Links

Recommended links:

- Home
- Gallery
- Patches
- Archive
- Signal
- Contact

### Active State

The `Gallery` nav item should appear active.

Active state options:
- Signal green dot beside label.
- Signal green underline.
- Slightly brighter text.
- Liquid-glass pill behind active nav item.

### Mobile Behavior

On mobile:
- Hide center nav.
- Show `[EXP]` logo on left.
- Show menu button on right.
- Mobile menu opens as a dark liquid-glass panel.

---

## Section 2: Gallery Hero

### Purpose

Introduce the gallery as a visual archive.

### Visual Direction

Dark space background with:
- Faint stars
- Orbital lines
- Subtle texture
- Optional slow background video
- Minimal HUD-style marks

### Content

#### Eyebrow

`VISUAL ARCHIVE`

#### Main Heading

`GALLERY`

#### Supporting Text

`A visual showcase of our projects, events, and achievements.`

#### Optional Metadata Row

Example:

`EXP-GAL / PROJECTS 024 / EVENTS 012 / ACHIEVEMENTS 008`

### UX Notes

- Keep the hero short enough so users can reach the gallery quickly.
- Avoid making the hero full-screen unless the page needs strong cinematic impact.
- Recommended height: `55vh` desktop, `42vh` mobile.

---

## Section 3: Category Filter Bar

### Purpose

Allow users to quickly narrow the gallery.

### Filter Options

Required filters:

- All
- Projects
- Events
- Achievements

Optional future filters:

- Featured
- Recent
- Space Patches
- Collaborations
- Press
- Launches

### Layout

Desktop:
- Horizontal liquid-glass pill bar.
- Filters centered or left-aligned inside max-width container.

Mobile:
- Horizontally scrollable filter chips.
- Sticky below header if gallery content is long.

### Filter Chip Design

Default:
- Transparent / liquid-glass
- Cream text
- Thin border or glass highlight

Active:
- Signal green dot
- Cream text
- Slight white fill or green underline

Hover:
- Background becomes slightly brighter.
- Text shifts to signal green.

### Functional Behavior

When a filter is selected:
- Gallery grid updates immediately.
- Active chip updates visually.
- URL query may update for shareable state.

Example:

`/gallery?filter=projects`

---

## Section 4: Featured Gallery Item

### Purpose

Highlight the most important or newest gallery item.

### Layout

Desktop:
- Two-column layout.
- Left: large image or video preview.
- Right: title, category, date, description, CTA.

Mobile:
- Single-column layout.
- Image first, metadata below.

### Content Fields

- Title
- Category
- Date
- Short description
- Status or tag
- CTA: `View Details`

### Example Content

Title:
`Orbital Patch Collection Launch`

Category:
`Project`

Date:
`2026`

Description:
`A featured archive entry documenting the first release of the [EXP] space patch collection.`

CTA:
`View Details`

### Interaction

Clicking the featured item opens the same item detail modal used by grid items.

---

## Section 5: Gallery Grid

### Purpose

Display all gallery items in a scannable visual archive.

### Grid Layout

Desktop:
- 3-column grid.

Tablet:
- 2-column grid.

Mobile:
- 1-column grid.

Recommended gap:
- `24px` desktop
- `18px` tablet
- `16px` mobile

### Card Structure

Each gallery card should include:

1. Image or video thumbnail
2. Category label
3. Title
4. Short description
5. Date or mission code
6. Optional status chip

### Card Visual Style

- Liquid-glass card
- Rounded corners: `24px` to `32px`
- Image ratio: `4:3`, `1:1`, or `16:10`
- Dark background
- Thin highlight border
- Subtle grain overlay
- Signal green micro-accent

### Card Metadata Example

`PROJECT / EXP-001 / 2026`

### Card Hover State

On desktop hover:
- Thumbnail slightly scales up.
- Glass overlay becomes brighter.
- Signal green dot activates.
- Arrow icon appears or moves slightly.
- Cursor changes to pointer.

### Card Click Behavior

Clicking a card opens the gallery item detail modal.

### Keyboard Behavior

- Cards must be focusable.
- Pressing `Enter` opens the modal.
- Pressing `Tab` moves through cards in visual order.

---

## Section 6: Gallery Item Detail Modal

### Purpose

Show a larger preview and additional context without leaving the gallery.

### Modal Layout

Desktop:
- Large media area on left.
- Details panel on right.

Mobile:
- Full-screen modal.
- Media on top.
- Details below.

### Modal Content

Required:
- Large image or video
- Title
- Category
- Date
- Description
- Tags
- Close button

Optional:
- Related gallery items
- External link
- Project page link
- Previous / next controls

### Modal Actions

- Close
- Previous item
- Next item
- View related
- Open project page if available

### Modal Interaction

Users can close the modal by:
- Clicking close icon
- Pressing `Esc`
- Clicking outside the modal on desktop

### Accessibility Requirements

- Focus is trapped inside modal while open.
- Modal has `aria-modal="true"`.
- Close button has clear accessible label.
- Previous / next controls have accessible labels.
- Focus returns to the original card when modal closes.

---

## Section 7: Empty, Loading, and Error States

### Loading State

Use skeleton cards in the gallery grid.

Visual style:
- Dark glass rectangles
- Subtle shimmer
- No bright loading spinner unless necessary

Loading text:
`Receiving visual archive...`

### Empty State

Shown when a filter has no items.

Text:
`No archive entries found.`

Supporting text:
`Try another signal category or return to the full gallery.`

CTA:
`View All`

### Error State

Shown when gallery content fails to load.

Text:
`Gallery signal interrupted.`

Supporting text:
`The archive could not be loaded. Try refreshing the page.`

CTA:
`Retry`

---

## Section 8: Final CTA

### Purpose

Guide users deeper into the site after browsing.

### Layout

A dark cinematic CTA band with subtle orbital lines.

### Heading

`FOLLOW THE SIGNAL`

### Supporting Text

`Explore the archive, discover mission patches, and track what comes next.`

### CTA Buttons

Primary:
`View Archive`

Secondary:
`Contact Mission Control`

---

## Data Model

Each gallery item should follow this structure:

```ts
type GalleryItem = {
  id: string;
  title: string;
  category: "project" | "event" | "achievement";
  date: string;
  missionCode?: string;
  description: string;
  thumbnailUrl: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  tags?: string[];
  featured?: boolean;
  status?: "active" | "archived" | "upcoming";
  externalUrl?: string;
};
```

---

## Sample Gallery Items

```ts
const galleryItems: GalleryItem[] = [
  {
    id: "exp-001",
    title: "Orbital Patch Collection",
    category: "project",
    date: "2026",
    missionCode: "EXP-001",
    description: "A visual archive entry for the first [EXP] patch collection.",
    thumbnailUrl: "/gallery/orbital-patch-thumb.jpg",
    mediaUrl: "/gallery/orbital-patch.jpg",
    mediaType: "image",
    tags: ["patch", "archive", "orbit"],
    featured: true,
    status: "active"
  },
  {
    id: "exp-002",
    title: "Signal Launch Event",
    category: "event",
    date: "2026",
    missionCode: "EXP-002",
    description: "A documented launch moment from the [EXP] visual archive.",
    thumbnailUrl: "/gallery/signal-launch-thumb.jpg",
    mediaUrl: "/gallery/signal-launch.mp4",
    mediaType: "video",
    tags: ["event", "launch", "signal"],
    status: "archived"
  },
  {
    id: "exp-003",
    title: "Archive Milestone",
    category: "achievement",
    date: "2026",
    missionCode: "EXP-003",
    description: "A milestone entry marking growth of the mission archive.",
    thumbnailUrl: "/gallery/archive-milestone-thumb.jpg",
    mediaUrl: "/gallery/archive-milestone.jpg",
    mediaType: "image",
    tags: ["achievement", "milestone"],
    status: "active"
  }
];
```

---

## Sorting Rules

Default sort:
1. Featured item first.
2. Newest items next.
3. Older items last.

Optional sort controls:
- Newest
- Oldest
- Featured
- Category

---

## Search Behavior

Search is optional for version one.

If included, search should match:
- Title
- Category
- Mission code
- Tags
- Description

Search input placeholder:
`Search visual archive...`

No result state:
`No matching signal found.`

---

## URL Behavior

Recommended URL query support:

```txt
/gallery
/gallery?filter=projects
/gallery?filter=events
/gallery?filter=achievements
/gallery?item=exp-001
```

Benefits:
- Users can share filtered views.
- Users can deep-link directly to an opened item.
- Browser back button works predictably.

---

## Accessibility Requirements

The Gallery page should support:

- Keyboard navigation
- Visible focus states
- Modal focus trap
- `Esc` to close modal
- Descriptive image alt text
- Captions or labels for videos
- Minimum touch target size of 44px
- Color contrast that works on dark backgrounds
- Reduced-motion support

### Reduced Motion

If user prefers reduced motion:
- Disable parallax.
- Disable animated background video where possible.
- Remove card hover motion.
- Keep opacity and color transitions minimal.

---

## Performance Requirements

The gallery may become media-heavy, so performance matters.

### Images

- Use responsive images.
- Use compressed formats such as WebP or AVIF.
- Lazy-load below-the-fold images.
- Provide width and height to prevent layout shift.

### Videos

- Use muted preview loops only where necessary.
- Pause video previews outside viewport.
- Use poster images for videos.
- Avoid autoplaying many videos at the same time.

### Grid

- Use pagination or infinite loading if gallery grows large.
- For more than 50 items, consider virtualization.

---

## SEO Requirements

Recommended metadata:

Page title:
`Gallery | [EXP]`

Meta description:
`Explore the [EXP] visual gallery — a showcase of projects, events, achievements, and space patch archive entries.`

Open Graph image:
Use a dark gallery preview image with the `[EXP]` logo and patch artwork.

---

## Analytics Events

Track the following events:

```txt
gallery_filter_selected
gallery_item_opened
gallery_item_closed
gallery_next_clicked
gallery_previous_clicked
gallery_cta_clicked
gallery_search_used
```

Event properties:
- item_id
- category
- filter
- search_query
- position
- source_section

---

## Acceptance Criteria

The Gallery page is complete when:

- Users can view the Gallery page.
- Users can see the page title and description.
- Users can filter by All, Projects, Events, and Achievements.
- Users can browse a responsive gallery grid.
- Users can open an item detail modal.
- Users can close the modal with button, backdrop, and `Esc`.
- Users can navigate items with previous / next controls.
- The layout works on desktop, tablet, and mobile.
- Cards have accessible labels and keyboard focus states.
- Loading, empty, and error states are designed.
- The visual style matches the [EXP] dark space archive system.

---

## Implementation Notes

Recommended stack:

- React
- TypeScript
- Vite
- Tailwind CSS
- lucide-react icons

Recommended components:

```txt
GalleryPage
GalleryHero
GalleryFilterBar
FeaturedGalleryItem
GalleryGrid
GalleryCard
GalleryModal
GalleryEmptyState
GallerySkeleton
GalleryCTA
```

Recommended state:

```ts
const [activeFilter, setActiveFilter] = useState<GalleryFilter>("all");
const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);
```

Recommended filter type:

```ts
type GalleryFilter = "all" | "project" | "event" | "achievement";
```

---

## Visual Summary

The Gallery should feel like:

- A visual mission archive
- A space-patch showcase
- A dark cinematic grid
- A technical record of projects, events, and achievements
- A premium, minimal extension of the [EXP] identity
