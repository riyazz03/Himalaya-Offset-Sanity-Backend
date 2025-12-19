import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'subcategory',
  title: 'Subcategory/Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
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
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Product Description',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Detailed description of the product'
    }),
    defineField({
      name: 'instructions',
      title: 'Instructions',
      type: 'array',
      of: [{type: 'block'}],
      description: 'How to use or set up the product'
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
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
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
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
        }
      ],
      description: 'Upload multiple product images for gallery display'
    }),
    defineField({
      name: 'deliveryOptions',
      title: 'Delivery Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Delivery Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Standard', value: 'standard'},
                  {title: 'Same Day Delivery', value: 'same_day'},
                  {title: 'Express', value: 'express'}
                ]
              }
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string'
            },
            {
              name: 'locations',
              title: 'Available Locations',
              type: 'string'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'quantityTiers',
      title: 'Quantity Tiers',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'quantityTier',
          title: 'Quantity Tier',
          fields: [
            {
              name: 'label',
              title: 'Tier Label',
              type: 'string',
              description: 'e.g., "1000", "2000", "5000"',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'minQuantity',
              title: 'Minimum Quantity',
              type: 'number',
              validation: (Rule) => Rule.required().min(1)
            },
            {
              name: 'maxQuantity',
              title: 'Maximum Quantity',
              type: 'number',
              description: 'Leave empty for unlimited'
            },
            {
              name: 'basePrice',
              title: 'Base Price Per Card',
              type: 'number',
              validation: (Rule) => Rule.required().min(0)
            },
            {
              name: 'savingsPercentage',
              title: 'Savings Percentage',
              type: 'number',
              description: 'Discount percentage (0-100). Options will auto-scale by this.'
            },
            {
              name: 'badge',
              title: 'Badge Text',
              type: 'string',
              description: 'e.g., "15% savings", "Most Popular"'
            },
            {
              name: 'isRecommended',
              title: 'Recommended?',
              type: 'boolean',
              initialValue: false
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'productOptions',
      title: 'Product Options',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'option',
          title: 'Option',
          fields: [
            {
              name: 'label',
              title: 'Option Label',
              type: 'string',
              description: 'e.g., "Lamination", "Corner Cut", "Printing"',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'optionType',
              title: 'Option Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Radio (Pick One)', value: 'radio'},
                  {title: 'Checkbox (Multiple)', value: 'checkbox'},
                  {title: 'Dropdown', value: 'dropdown'},
                  {title: 'Number Input', value: 'number'}
                ]
              }
            },
            {
              name: 'isRequired',
              title: 'Required?',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'values',
              title: 'Option Values',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'optionValue',
                  fields: [
                    {
                      name: 'label',
                      title: 'Value Label',
                      type: 'string',
                      description: 'e.g., "Yes", "No", "Glossy", "Matte"',
                      validation: (Rule) => Rule.required()
                    },
                    {
                      name: 'value',
                      title: 'Value ID',
                      type: 'string',
                      description: 'Unique identifier',
                      validation: (Rule) => Rule.required()
                    },
                    {
                      name: 'basePrice',
                      title: 'Base Price Per Card (₹)',
                      type: 'number',
                      description: 'Price added to base. Will auto-scale per tier.',
                      initialValue: 0
                    },
                    {
                      name: 'priceByTier',
                      title: 'Price Per Card (by Quantity Tier)',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            {
                              name: 'tierLabel',
                              title: 'Quantity Tier',
                              type: 'string',
                              description: 'Must match tier label above'
                            },
                            {
                              name: 'price',
                              title: 'Price Per Card (₹)',
                              type: 'number'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ],
              hidden: ({parent}) => parent?.optionType === 'number'
            },
            {
              name: 'numberConfig',
              title: 'Number Input Configuration',
              type: 'object',
              fields: [
                {
                  name: 'min',
                  title: 'Minimum Value',
                  type: 'number',
                  initialValue: 1
                },
                {
                  name: 'max',
                  title: 'Maximum Value',
                  type: 'number'
                },
                {
                  name: 'step',
                  title: 'Step',
                  type: 'number',
                  initialValue: 1
                },
                {
                  name: 'basePricePerUnit',
                  title: 'Base Price Per Unit (₹)',
                  type: 'number',
                  description: 'Will auto-scale per tier',
                  initialValue: 0
                },
                {
                  name: 'priceByTier',
                  title: 'Price Per Unit (by Quantity Tier)',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'tierLabel',
                          title: 'Quantity Tier',
                          type: 'string'
                        },
                        {
                          name: 'pricePerUnit',
                          title: 'Price Per Unit (₹)',
                          type: 'number'
                        }
                      ]
                    }
                  ]
                }
              ],
              hidden: ({parent}) => parent?.optionType !== 'number'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Specification Name',
              type: 'string'
            },
            {
              name: 'value',
              title: 'Specification Value',
              type: 'string'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'minOrderQuantity',
      title: 'Minimum Order Quantity',
      type: 'number',
      initialValue: 1
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
      name: 'isFeatured',
      title: 'Featured Product?',
      type: 'boolean',
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      category: 'category.name'
    },
    prepare({title, media, category}) {
      return {
        title,
        subtitle: category,
        media
      }
    }
  }
})