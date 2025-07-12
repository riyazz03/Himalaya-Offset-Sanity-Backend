import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'passwordReset',
  title: 'Password Reset',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email()
    }),
    defineField({
      name: 'token',
      title: 'Reset Token',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'expiresAt',
      title: 'Expires At',
      type: 'datetime',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'isUsed',
      title: 'Is Used',
      type: 'boolean',
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'token'
    }
  }
})