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
    // NEW: Quantity-based pricing tiers (define quantity brackets first)
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
              description: 'e.g., "1-499", "500-999", "1000-4999", "5000+"',
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
              title: 'Base Price Per Unit',
              type: 'number',
              validation: (Rule) => Rule.required().min(0)
            },
            {
              name: 'discount',
              title: 'Discount Percentage',
              type: 'number',
              description: 'e.g., 0, 10, 15, 20'
            }
          ]
        }
      ],
      description: 'Define quantity brackets and their base prices'
    }),
    // UPDATED: Product options with quantity-dependent values
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
              name: 'optionType',
              title: 'Option Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Dropdown', value: 'dropdown'},
                  {title: 'Radio', value: 'radio'},
                  {title: 'Checkbox', value: 'checkbox'},
                  {title: 'Number Input', value: 'number'}
                ]
              }
            },
            {
              name: 'label',
              title: 'Option Label',
              type: 'string',
              description: 'e.g., "Corners", "Color", "Number of Pages"'
            },
            {
              name: 'isRequired',
              title: 'Required?',
              type: 'boolean',
              initialValue: false
            },
            // NEW: Quantity-dependent option values
            {
              name: 'values',
              title: 'Option Values by Quantity Tier',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'quantityDependentValue',
                  fields: [
                    {
                      name: 'quantityTierRef',
                      title: 'Quantity Tier',
                      type: 'string',
                      description: 'Select the quantity tier this applies to',
                      validation: (Rule) => Rule.required()
                    },
                    {
                      name: 'values',
                      title: 'Available Values for This Tier',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            {
                              name: 'label',
                              title: 'Value Label',
                              type: 'string',
                              description: 'e.g., "Rounded", "Square", "Red", "Blue"'
                            },
                            {
                              name: 'value',
                              title: 'Value',
                              type: 'string'
                            },
                            {
                              name: 'priceModifier',
                              title: 'Price Modifier',
                              type: 'number',
                              description: 'Additional cost for this option (can be negative)'
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
                  type: 'number'
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
                  name: 'pricePerUnit',
                  title: 'Price Per Unit',
                  type: 'number'
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