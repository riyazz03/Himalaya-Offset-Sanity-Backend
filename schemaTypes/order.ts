import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    // Order Identification
    defineField({
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Unique order identifier (e.g., order_2VpUG7RrmKTPNJ)'
    }),

    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Processing', value: 'processing' },
          { title: 'In Production', value: 'in_production' },
          { title: 'Ready for Dispatch', value: 'ready_for_dispatch' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'On Hold', value: 'on_hold' }
        ]
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required()
    }),

    // Customer Information
    defineField({
      name: 'customer',
      title: 'Customer',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: (Rule) => Rule.required(),
      description: 'Link to customer user profile'
    }),

    defineField({
      name: 'customerDetails',
      title: 'Customer Details (Snapshot)',
      type: 'object',
      description: 'Snapshot of customer details at time of order',
      fields: [
        {
          name: 'firstName',
          title: 'First Name',
          type: 'string',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'lastName',
          title: 'Last Name',
          type: 'string'
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule) => Rule.required().email()
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          validation: (Rule) => Rule.required()
        }
      ]
    }),

    // Delivery Address
    defineField({
      name: 'deliveryAddress',
      title: 'Delivery Address',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'address',
          title: 'Street Address',
          type: 'string',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'state',
          title: 'State',
          type: 'string',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'pincode',
          title: 'Pincode',
          type: 'string',
          validation: (Rule) => Rule.required()
        }
      ]
    }),

    // Product Information
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'subcategory' }],
      validation: (Rule) => Rule.required(),
      description: 'Product ordered'
    }),

    defineField({
      name: 'productSnapshot',
      title: 'Product Details (Snapshot)',
      type: 'object',
      description: 'Product details at time of order',
      fields: [
        {
          name: 'name',
          title: 'Product Name',
          type: 'string',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'slug',
          title: 'Product Slug',
          type: 'string'
        },
        {
          name: 'productImage',
          title: 'Product Image',
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          name: 'description',
          title: 'Product Description',
          type: 'text'
        }
      ]
    }),

    // Order Items & Quantity
    defineField({
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
      description: 'Number of units ordered'
    }),

    defineField({
      name: 'selectedTier',
      title: 'Selected Quantity Tier',
      type: 'object',
      description: 'Which pricing tier was selected',
      fields: [
        {
          name: 'tierLabel',
          title: 'Tier Label',
          type: 'string',
          description: 'e.g., "1000", "5000", "10000"'
        },
        {
          name: 'quantity',
          title: 'Tier Quantity',
          type: 'number'
        },
        {
          name: 'price',
          title: 'Price Per Unit (₹)',
          type: 'number'
        },
        {
          name: 'basePrice',
          title: 'Base Price (₹)',
          type: 'number'
        },
        {
          name: 'savingsPercentage',
          title: 'Savings %',
          type: 'number'
        },
        {
          name: 'badge',
          title: 'Badge Text',
          type: 'string'
        }
      ]
    }),

    // Selected Options
    defineField({
      name: 'selectedOptions',
      title: 'Selected Options',
      type: 'array',
      description: 'Product options selected by customer',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'optionLabel',
              title: 'Option Label',
              type: 'string',
              description: 'e.g., "Lamination", "Printing Type"'
            },
            {
              name: 'selectedValue',
              title: 'Selected Value',
              type: 'string',
              description: 'e.g., "Glossy", "Matte"'
            },
            {
              name: 'priceAdded',
              title: 'Additional Price (₹)',
              type: 'number'
            }
          ]
        }
      ]
    }),

    // Pricing Information
    defineField({
      name: 'pricing',
      title: 'Pricing Details',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'basePrice',
          title: 'Base Price (₹)',
          type: 'number',
          validation: (Rule) => Rule.required().min(0)
        },
        {
          name: 'optionsPrice',
          title: 'Options Additional Price (₹)',
          type: 'number',
          initialValue: 0
        },
        {
          name: 'totalPrice',
          title: 'Total Price (₹)',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
          description: 'basePrice + optionsPrice'
        },
        {
          name: 'pricePerUnit',
          title: 'Price Per Unit (₹)',
          type: 'number'
        },
        {
          name: 'discount',
          title: 'Discount Applied (₹)',
          type: 'number',
          initialValue: 0
        },
        {
          name: 'discountPercentage',
          title: 'Discount %',
          type: 'number',
          initialValue: 0
        }
      ]
    }),

    // Payment Information
    defineField({
      name: 'payment',
      title: 'Payment Information',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'paymentMethod',
          title: 'Payment Method',
          type: 'string',
          options: {
            list: [
              { title: 'Razorpay', value: 'razorpay' },
              { title: 'Credit Card', value: 'credit_card' },
              { title: 'Debit Card', value: 'debit_card' },
              { title: 'UPI', value: 'upi' },
              { title: 'Net Banking', value: 'net_banking' },
              { title: 'Other', value: 'other' }
            ]
          },
          initialValue: 'razorpay'
        },
        {
          name: 'razorpayOrderId',
          title: 'Razorpay Order ID',
          type: 'string',
          description: 'Order ID from Razorpay API'
        },
        {
          name: 'razorpayPaymentId',
          title: 'Razorpay Payment ID',
          type: 'string',
          description: 'Payment ID from Razorpay'
        },
        {
          name: 'razorpaySignature',
          title: 'Razorpay Signature',
          type: 'string',
          hidden: true,
          description: 'Signature for verification'
        },
        {
          name: 'paymentStatus',
          title: 'Payment Status',
          type: 'string',
          options: {
            list: [
              { title: 'Pending', value: 'pending' },
              { title: 'Processing', value: 'processing' },
              { title: 'Completed', value: 'completed' },
              { title: 'Failed', value: 'failed' },
              { title: 'Refunded', value: 'refunded' }
            ]
          },
          initialValue: 'pending'
        },
        {
          name: 'amountPaid',
          title: 'Amount Paid (₹)',
          type: 'number'
        },
        {
          name: 'paymentDate',
          title: 'Payment Date',
          type: 'datetime'
        }
      ]
    }),

    // Customer Notes & Design Files
    defineField({
      name: 'customerNotes',
      title: 'Customer Notes / Design Requirements',
      type: 'text',
      rows: 5,
      description: 'Special instructions, design preferences, etc.'
    }),

    defineField({
      name: 'designFiles',
      title: 'Design Files',
      type: 'array',
      description: 'Customer uploaded design files',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'fileName',
              title: 'File Name',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'fileUrl',
              title: 'File URL',
              type: 'string',
              description: 'URL to the uploaded file (from cloud storage)'
            },
            {
              name: 'fileType',
              title: 'File Type',
              type: 'string',
              description: 'e.g., application/pdf, image/png'
            },
            {
              name: 'fileSize',
              title: 'File Size (MB)',
              type: 'number'
            },
            {
              name: 'uploadedAt',
              title: 'Uploaded At',
              type: 'datetime'
            },
            {
              name: 'fileImage',
              title: 'File Preview/Thumbnail',
              type: 'image',
              options: {
                hotspot: true
              },
              description: 'Preview image for design files'
            }
          ]
        }
      ]
    }),

    // Delivery Information
    defineField({
      name: 'deliveryInfo',
      title: 'Delivery Information',
      type: 'object',
      fields: [
        {
          name: 'deliveryType',
          title: 'Delivery Type',
          type: 'string',
          options: {
            list: [
              { title: 'Standard', value: 'standard' },
              { title: 'Express', value: 'express' },
              { title: 'Same Day', value: 'same_day' }
            ]
          }
        },
        {
          name: 'expectedDeliveryDate',
          title: 'Expected Delivery Date',
          type: 'date'
        },
        {
          name: 'actualDeliveryDate',
          title: 'Actual Delivery Date',
          type: 'date'
        },
        {
          name: 'trackingNumber',
          title: 'Tracking Number',
          type: 'string'
        },
        {
          name: 'shippingProvider',
          title: 'Shipping Provider',
          type: 'string',
          description: 'e.g., "DHL", "FedEx", "Local Courier"'
        }
      ]
    }),

    // Admin Notes
    defineField({
      name: 'adminNotes',
      title: 'Admin Notes',
      type: 'text',
      rows: 4,
      description: 'Internal notes for admin/team'
    }),

    defineField({
      name: 'internalTags',
      title: 'Internal Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'For internal categorization (urgent, vip, etc.)',
      options: {
        layout: 'tags'
      }
    }),

    // Timestamps
    defineField({
      name: 'createdAt',
      title: 'Order Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      readOnly: true
    }),

    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      readOnly: true
    }),

    defineField({
      name: 'completedAt',
      title: 'Completed Date',
      type: 'datetime',
      description: 'When order was completed/delivered'
    })
  ],

  preview: {
    select: {
      orderId: 'orderId',
      customerName: 'customerDetails.firstName',
      productName: 'productSnapshot.name',
      status: 'status',
      amount: 'pricing.totalPrice',
      paymentStatus: 'payment.paymentStatus'
    },
    prepare({ orderId, customerName, productName, status, amount, paymentStatus }) {
      return {
        title: `Order #${orderId}`,
        subtitle: `${customerName} - ${productName} (₹${amount})`,
        media: undefined
      }
    }
  }
})