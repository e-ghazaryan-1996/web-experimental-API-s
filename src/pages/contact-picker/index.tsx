import { Button } from '@/components/ui/button'
import { useContactPicker } from '@/shared/hooks/useContactPicker'
import { ContactIcon } from 'lucide-react'

export const ContactPickerPage = () => {
  const { selectedContacts, error, handleSelectContact } = useContactPicker()

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl">Contact Picker API Demo</h1>
      <Button onClick={handleSelectContact} className="gap-2">
        <ContactIcon className="h-4 w-4" />
        Select Contacts
      </Button>
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {selectedContacts.length > 0 && (
        <div className="mt-4">
          <h2 className="mb-2 text-xl">Selected Contacts:</h2>
          <ul className="space-y-2">
            {selectedContacts.map((contact, index) => (
              <li key={index} className="rounded border p-2">
                <p>
                  <strong>Name:</strong> {contact.name.join(', ')}
                </p>
                {!!contact?.email?.length && (
                  <p>
                    <strong>Email:</strong> {contact?.email?.join(', ')}
                  </p>
                )}
                {!!contact?.tel?.length && (
                  <p>
                    <strong>Phone:</strong> {contact?.tel?.join(', ')}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
