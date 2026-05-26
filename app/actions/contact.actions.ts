'use server'

import { createClient } from '../lib/supabase/server'

type ContactPayload = {
  inquiry_type: string
  full_name: string
  email: string
  subject: string
  message: string
  budget_range?: string
}

export async function createContactMessage(
  payload: ContactPayload
) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('contact_messages')
      .insert([payload])
      .select()

    if (error) {
      console.error(error)
      return {
        success: false,
        message: error.message,
      }
    }

    return {
      success: true,
      data,
    }

  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: 'Something went wrong',
    }
  }
}