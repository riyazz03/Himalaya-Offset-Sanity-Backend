import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'otp',
  title: 'OTP Verification',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email()
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string'
    }),
    defineField({
      name: 'code',
      title: 'OTP Code',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'type',
      title: 'OTP Type',
      type: 'string',
      options: {
        list: [
          { title: 'Email Verification', value: 'email_verification' },
          { title: 'Phone Verification', value: 'phone_verification' },
          { title: 'Password Reset', value: 'password_reset' }
        ]
      }
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
      subtitle: 'type',
      description: 'code'
    }
  }
})