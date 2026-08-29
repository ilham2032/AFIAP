export const inputClass =
  'mt-1.5 w-full rounded-xl border border-blue-100 bg-white px-4 py-2.5 text-slate-800 outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10'

export const labelClass = 'block text-sm font-semibold text-slate-700'

export const formatDateInput = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 8)

  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

export const isValidDateOfBirth = (value: string) => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value)
  if (!match) return false

  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])

  if (month < 1 || month > 12 || day < 1 || day > 31) return false

  const date = new Date(year, month - 1, day)
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    date <= new Date()
  )
}
