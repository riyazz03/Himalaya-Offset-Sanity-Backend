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
    
    // QUANTITY TIERS (Base prices only)
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
              description: 'e.g., "1000", "2000", "3000", "5000", "10000"',
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
              description: 'Leave empty for unlimited (e.g., 10000+ with no max)'
            },
            {
              name: 'basePrice',
              title: 'Base Price Per Card',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
              description: 'e.g., 5 rupees per card'
            }
          ]
        }
      ],
      description: 'Define quantity brackets and their base prices'
    }),

    // PRODUCT OPTIONS WITH TIER-DEPENDENT MODIFIERS
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
              description: 'e.g., "Corner Radius", "Front & Back Printing", "Lamination"',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'isRequired',
              title: 'Required?',
              type: 'boolean',
              initialValue: false
            },
            
            // THIS IS THE KEY: Option values with different prices per tier
            {
              name: 'values',
              title: 'Option Values (with price per tier)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'optionValue',
                  fields: [
                    {
                      name: 'label',
                      title: 'Option Label',
                      type: 'string',
                      description: 'e.g., "Yes", "No", "2mm", "3mm", etc.',
                      validation: (Rule) => Rule.required()
                    },
                    {
                      name: 'value',
                      title: 'Value ID',
                      type: 'string',
                      description: 'Unique identifier (no spaces)',
                      validation: (Rule) => Rule.required()
                    },
                    
                    // THIS IS THE MAGIC: Different price per tier
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
                              description: 'e.g., "1000", "2000", "5000" - must match tier labels above',
                              validation: (Rule) => Rule.required()
                            },
                            {
                              name: 'pricePerCard',
                              title: 'Price Per Card (₹)',
                              type: 'number',
                              description: 'e.g., 2 for corner radius at 1000 quantity',
                              validation: (Rule) => Rule.required().min(0)
                            }
                          ]
                        }
                      ],
                      description: 'Set different prices for this option at each quantity tier'
                    }
                  ]
                }
              ]
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
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true
    })
  ]
})