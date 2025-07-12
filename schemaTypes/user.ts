// schemas/user.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required()
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
      name: 'isVerified',
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
      name: 'avatar',
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
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      media: 'avatar'
    }
  }
})