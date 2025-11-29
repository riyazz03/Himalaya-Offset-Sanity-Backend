// schemas/user.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string'
      // Not required - will use firstName if empty
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email()
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'password',
      title: 'Password Hash',
      type: 'string',
      hidden: true // Hide from studio UI
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string'
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string'
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string'
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string'
    }),
    defineField({
      name: 'pincode',
      title: 'Pincode',
      type: 'string'
    }),
    defineField({
      name: 'emailVerified',
      title: 'Email Verified',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'phoneVerified',
      title: 'Phone Verified',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'provider',
      title: 'Auth Provider',
      type: 'string',
      options: {
        list: [
          { title: 'Email/Password', value: 'credentials' },
          { title: 'Google', value: 'google' }
        ]
      },
      initialValue: 'credentials'
    }),
    defineField({
      name: 'googleId',
      title: 'Google ID',
      type: 'string',
      hidden: true
    }),
    defineField({
      name: 'image',
      title: 'Profile Picture',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'role',
      title: 'User Role',
      type: 'string',
      options: {
        list: [
          { title: 'Customer', value: 'customer' },
          { title: 'Admin', value: 'admin' }
        ]
      },
      initialValue: 'customer'
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      readOnly: true
    })
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      media: 'image'
    },
    prepare({firstName, lastName, email, media}) {
      return {
        title: `${firstName} ${lastName || ''}`.trim(),
        subtitle: email,
        media: media
      }
    }
  }
})