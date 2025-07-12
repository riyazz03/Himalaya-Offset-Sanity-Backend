import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Category Description',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'bgColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'Red Gradient', value: 'linear-gradient(135deg, #ff6b6b, #ee5a24)'},
          {title: 'Green Gradient', value: 'linear-gradient(135deg, #2ed573, #1e8449)'},
          {title: 'Orange Gradient', value: 'linear-gradient(135deg, #ffa502, #ff6348)'},
          {title: 'Blue Gradient', value: 'linear-gradient(135deg, #3498db, #2980b9)'},
          {title: 'Purple Gradient', value: 'linear-gradient(135deg, #9b59b6, #8e44ad)'},
        ]
      }
    })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      subtitle: 'description'
    }
  }
})