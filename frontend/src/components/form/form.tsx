import React from 'react'

export default function RideForm({
  onSubmit,
}: {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  return <form onSubmit={onSubmit}>RideForm</form>
}
