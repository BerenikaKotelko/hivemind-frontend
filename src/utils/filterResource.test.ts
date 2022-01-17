import { filterResourceWithFilters } from "./filterResource";

const defaultRecommendations = {
  "Un-bee-table": false,
  "May-bee": false,
  Buzzkill: false,
};

const trueRecommendations = {
  "Un-bee-table": true,
  "May-bee": false,
  Buzzkill: false,
};

const defaultContentTypes = {
  Article: false,
  "Cheat-Sheet": false,
  Course: false,
  Diagram: false,
  Ebook: false,
  Exercise: false,
  "Exercise Set": false,
  Podcast: false,
  Organisation: false,
  Reference: false,
  "Resource List": false,
  "Software Tool": false,
  Video: false,
  "Youtube Channel": false,
};

// const trueContentTypes = {
//   Article: true,
//   "Cheat-Sheet": false,
//   Course: false,
//   Diagram: false,
//   Ebook: false,
//   Exercise: false,
//   "Exercise Set": false,
//   Podcast: false,
//   Organisation: false,
//   Reference: false,
//   "Resource List": false,
//   "Software Tool": false,
//   Video: false,
//   "Youtube Channel": false,
// };

const selectedTags = [
  {
    tag_id: 1,
    tag_name: "React",
    tag_colour: "#D92626",
  },
  {
    tag_id: 2,
    tag_name: "Hooks",
    tag_colour: "#D92626",
  },
  {
    tag_id: 3,
    tag_name: "Javascript",
    tag_colour: "#D92626",
  },
];

const resource = {
  id: 1,
  author_id: 1,
  title: "Title",
  description: "Description",
  recommended: "Un-bee-table",
  url: "https://google.com",
  date_added: 1642097960,
  name: "John Doe",
  is_faculty: true,
  type: "Video",
  likes: 1,
  dislikes: 0,
  tags: [
    {
      tag_id: 1,
      tag_name: "React",
      tag_colour: "#D92626",
    },
    {
      tag_id: 2,
      tag_name: "Hooks",
      tag_colour: "#D92626",
    },
    {
      tag_id: 3,
      tag_name: "Javascript",
      tag_colour: "#D92626",
    },
  ],
};

const resources = [
  {
    id: 1,
    author_id: 1,
    title: "Title",
    description: "Description",
    recommended: "Un-bee-table",
    url: "https://google.com",
    date_added: 1642097960,
    name: "John Doe",
    is_faculty: true,
    type: "Video",
    likes: 1,
    dislikes: 0,
    tags: [
      {
        tag_id: 1,
        tag_name: "React",
        tag_colour: "#D92626",
      },
      {
        tag_id: 2,
        tag_name: "Hooks",
        tag_colour: "#D92626",
      },
      {
        tag_id: 3,
        tag_name: "Javascript",
        tag_colour: "#D92626",
      },
    ],
  },
  {
    id: 1,
    author_id: 1,
    title: "A second random title",
    description: "Description that is a bit longer",
    recommended: "May-bee",
    url: "https://google.com",
    date_added: 1642097960,
    name: "Jane Doe",
    is_faculty: false,
    type: "Article",
    likes: 1,
    dislikes: 0,
    tags: [
      {
        tag_id: 1,
        tag_name: "React",
        tag_colour: "#D92626",
      },
      {
        tag_id: 2,
        tag_name: "Hooks",
        tag_colour: "#D92626",
      },
      {
        tag_id: 3,
        tag_name: "Javascript",
        tag_colour: "#D92626",
      },
    ],
  },
];

test("returns true for all if search term is empty and recommendations and contentType values are all false", () => {
  expect(
    resources.filter((resource) =>
      filterResourceWithFilters(
        "",
        resource.title,
        resource.description,
        resource.name,
        resource.recommended,
        resource.type,
        resource.tags,
        defaultRecommendations,
        defaultContentTypes,
        selectedTags
      )
    )
  ).toHaveLength(2);
});

test("returns true if title contains search term whilst recommendations and content type values are all false", () => {
  expect(
    filterResourceWithFilters(
      "Titl",
      resource.title,
      resource.description,
      resource.name,
      resource.recommended,
      resource.type,
      resource.tags,
      defaultRecommendations,
      defaultContentTypes,
      selectedTags
    )
  ).toBe(true);
  expect(
    filterResourceWithFilters(
      "Title",
      resource.title,
      resource.description,
      resource.name,
      resource.recommended,
      resource.type,
      resource.tags,
      defaultRecommendations,
      defaultContentTypes,
      selectedTags
    )
  ).toBe(true);
  expect(
    filterResourceWithFilters(
      "Title A",
      resource.title,
      resource.description,
      resource.name,
      resource.recommended,
      resource.type,
      resource.tags,
      defaultRecommendations,
      defaultContentTypes,
      selectedTags
    )
  ).toBe(false);
});

test("returns true if name contains search term whilst recommendations and content type values are all false", () => {
  expect(
    filterResourceWithFilters(
      "John",
      resource.title,
      resource.description,
      resource.name,
      resource.recommended,
      resource.type,
      resource.tags,
      defaultRecommendations,
      defaultContentTypes,
      selectedTags
    )
  ).toBe(true);
  expect(
    filterResourceWithFilters(
      "John Doe",
      resource.title,
      resource.description,
      resource.name,
      resource.recommended,
      resource.type,
      resource.tags,
      defaultRecommendations,
      defaultContentTypes,
      selectedTags
    )
  ).toBe(true);
  expect(
    filterResourceWithFilters(
      "Jane Doe",
      resource.title,
      resource.description,
      resource.name,
      resource.recommended,
      resource.type,
      resource.tags,
      defaultRecommendations,
      defaultContentTypes,
      selectedTags
    )
  ).toBe(false);
});

test("returns true if either title, description or name contains search term whilst recommendations and content type values are all false", () => {
  expect(
    filterResourceWithFilters(
      "Desc",
      resource.title,
      resource.description,
      resource.name,
      resource.recommended,
      resource.type,
      resource.tags,
      defaultRecommendations,
      defaultContentTypes,
      selectedTags
    )
  ).toBe(true);
  expect(
    filterResourceWithFilters(
      "Doe",
      resource.title,
      resource.description,
      resource.name,
      resource.recommended,
      resource.type,
      resource.tags,
      defaultRecommendations,
      defaultContentTypes,
      selectedTags
    )
  ).toBe(true);
  expect(
    filterResourceWithFilters(
      "Description With..",
      resource.title,
      resource.description,
      resource.name,
      resource.recommended,
      resource.type,
      resource.tags,
      defaultRecommendations,
      defaultContentTypes,
      selectedTags
    )
  ).toBe(false);
});

test("returns true for resources where recommended key is true in recommendationsValue object", () => {
  expect(
    filterResourceWithFilters(
      "",
      resource.title,
      resource.description,
      resource.name,
      "Un-bee-table",
      resource.type,
      resource.tags,
      trueRecommendations,
      defaultContentTypes,
      selectedTags
    )
  ).toBe(true);
  expect(
    filterResourceWithFilters(
      "",
      resource.title,
      resource.description,
      resource.name,
      "Buzzkill",
      resource.type,
      resource.tags,
      trueRecommendations,
      defaultContentTypes,
      selectedTags
    )
  ).toBe(false);
  expect(
    filterResourceWithFilters(
      "",
      resource.title,
      resource.description,
      resource.name,
      "May-bee",
      resource.type,
      resource.tags,
      trueRecommendations,
      defaultContentTypes,
      selectedTags
    )
  ).toBe(false);
});

test("returns true for resources where recommended key is true in recommendationsValue object AND title, description or name includes search term", () => {
  expect(
    filterResourceWithFilters(
      "Title",
      resource.title,
      resource.description,
      resource.name,
      "Un-bee-table",
      resource.type,
      resource.tags,
      trueRecommendations,
      defaultContentTypes,
      selectedTags
    )
  ).toBe(true);
  expect(
    filterResourceWithFilters(
      "Not found in title, description or name",
      resource.title,
      resource.description,
      resource.name,
      "Un-bee-table",
      resource.type,
      resource.tags,
      trueRecommendations,
      defaultContentTypes,
      selectedTags
    )
  ).toBe(false);
});
