import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'subcategory',
  title: 'Subcategory/Product',
  type: 'document',
  fields: [
    // ============ BASIC INFO ============
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

    // ============ DESCRIPTION & MEDIA ============
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

    // ============ DELIVERY OPTIONS ============
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

    // ============ QUANTITY TIERS (Base prices only) ============
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
            },
            {
              name: 'savingsPercentage',
              title: 'Savings Percentage',
              type: 'number',
              description: 'Discount percentage for this tier'
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
      ],
      description: 'Define quantity brackets and their base prices. Options prices will be added on top of these base prices.'
    }),

    // ============ PRODUCT OPTIONS WITH TIER-DEPENDENT PRICING ============
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
              description: 'e.g., "Lamination", "Corner Cut", "Printing Type"',
              validation: (Rule) => Rule.required()
            },
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
              name: 'isRequired',
              title: 'Required?',
              type: 'boolean',
              initialValue: false
            },
            
            // ===== OPTION VALUES WITH TIER-DEPENDENT PRICES =====
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
                      description: 'e.g., "Yes", "No", "Laminated", "Non-Laminated", "Rounded", "Straight", "Front Only", "Front & Back"',
                      validation: (Rule) => Rule.required()
                    },
                    {
                      name: 'value',
                      title: 'Value ID',
                      type: 'string',
                      description: 'Unique identifier (no spaces, use hyphens)',
                      validation: (Rule) => Rule.required()
                    },
                    
                    // ===== THIS IS THE KEY: Different price per quantity tier =====
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
                              description: 'Reference to quantity tier label above (e.g., "1000", "2000", "5000") - must match exactly',
                              validation: (Rule) => Rule.required()
                            },
                            {
                              name: 'pricePerCard',
                              title: 'Price Per Card (₹)',
                              type: 'number',
                              description: 'Additional cost for this option at this quantity tier (e.g., +2 for lamination at 1000 quantity)',
                              validation: (Rule) => Rule.required().min(0)
                            }
                          ]
                        }
                      ],
                      description: 'Set different prices for this option value at each quantity tier. Leave empty to auto-sync from quantity tiers defined above.'
                    }
                  ]
                }
              ],
              hidden: ({parent}) => parent?.optionType === 'number'
            },

            // ===== NUMBER INPUT CONFIG =====
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
                  name: 'pricePerUnitByTier',
                  title: 'Price Per Unit (by Quantity Tier)',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'tierLabel',
                          title: 'Quantity Tier',
                          type: 'string',
                          description: 'e.g., "1000", "2000"'
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
      ],
      description: 'Create options like Lamination (Yes/No), Corner Type (Rounded/Straight), Printing (Front/Front+Back). Each option value has prices that vary by quantity tier.'
    }),

    // ============ SPECIFICATIONS ============
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

    // ============ STATUS & ORDERING ============
    defineField({
      name: 'minOrderQuantity',
      title: 'Minimum Order Quantity',
      type: 'number',
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1)
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