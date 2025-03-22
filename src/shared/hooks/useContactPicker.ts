import { useState } from 'react'

interface ContactProperty {
  name: string[]
  email?: string[]
  tel?: string[]
}

interface ContactsManager {
  select(
    properties: string[],
    options?: ContactsSelectOptions
  ): Promise<ContactProperty[]>
}

interface ContactsSelectOptions {
  multiple?: boolean
}

declare global {
  interface Navigator {
    contacts: ContactsManager
  }
}

export const useContactPicker = () => {
  const [selectedContacts, setSelectedContacts] = useState<ContactProperty[]>(
    []
  )
  const [error, setError] = useState<string>('')

  const handleSelectContact = async () => {
    try {
      if (!('contacts' in navigator)) {
        throw new Error('Contact Picker API is not supported in this browser')
      }

      const props = ['name', 'email', 'tel']
      const opts: ContactsSelectOptions = { multiple: true }

      const contacts = await navigator.contacts.select(props, opts)

      if (!contacts.length) {
        setError('No contacts were selected')
        return
      }

      setSelectedContacts(contacts)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to select contacts')
    }
  }

  return {
    selectedContacts,
    error,
    handleSelectContact,
  }
}
